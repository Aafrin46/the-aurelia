import React, { useState } from 'react';
import { PageType, UserProfile } from '../types';

interface SignInPageProps {
  user: UserProfile | null;
  onSignIn: (profile: UserProfile) => void;
  onGoogleSignIn: () => Promise<void>;
  onSignOut: () => void;
  onNavigate: (page: PageType) => void;
  onShowToast: (message: string) => void;
}

export const SignInPage: React.FC<SignInPageProps> = ({
  user,
  onSignIn,
  onGoogleSignIn,
  onSignOut,
  onNavigate,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleClick = async () => {
    try {
      setIsGoogleLoading(true);
      await onGoogleSignIn();
      onShowToast('Signed in successfully with Google Identity.');
    } catch (err: any) {
      console.error(err);
      onShowToast('Google authentication could not be completed.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      onShowToast('Please provide your member email or ID.');
      return;
    }

    const profile: UserProfile = {
      name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: email,
      memberTier: 'Aurelia Ambassador',
      joinedYear: '2024',
      points: 12500,
      upcomingStay: 'Aurelia Luxury Suite • Chamber 04 (Nov 2026)'
    };

    onSignIn(profile);
    onShowToast(`Welcome back, ${profile.name}. Ambassador benefits active.`);
  };

  const handleQuickDemoLogin = () => {
    const demoProfile: UserProfile = {
      name: 'Eleanor Vance-Sterling',
      email: 'eleanor.sterling@luxuryresidence.com',
      memberTier: 'Ambassador Black Tier',
      joinedYear: '2021',
      points: 28450,
      upcomingStay: 'Aurelia Luxury Suite (Nov 14 - 18, 2026)'
    };
    onSignIn(demoProfile);
    onShowToast('Logged in as Eleanor Vance-Sterling (Ambassador Black Tier).');
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      onShowToast('Please complete all required fields.');
      return;
    }

    const newProfile: UserProfile = {
      name: fullName,
      email: email,
      memberTier: 'Aurelia Premier Member',
      joinedYear: '2026',
      points: 5000, // Welcome gift
      upcomingStay: undefined
    };

    onSignIn(newProfile);
    onShowToast(`Welcome to The Aurelia Privilege Club, ${fullName}! 5,000 welcome points awarded.`);
  };

  return (
    <div className="pt-24 pb-20 bg-surface min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* If user is authenticated: Display Privilege Club Dashboard */}
        {user ? (
          <div className="space-y-8 animate-fadeIn">
            {/* Header Profile Card */}
            <div className="bg-primary text-on-primary rounded-3xl p-8 sm:p-12 border border-primary-container relative overflow-hidden shadow-2xl">
              <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none">
                <span className="material-symbols-outlined text-[280px]">stars</span>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/20 border border-secondary/30 text-secondary text-xs uppercase tracking-widest font-semibold mb-3">
                    <span className="material-symbols-outlined text-sm">workspace_premium</span>
                    <span>{user.memberTier}</span>
                  </div>
                  <h1 className="font-serif text-3xl sm:text-4xl font-light text-white">
                    {user.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-on-primary/70 mt-1 font-mono">
                    Member ID: AUR-8942-X • Patron Since {user.joinedYear}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end gap-2 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                  <span className="text-[10px] uppercase tracking-widest text-secondary font-semibold">Rewards Points</span>
                  <span className="font-serif text-3xl font-light text-secondary">
                    {user.points.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-white/60">Pts Value: ${(user.points / 10).toFixed(0)}</span>
                </div>
              </div>

              {/* Status Bar */}
              <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
                <div>
                  <span className="text-on-primary/60 block">Upcoming Reservation:</span>
                  <span className="font-medium text-white text-sm">{user.upcomingStay || 'No active reservation'}</span>
                </div>
                <div>
                  <span className="text-on-primary/60 block">Chamber Guaranteed:</span>
                  <span className="font-medium text-white text-sm">3:00 PM Late Departure</span>
                </div>
                <div>
                  <span className="text-on-primary/60 block">House Chauffeur:</span>
                  <span className="font-medium text-white text-sm">Rolls-Royce Unlimited Fleet</span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Exclusive Perks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/40 space-y-3">
                <span className="material-symbols-outlined text-secondary text-3xl">key</span>
                <h3 className="font-serif text-lg font-medium text-on-surface">Book with Privilege Rates</h3>
                <p className="text-xs text-on-surface-variant font-light leading-relaxed">
                  Enjoy exclusive 15% preferred patron rates, complimentary champagne upon arrival, and daily breakfast at Le Miroir.
                </p>
                <button
                  onClick={() => onNavigate('rooms-and-suites')}
                  className="pt-2 text-xs font-semibold text-secondary flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Browse Chambers</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/40 space-y-3">
                <span className="material-symbols-outlined text-secondary text-3xl">spa</span>
                <h3 className="font-serif text-lg font-medium text-on-surface">Thermal Spa Sanctuary Credit</h3>
                <p className="text-xs text-on-surface-variant font-light leading-relaxed">
                  You possess an active $150 Biologique Recherche ritual credit ready for redemption at the subterranean spa.
                </p>
                <button
                  onClick={() => onNavigate('amenities')}
                  className="pt-2 text-xs font-semibold text-secondary flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>View Spa Sanctuary</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/40 space-y-3">
                <span className="material-symbols-outlined text-secondary text-3xl">wine_bar</span>
                <h3 className="font-serif text-lg font-medium text-on-surface">Grand Cru Cellar Tastings</h3>
                <p className="text-xs text-on-surface-variant font-light leading-relaxed">
                  Invitation to weekly private sommelier salon tastings featuring rare Romanée-Conti allocations.
                </p>
                <button
                  onClick={() => onNavigate('contact')}
                  className="pt-2 text-xs font-semibold text-secondary flex items-center gap-1 hover:underline cursor-pointer"
                >
                  <span>Contact Sommelier</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Sign Out Button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={onSignOut}
                className="px-6 py-2.5 rounded-full border border-outline-variant/60 text-on-surface-variant hover:text-error hover:border-error text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Sign Out of Privilege Club
              </button>
            </div>
          </div>
        ) : (
          /* Authentication Screen: Login / Register */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-7 bg-surface-container-low border border-outline-variant/40 rounded-3xl p-6 sm:p-10 shadow-xl">
              
              {/* Tab Selector */}
              <div className="flex border-b border-outline-variant/40 mb-8">
                <button
                  onClick={() => setActiveTab('signin')}
                  className={`pb-4 text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer ${
                    activeTab === 'signin'
                      ? 'border-b-2 border-secondary text-on-surface'
                      : 'text-on-surface-variant/60 hover:text-on-surface'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className={`pb-4 ml-8 text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer ${
                    activeTab === 'register'
                      ? 'border-b-2 border-secondary text-on-surface'
                      : 'text-on-surface-variant/60 hover:text-on-surface'
                  }`}
                >
                  Join Privilege Club
                </button>
              </div>

              {/* Quick Demo One-Click Access */}
              <div className="mb-6 p-4 rounded-xl bg-secondary-container/20 border border-secondary/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">verified_user</span>
                  <div className="text-left">
                    <span className="text-xs font-semibold text-on-surface block">Preview Member Access</span>
                    <span className="text-[11px] text-on-surface-variant">Instant login with pre-configured Ambassador credentials</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg bg-secondary text-on-secondary text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shrink-0"
                >
                  1-Click Demo Login
                </button>
              </div>

              {/* Google Sign-In with OAuth */}
              <div className="mb-6">
                <button
                  type="button"
                  onClick={handleGoogleClick}
                  disabled={isGoogleLoading}
                  className="w-full py-3.5 px-4 rounded-xl border border-outline-variant/60 bg-surface hover:bg-surface-container transition-all flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-wider text-on-surface shadow-sm cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>{isGoogleLoading ? 'Connecting to Google Identity...' : 'Continue with Google Account'}</span>
                </button>
                <div className="relative flex py-4 items-center">
                  <div className="flex-grow border-t border-outline-variant/40"></div>
                  <span className="flex-shrink mx-4 text-[10px] text-on-surface-variant uppercase tracking-widest">or sign in with password</span>
                  <div className="flex-grow border-t border-outline-variant/40"></div>
                </div>
              </div>

              {activeTab === 'signin' ? (
                <form onSubmit={handleSignIn} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                      Email Address or Member ID
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. patron@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/60 focus:border-secondary focus:outline-none text-sm text-on-surface"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => onShowToast('Password reset link dispatched to your registered address.')}
                        className="text-[11px] text-secondary hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 pr-11 rounded-xl bg-surface border border-outline-variant/60 focus:border-secondary focus:outline-none text-sm text-on-surface"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/60 hover:text-on-surface cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-lg">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded border-outline-variant text-secondary focus:ring-secondary accent-[#c6a87d]"
                      />
                      <span className="text-on-surface-variant">Remember my credentials on this workstation</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-primary text-on-primary font-semibold text-xs tracking-widest uppercase hover:bg-primary/95 transition-all shadow-md cursor-pointer mt-4"
                  >
                    Enter Private Portal
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord Montgomery Vance"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/60 focus:border-secondary focus:outline-none text-sm text-on-surface"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="patron@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/60 focus:border-secondary focus:outline-none text-sm text-on-surface"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                        Telephone
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/60 focus:border-secondary focus:outline-none text-sm text-on-surface"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                      Create Secure Password *
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Minimum 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-surface border border-outline-variant/60 focus:border-secondary focus:outline-none text-sm text-on-surface"
                    />
                  </div>

                  <div className="p-3 bg-surface rounded-xl border border-outline-variant/40 text-[11px] text-on-surface-variant">
                    By enrolling, you accept The Aurelia Privilege Charter and receive an immediate credit of <strong className="text-secondary">5,000 loyalty points</strong>.
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-secondary text-on-secondary font-semibold text-xs tracking-widest uppercase hover:opacity-90 transition-all shadow-md cursor-pointer mt-4"
                  >
                    Enroll in Privilege Club
                  </button>
                </form>
              )}
            </div>

            {/* Right Column: Privilege Club Prestige & Tier Benefits */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-widest text-secondary font-semibold">The Aurelia Privilege Club</span>
                <h2 className="font-serif text-3xl font-light text-on-surface">
                  Unrivaled Recognition Across the Globe
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant font-light leading-relaxed">
                  Reserved for the hotel's most valued patrons. Enjoy bespoke tier privileges that elevate every stay into a tailored sanctuary.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-4">
                  <div className="p-2 rounded-xl bg-secondary/10 text-secondary">
                    <span className="material-symbols-outlined text-xl">schedule</span>
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-medium text-on-surface">Guaranteed 3:00 PM Late Departure</h4>
                    <p className="text-xs text-on-surface-variant font-light mt-0.5">Linger comfortably in your chamber or suite without departure rush.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-4">
                  <div className="p-2 rounded-xl bg-secondary/10 text-secondary">
                    <span className="material-symbols-outlined text-xl">upgrade</span>
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-medium text-on-surface">Complimentary Suite Upgrades</h4>
                    <p className="text-xs text-on-surface-variant font-light mt-0.5">Priority allocation to higher chambers and panoramic corner balconies.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-4">
                  <div className="p-2 rounded-xl bg-secondary/10 text-secondary">
                    <span className="material-symbols-outlined text-xl">local_bar</span>
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-medium text-on-surface">Sommelier Cellar Credit &amp; Welcome Bottle</h4>
                    <p className="text-xs text-on-surface-variant font-light mt-0.5">A chilled vintage bottle of Champagne awaiting in your room upon entry.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-4">
                  <div className="p-2 rounded-xl bg-secondary/10 text-secondary">
                    <span className="material-symbols-outlined text-xl">flight_takeoff</span>
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-medium text-on-surface">House Rolls-Royce Chauffeur</h4>
                    <p className="text-xs text-on-surface-variant font-light mt-0.5">Seamless complimentary airport transfers for Ambassador tier members.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
