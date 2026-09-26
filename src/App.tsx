/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageType, Room, Review, UserProfile, BookingDetails } from './types';
import { INITIAL_ROOMS, INITIAL_REVIEWS } from './data/hotelData';
import { fetchRoomsApi, fetchReviewsApi, voteReviewApi } from './services/api';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layout & Shared Components
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Modals and Drawers
import { BookingModal } from './components/BookingModal';
import { AmenityDrawer } from './components/AmenityDrawer';
import { ReviewModal } from './components/ReviewModal';
import { RoomDetailModal } from './components/RoomDetailModal';
import { InSuiteMenuModal } from './components/InSuiteMenuModal';
import { ArrivalGuideModal } from './components/ArrivalGuideModal';
import { LegalModal } from './components/LegalModal';

// Pages
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { AmenitiesPage } from './pages/AmenitiesPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { SignInPage } from './pages/SignInPage';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const { user, signInWithGoogle, signOut, setDemoUser } = useAuth();

  // Rooms and Reviews state loaded from Cloud SQL
  const [rooms, setRooms] = useState<Room[]>(INITIAL_ROOMS);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);

  // Modals & Drawers state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingRoomId, setBookingRoomId] = useState<string | undefined>(undefined);
  const [inspectingRoom, setInspectingRoom] = useState<Room | null>(null);
  
  const [amenityDrawer, setAmenityDrawer] = useState<{
    isOpen: boolean;
    amenityTitle: string;
  }>({
    isOpen: false,
    amenityTitle: 'Concierge Protocol'
  });

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isArrivalGuideOpen, setIsArrivalGuideOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'accessibility' | null>(null);

  // Discreet Toast Notification
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);

  const showToast = (message: string) => {
    const id = Date.now();
    setToast({ id, message });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 4000);
  };

  // Fetch rooms and reviews from database on mount
  useEffect(() => {
    fetchRoomsApi().then((data) => {
      if (data && data.length > 0) setRooms(data);
    });

    fetchReviewsApi().then((data) => {
      if (data && data.length > 0) setReviews(data);
    });
  }, []);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (preselectedRoomId?: string) => {
    setBookingRoomId(preselectedRoomId);
    setIsBookingOpen(true);
  };

  const handleInspectRoom = (room: Room) => {
    setInspectingRoom(room);
  };

  const handleOpenAmenityDrawer = (amenityTitle: string) => {
    setAmenityDrawer({
      isOpen: true,
      amenityTitle
    });
  };

  const handleSubmitReview = (newReview: Review) => {
    setReviews((prev) => [newReview, ...prev]);
    showToast('Your reflection has been submitted and added to verified patron testimonials.');
  };

  const handleVoteHelpful = async (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r
      )
    );
    showToast('Thank you for verifying this patron reflection.');
    const numericId = parseInt(reviewId.replace(/\D/g, ''), 10);
    if (!isNaN(numericId)) {
      try {
        await voteReviewApi(numericId);
      } catch {
        // silent fallback
      }
    }
  };

  const handleBookingComplete = (details: BookingDetails) => {
    showToast(`Reservation confirmed! Reference ${details.confirmationCode || 'AUR-8942-X'}. Recorded in database.`);
  };

  // Render appropriate page view
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            onInspectRoom={handleInspectRoom}
          />
        );
      case 'rooms-and-suites':
        return (
          <RoomsPage
            onInspectRoom={handleInspectRoom}
            onOpenBooking={handleOpenBooking}
            onNavigate={handleNavigate}
          />
        );
      case 'amenities':
        return (
          <AmenitiesPage
            onOpenAmenityDrawer={handleOpenAmenityDrawer}
            onOpenMenuModal={() => setIsMenuModalOpen(true)}
          />
        );
      case 'reviews':
        return (
          <ReviewsPage
            reviews={reviews}
            onOpenReviewModal={() => setIsReviewModalOpen(true)}
            onVoteHelpful={handleVoteHelpful}
          />
        );
      case 'about-us':
        return (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenBooking={() => handleOpenBooking()}
          />
        );
      case 'contact':
        return (
          <ContactPage
            onOpenArrivalGuide={() => setIsArrivalGuideOpen(true)}
            onShowToast={showToast}
          />
        );
      case 'sign-in':
        return (
          <SignInPage
            user={user}
            onSignIn={(profile) => {
              setDemoUser(profile);
            }}
            onGoogleSignIn={signInWithGoogle}
            onSignOut={signOut}
            onNavigate={handleNavigate}
            onShowToast={showToast}
          />
        );
      case 'booking':
        return (
          <RoomsPage
            onInspectRoom={handleInspectRoom}
            onOpenBooking={handleOpenBooking}
            onNavigate={handleNavigate}
          />
        );
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            onInspectRoom={handleInspectRoom}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface flex flex-col font-sans selection:bg-secondary/30 selection:text-primary">
      {/* Luxury Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        user={user}
        onSignOut={signOut}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderCurrentPage()}
      </main>

      {/* Global Brand Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLegal={(type) => setLegalModalType(type)}
      />

      {/* Interactive Reservation Modal Engine */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedRoomId={bookingRoomId}
        onBookingComplete={handleBookingComplete}
      />

      {/* Room Detail Lightbox & Specifications Modal */}
      <RoomDetailModal
        room={inspectingRoom}
        onClose={() => setInspectingRoom(null)}
        onBookRoom={(roomId) => {
          setInspectingRoom(null);
          handleOpenBooking(roomId);
        }}
      />

      {/* Amenity Request Slide-over Drawer */}
      <AmenityDrawer
        isOpen={amenityDrawer.isOpen}
        onClose={() => setAmenityDrawer({ ...amenityDrawer, isOpen: false })}
        amenityTitle={amenityDrawer.amenityTitle}
        onSuccess={(msg) => showToast(msg)}
      />

      {/* Review Submission Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleSubmitReview}
      />

      {/* Sommelier & In-Suite Dining Cellar Modal */}
      <InSuiteMenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
        onOrderService={() => {
          setIsMenuModalOpen(false);
          handleOpenAmenityDrawer('In-Suite Dining & Sommelier Consultation');
        }}
      />

      {/* Transit & Arrival Guide Dossier Modal */}
      <ArrivalGuideModal
        isOpen={isArrivalGuideOpen}
        onClose={() => setIsArrivalGuideOpen(false)}
      />

      {/* Legal & Compliance Modal */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      {/* Discreet Toast Notification Banner */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-primary text-on-primary px-5 py-4 rounded-2xl shadow-2xl border border-primary-container flex items-center gap-3 animate-fadeIn">
          <span className="material-symbols-outlined text-secondary text-xl">hotel_class</span>
          <p className="text-xs sm:text-sm font-light leading-relaxed">{toast.message}</p>
          <button
            onClick={() => setToast(null)}
            className="ml-auto text-on-primary/60 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
