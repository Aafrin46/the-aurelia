import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp
} from 'drizzle-orm/pg-core';

// Users table (tied to Firebase Auth UID)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  name: text('name'),
  memberTier: text('member_tier').default('Aurelia Ambassador'),
  points: integer('points').default(5000),
  phone: text('phone'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Rooms table (Chambers and Luxury Suites)
export const rooms = pgTable('rooms', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  chamberNumber: text('chamber_number').notNull(),
  tier: text('tier').notNull(),
  pricePerNight: integer('price_per_night').notNull(),
  subPriceLabel: text('sub_price_label'),
  wing: text('wing').notNull(),
  sizeSqm: integer('size_sqm').notNull(),
  maxGuests: integer('max_guests').notNull(),
  bedConfig: text('bed_config').notNull(),
  view: text('view').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url').notNull(),
  features: text('features'), // JSON string array
  isAvailable: boolean('is_available').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Bookings / Reservations
export const bookings = pgTable('bookings', {
  id: serial('id').primaryKey(),
  bookingReference: text('booking_reference').notNull().unique(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
  roomId: text('room_id').references(() => rooms.id, { onDelete: 'restrict' }),
  checkIn: text('check_in').notNull(),
  checkOut: text('check_out').notNull(),
  guests: integer('guests').notNull(),
  guestName: text('guest_name').notNull(),
  guestEmail: text('guest_email').notNull(),
  guestPhone: text('guest_phone'),
  specialRequests: text('special_requests'),
  addOns: text('add_ons'), // JSON stringified addOns object
  totalNights: integer('total_nights').notNull(),
  roomTotal: integer('room_total').notNull(),
  addOnsTotal: integer('add_ons_total').notNull().default(0),
  taxesAndFees: integer('taxes_and_fees').notNull(),
  grandTotal: integer('grand_total').notNull(),
  status: text('status').notNull().default('confirmed'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Amenity & Concierge Reservations (Spa, Pool Cabanas, Chauffeur, Private Dining)
export const amenityReservations = pgTable('amenity_reservations', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
  amenityId: text('amenity_id').notNull(),
  amenityTitle: text('amenity_title').notNull(),
  guestName: text('guest_name').notNull(),
  suiteNumber: text('suite_number'),
  reservationDate: text('reservation_date').notNull(),
  reservationTime: text('reservation_time').notNull(),
  specialNotes: text('special_notes'),
  status: text('status').notNull().default('confirmed'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Patron Reviews & Chronicles
export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, { onDelete: 'set null' }),
  author: text('author').notNull(),
  location: text('location').notNull(),
  avatarLetter: text('avatar_letter').notNull(),
  suiteType: text('suite_type').notNull(),
  stayDate: text('stay_date').notNull(),
  rawDate: text('raw_date').notNull(),
  rating: integer('rating').notNull(),
  headline: text('headline').notNull(),
  content: text('content').notNull(),
  helpfulCount: integer('helpful_count').notNull().default(0),
  category: text('category').notNull().default('suites'),
  isVerified: boolean('is_verified').notNull().default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Concierge Inquiries & Galas
export const inquiries = pgTable('inquiries', {
  id: serial('id').primaryKey(),
  referenceCode: text('reference_code').notNull().unique(),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone'),
  subject: text('subject').notNull(),
  stayDates: text('stay_dates'),
  partySize: text('party_size'),
  message: text('message').notNull(),
  status: text('status').notNull().default('dispatched'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
  amenityReservations: many(amenityReservations),
  reviews: many(reviews),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  room: one(rooms, {
    fields: [bookings.roomId],
    references: [rooms.id],
  }),
}));

export const amenityReservationsRelations = relations(amenityReservations, ({ one }) => ({
  user: one(users, {
    fields: [amenityReservations.userId],
    references: [users.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
}));
