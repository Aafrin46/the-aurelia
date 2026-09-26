import { Room, Review, BookingDetails } from '../types';
import { INITIAL_ROOMS, INITIAL_REVIEWS } from '../data/hotelData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export async function fetchRoomsApi(): Promise<Room[]> {
  // If Supabase is configured with VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('is_available', true);

      if (!error && data && data.length > 0) {
        return data.map((dbRoom: any) => {
          const local = INITIAL_ROOMS.find((r) => r.id === dbRoom.id);
          const features = typeof dbRoom.features === 'string' 
            ? JSON.parse(dbRoom.features) 
            : (dbRoom.features || local?.features || []);

          return {
            id: dbRoom.id,
            name: dbRoom.name,
            chamberNumber: dbRoom.chamber_number || dbRoom.chamberNumber,
            tier: dbRoom.tier,
            pricePerNight: Number(dbRoom.price_per_night || dbRoom.pricePerNight),
            subPriceLabel: dbRoom.sub_price_label || dbRoom.subPriceLabel,
            wing: dbRoom.wing,
            sizeSqm: Number(dbRoom.size_sqm || dbRoom.sizeSqm),
            maxGuests: Number(dbRoom.max_guests || dbRoom.maxGuests),
            bedConfig: dbRoom.bed_config || dbRoom.bedConfig,
            view: dbRoom.view,
            description: dbRoom.description,
            imageUrl: dbRoom.image_url || dbRoom.imageUrl,
            galleryImages: local?.galleryImages || [dbRoom.image_url || dbRoom.imageUrl],
            features,
            amenitiesList: local?.amenitiesList || [],
            hasBalcony: local?.hasBalcony ?? true,
            hasOceanView: local?.hasOceanView ?? false,
            hasKingBed: local?.hasKingBed ?? true,
            hasPrivateJacuzzi: local?.hasPrivateJacuzzi ?? false,
          };
        });
      }
    } catch (err) {
      console.warn('Supabase fetchRooms failed, falling back:', err);
    }
  }

  // Fallback to Express backend or local seed
  try {
    const res = await fetch('/api/rooms');
    if (!res.ok) throw new Error('Failed to fetch rooms');
    const data = await res.json();
    if (data.rooms && data.rooms.length > 0) {
      return data.rooms.map((dbRoom: any) => {
        const local = INITIAL_ROOMS.find((r) => r.id === dbRoom.id);
        return {
          id: dbRoom.id,
          name: dbRoom.name,
          chamberNumber: dbRoom.chamberNumber,
          tier: dbRoom.tier,
          pricePerNight: dbRoom.pricePerNight,
          subPriceLabel: dbRoom.subPriceLabel,
          wing: dbRoom.wing,
          sizeSqm: dbRoom.sizeSqm,
          maxGuests: dbRoom.maxGuests,
          bedConfig: dbRoom.bedConfig,
          view: dbRoom.view,
          description: dbRoom.description,
          imageUrl: dbRoom.imageUrl,
          galleryImages: local?.galleryImages || [dbRoom.imageUrl],
          features: dbRoom.features ? JSON.parse(dbRoom.features) : local?.features || [],
          amenitiesList: local?.amenitiesList || [],
          hasBalcony: local?.hasBalcony ?? true,
          hasOceanView: local?.hasOceanView ?? false,
          hasKingBed: local?.hasKingBed ?? true,
          hasPrivateJacuzzi: local?.hasPrivateJacuzzi ?? false,
        };
      });
    }
    return INITIAL_ROOMS;
  } catch {
    return INITIAL_ROOMS;
  }
}

export async function createBookingApi(
  payload: {
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
  },
  idToken?: string
) {
  const bookingReference = `AUR-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;

  // If Supabase is connected
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          booking_reference: bookingReference,
          room_id: payload.roomId,
          check_in: payload.checkIn,
          check_out: payload.checkOut,
          guests: payload.guests,
          guest_name: payload.guestName,
          guest_email: payload.guestEmail,
          guest_phone: payload.guestPhone || '',
          special_requests: payload.specialRequests || '',
          add_ons: JSON.stringify(payload.addOns || {}),
          total_nights: payload.totalNights,
          room_total: payload.roomTotal,
          add_ons_total: payload.addOnsTotal,
          taxes_and_fees: payload.taxesAndFees,
          grand_total: payload.grandTotal,
          status: 'confirmed',
        })
        .select()
        .single();

      if (!error && data) {
        return {
          success: true,
          booking: {
            ...data,
            bookingReference: data.booking_reference,
          },
        };
      }
    } catch (err) {
      console.warn('Supabase booking insert failed, falling back:', err);
    }
  }

  // Fallback to Express backend
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (idToken) {
    headers['Authorization'] = `Bearer ${idToken}`;
  }

  const res = await fetch('/api/bookings', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to complete reservation');
  }

  return await res.json();
}

export async function fetchUserBookingsApi(idToken?: string, userEmail?: string) {
  if (isSupabaseConfigured && userEmail) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('guest_email', userEmail)
        .order('created_at', { ascending: false });

      if (!error && data) return { bookings: data };
    } catch (err) {
      console.warn('Supabase user bookings fetch failed:', err);
    }
  }

  if (idToken) {
    const res = await fetch('/api/bookings/my-reservations', {
      headers: { Authorization: `Bearer ${idToken}` },
    });
    if (!res.ok) throw new Error('Failed to fetch user reservations');
    return await res.json();
  }

  return { bookings: [] };
}

export async function cancelBookingApi(bookingId: number, idToken?: string) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId)
        .select()
        .single();

      if (!error) return { success: true, booking: data };
    } catch (err) {
      console.warn('Supabase booking cancel failed:', err);
    }
  }

  const res = await fetch(`/api/bookings/${bookingId}/cancel`, {
    method: 'POST',
    headers: idToken ? { Authorization: `Bearer ${idToken}` } : {},
  });
  if (!res.ok) throw new Error('Failed to cancel reservation');
  return await res.json();
}

export async function reserveAmenityApi(
  payload: {
    amenityId: string;
    amenityTitle: string;
    guestName: string;
    suiteNumber?: string;
    reservationDate: string;
    reservationTime: string;
    specialNotes?: string;
  },
  idToken?: string
) {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('amenity_reservations')
        .insert({
          amenity_id: payload.amenityId,
          amenity_title: payload.amenityTitle,
          guest_name: payload.guestName,
          suite_number: payload.suiteNumber || '',
          reservation_date: payload.reservationDate,
          reservation_time: payload.reservationTime,
          special_notes: payload.specialNotes || '',
          status: 'confirmed',
        })
        .select()
        .single();

      if (!error && data) {
        return { success: true, reservation: data };
      }
    } catch (err) {
      console.warn('Supabase amenity reservation failed, falling back:', err);
    }
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (idToken) headers['Authorization'] = `Bearer ${idToken}`;

  const res = await fetch('/api/amenities/reserve', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to book amenity');
  }

  return await res.json();
}

export async function fetchReviewsApi(category?: string): Promise<Review[]> {
  if (isSupabaseConfigured) {
    try {
      let query = supabase.from('reviews').select('*').order('created_at', { ascending: false });
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data.map((r: any) => ({
          id: String(r.id),
          author: r.author,
          location: r.location,
          avatarLetter: r.avatar_letter || r.avatarLetter || r.author.charAt(0).toUpperCase(),
          suiteType: r.suite_type || r.suiteType,
          stayDate: r.stay_date || r.stayDate,
          rawDate: r.raw_date || r.rawDate,
          rating: Number(r.rating),
          headline: r.headline,
          content: r.content,
          helpfulCount: Number(r.helpful_count || r.helpfulCount || 0),
          category: r.category,
          categories: [r.category],
          isVerified: r.is_verified ?? r.isVerified ?? true,
        }));
      }
    } catch (err) {
      console.warn('Supabase reviews fetch failed:', err);
    }
  }

  try {
    const url = category && category !== 'all' ? `/api/reviews?category=${category}` : '/api/reviews';
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch reviews');
    const data = await res.json();
    if (data.reviews && data.reviews.length > 0) {
      return data.reviews.map((r: any) => ({
        id: String(r.id),
        author: r.author,
        location: r.location,
        avatarLetter: r.avatarLetter,
        suiteType: r.suiteType,
        stayDate: r.stayDate,
        rawDate: r.rawDate,
        rating: r.rating,
        headline: r.headline,
        content: r.content,
        helpfulCount: r.helpfulCount,
        category: r.category,
        categories: [r.category],
        isVerified: r.isVerified,
      }));
    }
    return INITIAL_REVIEWS;
  } catch {
    return INITIAL_REVIEWS;
  }
}

export async function submitReviewApi(
  payload: {
    author: string;
    location?: string;
    suiteType: string;
    stayDate: string;
    rating: number;
    headline: string;
    content: string;
    category: string;
  },
  idToken?: string
) {
  if (isSupabaseConfigured) {
    try {
      const avatarLetter = payload.author.trim().charAt(0).toUpperCase() || 'P';
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          author: payload.author,
          location: payload.location || 'Metropolis',
          avatar_letter: avatarLetter,
          suite_type: payload.suiteType,
          stay_date: payload.stayDate,
          raw_date: new Date().toISOString().split('T')[0],
          rating: payload.rating,
          headline: payload.headline,
          content: payload.content,
          category: payload.category,
          is_verified: true,
          helpful_count: 0,
        })
        .select()
        .single();

      if (!error && data) {
        return { success: true, review: data };
      }
    } catch (err) {
      console.warn('Supabase review insert failed:', err);
    }
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (idToken) headers['Authorization'] = `Bearer ${idToken}`;

  const res = await fetch('/api/reviews', {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to submit review');
  }

  return await res.json();
}

export async function voteReviewApi(reviewId: number) {
  if (isSupabaseConfigured) {
    try {
      const { data: current } = await supabase.from('reviews').select('helpful_count').eq('id', reviewId).single();
      const currentCount = current?.helpful_count || 0;
      const { data, error } = await supabase
        .from('reviews')
        .update({ helpful_count: currentCount + 1 })
        .eq('id', reviewId)
        .select()
        .single();

      if (!error) return { success: true, review: data };
    } catch (err) {
      console.warn('Supabase review vote failed:', err);
    }
  }

  const res = await fetch(`/api/reviews/${reviewId}/vote`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error('Failed to vote review');
  return await res.json();
}

export async function submitInquiryApi(payload: {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  stayDates?: string;
  partySize?: string;
  message: string;
}) {
  const referenceCode = `AUR-INQ-${Math.floor(1000 + Math.random() * 9000)}`;

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert({
          reference_code: referenceCode,
          full_name: payload.fullName,
          email: payload.email,
          phone: payload.phone || '',
          subject: payload.subject,
          stay_dates: payload.stayDates || '',
          party_size: payload.partySize || '',
          message: payload.message,
          status: 'dispatched',
        })
        .select()
        .single();

      if (!error && data) {
        return {
          success: true,
          inquiry: {
            ...data,
            referenceCode: data.reference_code,
          },
        };
      }
    } catch (err) {
      console.warn('Supabase inquiry insert failed:', err);
    }
  }

  const res = await fetch('/api/inquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to dispatch inquiry');
  }

  return await res.json();
}

export async function syncUserProfileApi(idToken: string, name?: string) {
  const res = await fetch('/api/auth/sync', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({ name }),
  });
  if (!res.ok) throw new Error('Failed to synchronize user');
  return await res.json();
}
