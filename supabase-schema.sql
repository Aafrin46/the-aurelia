-- The Aurelia Hotel & Residences - Supabase PostgreSQL Schema
-- Run this in your Supabase SQL Editor (Dashboard -> SQL Editor -> New Query)

-- 1. Enable UUID Extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Users / Loyalty Members Table
CREATE TABLE IF NOT EXISTS public.users (
  id BIGSERIAL PRIMARY KEY,
  uid TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  member_tier TEXT DEFAULT 'Aurelia Ambassador',
  points INTEGER DEFAULT 5000,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Chambers & Suites Table
CREATE TABLE IF NOT EXISTS public.rooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  chamber_number TEXT NOT NULL,
  tier TEXT NOT NULL,
  price_per_night NUMERIC(10, 2) NOT NULL,
  sub_price_label TEXT,
  wing TEXT NOT NULL,
  size_sqm INTEGER NOT NULL,
  max_guests INTEGER NOT NULL,
  bed_config TEXT NOT NULL,
  view TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  features JSONB DEFAULT '[]'::jsonb,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Reservations & Folio Table
CREATE TABLE IF NOT EXISTS public.bookings (
  id BIGSERIAL PRIMARY KEY,
  booking_reference TEXT UNIQUE NOT NULL,
  user_id BIGINT REFERENCES public.users(id) ON DELETE SET NULL,
  room_id TEXT REFERENCES public.rooms(id) ON DELETE RESTRICT,
  check_in TEXT NOT NULL,
  check_out TEXT NOT NULL,
  guests INTEGER NOT NULL,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  guest_phone TEXT,
  special_requests TEXT,
  add_ons JSONB DEFAULT '{}'::jsonb,
  total_nights INTEGER NOT NULL,
  room_total NUMERIC(10, 2) NOT NULL,
  add_ons_total NUMERIC(10, 2) DEFAULT 0.00,
  taxes_and_fees NUMERIC(10, 2) NOT NULL,
  grand_total NUMERIC(10, 2) NOT NULL,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Amenity & Concierge Reservations Table
CREATE TABLE IF NOT EXISTS public.amenity_reservations (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES public.users(id) ON DELETE SET NULL,
  amenity_id TEXT NOT NULL,
  amenity_title TEXT NOT NULL,
  guest_name TEXT NOT NULL,
  suite_number TEXT,
  reservation_date TEXT NOT NULL,
  reservation_time TEXT NOT NULL,
  special_notes TEXT,
  status TEXT DEFAULT 'confirmed',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Verified Patron Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES public.users(id) ON DELETE SET NULL,
  author TEXT NOT NULL,
  location TEXT NOT NULL,
  avatar_letter TEXT NOT NULL,
  suite_type TEXT NOT NULL,
  stay_date TEXT NOT NULL,
  raw_date TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  headline TEXT NOT NULL,
  content TEXT NOT NULL,
  helpful_count INTEGER DEFAULT 0,
  category TEXT DEFAULT 'suites',
  is_verified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Concierge Inquiries & Galas Table
CREATE TABLE IF NOT EXISTS public.inquiries (
  id BIGSERIAL PRIMARY KEY,
  reference_code TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  stay_dates TEXT,
  party_size TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'dispatched',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Seed Luxury Chambers & Suites
INSERT INTO public.rooms (id, name, chamber_number, tier, price_per_night, sub_price_label, wing, size_sqm, max_guests, bed_config, view, description, image_url, features, is_available)
VALUES 
('deluxe-room', 'Deluxe Room', 'Chamber 01', 'Deluxe', 420, 'Taxes & artisanal breakfast included', 'Courtyard Wing', 45, 2, '1 King Bed', 'Garden Courtyard', 'An intimate sanctuary featuring refined Italian marble bathroom, handcrafted furnishings, and tranquil courtyard vistas designed for deep repose.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWP_OII0KrYxzkxPleU7_2gGe4OVGpQdJXeaMfaWO8b9FaQmGyAhd3iH2AdMLpFesvlc9f8lKsKkOKspaqw-3Q0tSBTL9S7wdYNynxxtjMfnDKY6tp_2l8wFCeEfUQn05fdEHsIyXPzTZrwThZV4kEwhbZayXj4RSX8paI655zN1f4WUtPGScs10lamAtJjpRstfG85ZfDNjvwYOrB2sarR1mYtLBWIAR2LEyw674DZdpSrrb2duKonw', '["High-speed Wi-Fi", "Nespresso Bar", "Walk-in Rain Shower", "Smart TV"]'::jsonb, true),
('premium-room', 'Premium Room', 'Chamber 02', 'Premium', 650, 'Complimentary sunset aperitif hour', 'Upper Levels', 62, 3, '1 King / 2 Doubles', 'Skyline Horizon', 'Spacious luxury accented by expansive floor-to-ceiling windows, private sunset balcony, and soaking freestanding tub overlooking evening lights.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNm-tlodayXAf9tMfolfXqdLOpwFkUTgEgD5F2cPvBqIxYJfltMkUSLoLIZ5YTZ6ZogUBve2tFKYGs5_GlIhAuTfMHh8yaIiouNR2q2AGTHQsviIMPnb6m3Mojg6uxJtH9cq-LaCwzOfXnvrH482XSa-KXcw5dt6gOhoKBV8Cg3-ICxg4ZQBrJECCNdN2kf_oqnqiyJcJRSbgB3micYn6pVEEHkMWOknT9qJmhbQSO883tYFV0PF3PdQ', '["Private Balcony", "Deep Soaking Tub", "24/7 In-Room Dining", "Premium Audio"]'::jsonb, true),
('executive-suite', 'Executive Suite', 'Chamber 03', 'Executive', 890, 'Includes 38th Floor Executive Club Lounge Privileges', 'Corner Residence', 85, 3, '1 California King', 'City & Ocean View', 'A sophisticated corner suite featuring a separate living parlor, curated art collection, executive writing desk, and cocktail wet bar.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBt-enAreVzoTC4pPbUKGvh0WZDooqnRjdBbZ0RJAC1--LWLmzyCllldN3-oWCsHUGq4On73Lc-OIMTreXBER0YK_mFxKBWMtDgaYLyPKLHGfK8WnzMa8TDRioffy1AHtRpXYTeT0kHU3oWahykU5w-LuFLp_XutgKBDNMmdnSPlZcN8jO-zCTZVouBExZDNYLuMecU-etQwRQ-wbzugsdkf9X8SB_LoSWWwWgP9LP3H4v91RFmnRJjog', '["Separate Living Area", "Executive Lounge Access", "Cocktail Bar", "Marble Bath"]'::jsonb, true),
('aurelia-luxury-suite', 'Aurelia Luxury Suite', 'The Aurelia Crown', 'Grand Penthouse', 1250, 'Includes private airport limousine transfer', 'Penthouse Level • Private Pool', 135, 4, '2 King Beds', 'Ocean Panorama', 'The pinnacle of Aurelia hospitality. Expansive dual-bedroom penthouse featuring private outdoor plunge pool, dedicated 24-hour butler, and bespoke dining salon.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDstxH3q9QtDFsL-0wtQEz5oV4GLWKbbq6f_LR4BnovMYP5hsKQbL2DLY5jZdSaHaUgU7c9V6Ig-IHoayF5zl3sCoByUdHg6qCA1Gj62dfxD5Unyt3hI4Dw2so-CtJW4PbDTs-_aHuvY_vlZMAzXMqUAI7o8pqk3M5TQOBKMEnAf7BS3hWjQHW6aNbZ-dAJU2uqo9rxKsVOYunOWFv5rCthl2_VF2_snQZE0pl2-6Km1gdNq39s_cKnpQ', '["Private Plunge Pool", "24-hr Butler Service", "Private Dining Salon", "VIP Airport Transfer"]'::jsonb, true)
ON CONFLICT (id) DO NOTHING;

-- 9. Enable Row Level Security (RLS) & Public Policies for Prototyping
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.amenity_reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read rooms" ON public.rooms FOR SELECT USING (true);
CREATE POLICY "Allow public read reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Allow insert bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow select bookings" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Allow insert amenity_reservations" ON public.amenity_reservations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert reviews" ON public.reviews FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update reviews" ON public.reviews FOR UPDATE USING (true);
CREATE POLICY "Allow insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow insert users" ON public.users FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow select users" ON public.users FOR SELECT USING (true);
