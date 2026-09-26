import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { requireAuth, optionalAuth, AuthRequest } from './src/middleware/auth.ts';
import { getOrCreateUser, getUserByUid } from './src/db/users.ts';
import {
  getRooms,
  getRoomById,
  createBooking,
  getBookingsByUser,
  cancelBooking,
  createAmenityReservation,
  getReviews,
  createReview,
  voteReviewHelpful,
  createInquiry,
} from './src/db/queries.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());

// API Routes

// 1. Auth & User Profile Sync
app.post('/api/auth/sync', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const uid = req.user?.uid;
    const email = req.user?.email || `${uid}@theaureliahotel.com`;
    const name = req.body?.name || req.user?.name;

    if (!uid) return res.status(401).json({ error: 'Missing UID' });

    const user = await getOrCreateUser(uid, email, name);
    res.json({ success: true, user });
  } catch (error: any) {
    console.error('Error syncing user:', error);
    res.status(500).json({ error: error.message || 'Failed to sync user' });
  }
});

app.get('/api/user/profile', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: 'Unauthorized' });

    const user = await getUserByUid(uid);
    res.json({ user });
  } catch (error: any) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch profile' });
  }
});

// 2. Rooms API
app.get('/api/rooms', async (req: Request, res: Response) => {
  try {
    const roomsList = await getRooms();
    res.json({ rooms: roomsList });
  } catch (error: any) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch rooms' });
  }
});

app.get('/api/rooms/:id', async (req: Request, res: Response) => {
  try {
    const room = await getRoomById(req.params.id);
    if (!room) return res.status(404).json({ error: 'Chamber not found' });
    res.json({ room });
  } catch (error: any) {
    console.error('Error fetching room:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch room' });
  }
});

// 3. Bookings API
app.post('/api/bookings', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const {
      roomId,
      checkIn,
      checkOut,
      guests,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests,
      addOns,
      totalNights,
      roomTotal,
      addOnsTotal,
      taxesAndFees,
      grandTotal,
    } = req.body;

    if (!roomId || !checkIn || !checkOut || !guestName || !guestEmail) {
      return res.status(400).json({ error: 'Missing required reservation fields' });
    }

    const bookingReference = `AUR-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;

    const newBooking = await createBooking({
      bookingReference,
      userUid: req.user?.uid,
      roomId,
      checkIn,
      checkOut,
      guests: Number(guests) || 2,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests,
      addOns,
      totalNights: Number(totalNights) || 1,
      roomTotal: Number(roomTotal) || 0,
      addOnsTotal: Number(addOnsTotal) || 0,
      taxesAndFees: Number(taxesAndFees) || 0,
      grandTotal: Number(grandTotal) || 0,
    });

    res.status(201).json({ success: true, booking: newBooking });
  } catch (error: any) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: error.message || 'Failed to create booking' });
  }
});

app.get('/api/bookings/my-reservations', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const uid = req.user?.uid;
    if (!uid) return res.status(401).json({ error: 'Unauthorized' });

    const bookingsList = await getBookingsByUser(uid);
    res.json({ bookings: bookingsList });
  } catch (error: any) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch reservations' });
  }
});

app.post('/api/bookings/:id/cancel', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const uid = req.user?.uid;
    const bookingId = Number(req.params.id);
    if (!uid || isNaN(bookingId)) return res.status(400).json({ error: 'Invalid request' });

    const cancelled = await cancelBooking(bookingId, uid);
    res.json({ success: true, booking: cancelled });
  } catch (error: any) {
    console.error('Error cancelling reservation:', error);
    res.status(500).json({ error: error.message || 'Failed to cancel reservation' });
  }
});

// 4. Amenities API
app.post('/api/amenities/reserve', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const {
      amenityId,
      amenityTitle,
      guestName,
      suiteNumber,
      reservationDate,
      reservationTime,
      specialNotes,
    } = req.body;

    if (!amenityId || !amenityTitle || !guestName || !reservationDate || !reservationTime) {
      return res.status(400).json({ error: 'Missing required amenity fields' });
    }

    const reservation = await createAmenityReservation({
      userUid: req.user?.uid,
      amenityId,
      amenityTitle,
      guestName,
      suiteNumber,
      reservationDate,
      reservationTime,
      specialNotes,
    });

    res.status(201).json({ success: true, reservation });
  } catch (error: any) {
    console.error('Error reserving amenity:', error);
    res.status(500).json({ error: error.message || 'Failed to reserve amenity' });
  }
});

// 5. Reviews API
app.get('/api/reviews', async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string | undefined;
    const reviewsList = await getReviews(category);
    res.json({ reviews: reviewsList });
  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch reviews' });
  }
});

app.post('/api/reviews', optionalAuth, async (req: AuthRequest, res: Response) => {
  try {
    const {
      author,
      location,
      suiteType,
      stayDate,
      rawDate,
      rating,
      headline,
      content,
      category,
    } = req.body;

    if (!author || !content || !headline || !rating) {
      return res.status(400).json({ error: 'Missing required review fields' });
    }

    const avatarLetter = author.trim().charAt(0).toUpperCase();

    const review = await createReview({
      userUid: req.user?.uid,
      author,
      location: location || 'Metropolis',
      avatarLetter,
      suiteType: suiteType || 'Aurelia Suite',
      stayDate: stayDate || 'Recent Stay',
      rawDate: rawDate || new Date().toISOString().split('T')[0],
      rating: Number(rating) || 5,
      headline,
      content,
      category: category || 'suites',
    });

    res.status(201).json({ success: true, review });
  } catch (error: any) {
    console.error('Error creating review:', error);
    res.status(500).json({ error: error.message || 'Failed to create review' });
  }
});

app.post('/api/reviews/:id/vote', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ error: 'Invalid review ID' });

    const updated = await voteReviewHelpful(id);
    res.json({ success: true, review: updated });
  } catch (error: any) {
    console.error('Error voting review:', error);
    res.status(500).json({ error: error.message || 'Failed to record vote' });
  }
});

// 6. Inquiries API
app.post('/api/inquiries', async (req: Request, res: Response) => {
  try {
    const { fullName, email, phone, subject, stayDates, partySize, message } = req.body;
    if (!fullName || !email || !message) {
      return res.status(400).json({ error: 'Missing required inquiry fields' });
    }

    const referenceCode = `AUR-INQ-${Math.floor(1000 + Math.random() * 9000)}`;

    const inquiry = await createInquiry({
      referenceCode,
      fullName,
      email,
      phone,
      subject: subject || 'General Inquiry',
      stayDates,
      partySize,
      message,
    });

    res.status(201).json({ success: true, inquiry });
  } catch (error: any) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ error: error.message || 'Failed to dispatch inquiry' });
  }
});

// Vite Integration in Development & Production
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
