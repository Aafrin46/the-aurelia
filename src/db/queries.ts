import { db } from './index.ts';
import { rooms, bookings, amenityReservations, reviews, inquiries, users } from './schema.ts';
import { eq, desc, and } from 'drizzle-orm';
import { getUserByUid } from './users.ts';

// Rooms
export async function getRooms() {
  try {
    return await db.select().from(rooms).where(eq(rooms.isAvailable, true));
  } catch (error) {
    console.error("Database query failed [getRooms]:", error);
    throw new Error("Unable to retrieve chambers from database.", { cause: error });
  }
}

export async function getRoomById(roomId: string) {
  try {
    const result = await db.select().from(rooms).where(eq(rooms.id, roomId));
    return result[0] || null;
  } catch (error) {
    console.error("Database query failed [getRoomById]:", error);
    throw new Error("Chamber record lookup failed.", { cause: error });
  }
}

// Bookings
export async function createBooking(data: {
  bookingReference: string;
  userUid?: string;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  specialRequests?: string;
  addOns?: Record<string, boolean>;
  totalNights: number;
  roomTotal: number;
  addOnsTotal: number;
  taxesAndFees: number;
  grandTotal: number;
}) {
  try {
    let dbUserId: number | undefined;
    if (data.userUid) {
      const userRecord = await getUserByUid(data.userUid);
      if (userRecord) dbUserId = userRecord.id;
    }

    const inserted = await db.insert(bookings).values({
      bookingReference: data.bookingReference,
      userId: dbUserId,
      roomId: data.roomId,
      checkIn: data.checkIn,
      checkOut: data.checkOut,
      guests: data.guests,
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      guestPhone: data.guestPhone || '',
      specialRequests: data.specialRequests || '',
      addOns: JSON.stringify(data.addOns || {}),
      totalNights: data.totalNights,
      roomTotal: data.roomTotal,
      addOnsTotal: data.addOnsTotal,
      taxesAndFees: data.taxesAndFees,
      grandTotal: data.grandTotal,
      status: 'confirmed',
    }).returning();

    return inserted[0];
  } catch (error) {
    console.error("Database insert failed [createBooking]:", error);
    throw new Error("Failed to record reservation in database.", { cause: error });
  }
}

export async function getBookingsByUser(uid: string) {
  try {
    const userRecord = await getUserByUid(uid);
    if (!userRecord) return [];

    return await db.select()
      .from(bookings)
      .where(eq(bookings.userId, userRecord.id))
      .orderBy(desc(bookings.createdAt));
  } catch (error) {
    console.error("Database query failed [getBookingsByUser]:", error);
    throw new Error("Unable to retrieve user reservations.", { cause: error });
  }
}

export async function cancelBooking(bookingId: number, uid: string) {
  try {
    const userRecord = await getUserByUid(uid);
    if (!userRecord) throw new Error("Unauthorized");

    const updated = await db.update(bookings)
      .set({ status: 'cancelled' })
      .where(and(eq(bookings.id, bookingId), eq(bookings.userId, userRecord.id)))
      .returning();

    return updated[0] || null;
  } catch (error) {
    console.error("Database update failed [cancelBooking]:", error);
    throw new Error("Failed to cancel reservation.", { cause: error });
  }
}

// Amenity Reservations
export async function createAmenityReservation(data: {
  userUid?: string;
  amenityId: string;
  amenityTitle: string;
  guestName: string;
  suiteNumber?: string;
  reservationDate: string;
  reservationTime: string;
  specialNotes?: string;
}) {
  try {
    let dbUserId: number | undefined;
    if (data.userUid) {
      const userRecord = await getUserByUid(data.userUid);
      if (userRecord) dbUserId = userRecord.id;
    }

    const inserted = await db.insert(amenityReservations).values({
      userId: dbUserId,
      amenityId: data.amenityId,
      amenityTitle: data.amenityTitle,
      guestName: data.guestName,
      suiteNumber: data.suiteNumber || '',
      reservationDate: data.reservationDate,
      reservationTime: data.reservationTime,
      specialNotes: data.specialNotes || '',
      status: 'confirmed',
    }).returning();

    return inserted[0];
  } catch (error) {
    console.error("Database insert failed [createAmenityReservation]:", error);
    throw new Error("Failed to reserve amenity.", { cause: error });
  }
}

// Reviews
export async function getReviews(category?: string) {
  try {
    if (category && category !== 'all') {
      return await db.select()
        .from(reviews)
        .where(eq(reviews.category, category))
        .orderBy(desc(reviews.createdAt));
    }
    return await db.select().from(reviews).orderBy(desc(reviews.createdAt));
  } catch (error) {
    console.error("Database query failed [getReviews]:", error);
    throw new Error("Unable to retrieve patron chronicles.", { cause: error });
  }
}

export async function createReview(data: {
  userUid?: string;
  author: string;
  location: string;
  avatarLetter: string;
  suiteType: string;
  stayDate: string;
  rawDate: string;
  rating: number;
  headline: string;
  content: string;
  category: string;
}) {
  try {
    let dbUserId: number | undefined;
    if (data.userUid) {
      const userRecord = await getUserByUid(data.userUid);
      if (userRecord) dbUserId = userRecord.id;
    }

    const inserted = await db.insert(reviews).values({
      userId: dbUserId,
      author: data.author,
      location: data.location,
      avatarLetter: data.avatarLetter,
      suiteType: data.suiteType,
      stayDate: data.stayDate,
      rawDate: data.rawDate,
      rating: data.rating,
      headline: data.headline,
      content: data.content,
      category: data.category,
      isVerified: true,
      helpfulCount: 0,
    }).returning();

    return inserted[0];
  } catch (error) {
    console.error("Database insert failed [createReview]:", error);
    throw new Error("Failed to record reflection.", { cause: error });
  }
}

export async function voteReviewHelpful(reviewId: number) {
  try {
    const existing = await db.select().from(reviews).where(eq(reviews.id, reviewId));
    if (!existing.length) throw new Error("Review not found");

    const updated = await db.update(reviews)
      .set({ helpfulCount: existing[0].helpfulCount + 1 })
      .where(eq(reviews.id, reviewId))
      .returning();

    return updated[0];
  } catch (error) {
    console.error("Database update failed [voteReviewHelpful]:", error);
    throw new Error("Failed to record helpful vote.", { cause: error });
  }
}

// Inquiries
export async function createInquiry(data: {
  referenceCode: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  stayDates?: string;
  partySize?: string;
  message: string;
}) {
  try {
    const inserted = await db.insert(inquiries).values({
      referenceCode: data.referenceCode,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone || '',
      subject: data.subject,
      stayDates: data.stayDates || '',
      partySize: data.partySize || '',
      message: data.message,
      status: 'dispatched',
    }).returning();

    return inserted[0];
  } catch (error) {
    console.error("Database insert failed [createInquiry]:", error);
    throw new Error("Failed to dispatch concierge inquiry.", { cause: error });
  }
}
