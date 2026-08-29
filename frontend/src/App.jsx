import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import WebHome from '@/components/ui/web-home';
import ClientHome from '@/components/ui/client-home';
import Auth1 from '@/components/ui/auth-01';
import Auth2 from '@/components/ui/auth-02';
import CreateNotePage from '@/components/ui/create-note';
import { useAuth } from './context/AuthContext';

function LoginPage({ isDarkMode }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = async (email, password) => {
    setErrorMsg('');
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigate('/app');
    } catch (err) {
      setErrorMsg(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={`min-h-screen w-full transition-colors duration-300 ${
      isDarkMode ? 'bg-[#222831] text-[#eeeeee]' : 'bg-[#eeeeee] text-[#222831]'
    }`}>
      {errorMsg && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold shadow-lg animate-bounce">
          {errorMsg}
        </div>
      )}
      <Auth1 
        bottomPromptText="Don't have an account?"
        bottomPromptLinkText="Create new account"
        onBottomPromptClick={() => navigate('/signup')}
        onBackToHome={() => navigate('/')}
        onSubmit={(email, password) => handleLoginSubmit(email, password)}
        submitLabel={isSubmitting ? "Logging in..." : "Continue to workspace"}
        isDarkMode={isDarkMode}
      />
    </main>
  );
}

function SignupPage({ isDarkMode }) {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignupSubmit = async (data) => {
    setErrorMsg('');
    setIsSubmitting(true);
    const fullName = `${data?.firstName || ''} ${data?.lastName || ''}`.trim() || 'User';
    try {
      await register(fullName, data.email, data.password);
      navigate('/app');
    } catch (err) {
      setErrorMsg(err.message || 'Registration failed. Please check your details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={`min-h-screen w-full transition-colors duration-300 ${
      isDarkMode ? 'bg-[#222831] text-[#eeeeee]' : 'bg-[#eeeeee] text-[#222831]'
    }`}>
      {errorMsg && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold shadow-lg animate-bounce">
          {errorMsg}
        </div>
      )}
      <Auth2 
        signInPromptText="Already have an account?"
        signInLinkText="Sign in"
        onSignInClick={() => navigate('/login')}
        onBackToHome={() => navigate('/')}
        onSubmit={(data) => handleSignupSubmit(data)}
        submitLabel={isSubmitting ? "Creating account..." : "Create Account"}
        isDarkMode={isDarkMode}
      />
    </main>
  );
}

function App() {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, loading } = useAuth();
  const [customNotes, setCustomNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('news_custom_notes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const handleSaveNote = (newNote) => {
    setCustomNotes((prev) => {
      const updated = [newNote, ...prev];
      try {
        localStorage.setItem('news_custom_notes', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save custom note to localStorage', err);
      }
      return updated;
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#222831] text-emerald-400 font-bold text-sm">
        Loading session...
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Landing Web Home - Locked to White/Light Theme */}
      <Route
        path="/"
        element={
          <WebHome
            onGetStarted={() => navigate(isAuthenticated ? '/app' : '/signup')}
            isDarkMode={false}
          />
        }
      />

      {/* Auth Pages */}
      <Route
        path="/login"
        element={<LoginPage isDarkMode={false} />}
      />
      <Route
        path="/signup"
        element={<SignupPage isDarkMode={false} />}
      />

      {/* Notion-Style Create Note Page */}
      <Route
        path="/create"
        element={
          <CreateNotePage
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
            onSaveNote={handleSaveNote}
            userEmail={user?.email || 'guest@heroui.com'}
          />
        }
      />

      {/* Main App Dashboard */}
      <Route
        path="/app"
        element={
          <ClientHome
            userEmail={user?.email || 'guest@heroui.com'}
            currentUser={user}
            onSignOut={() => {
              logout();
              navigate('/');
            }}
            customNotes={customNotes}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
          />
        }
      />

      {/* Direct dev testing bypass route */}
      <Route
        path="/dev"
        element={
          <ClientHome
            userEmail="dev-test@heroui.com"
            currentUser={user}
            onSignOut={() => {
              logout();
              navigate('/');
            }}
            customNotes={customNotes}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
          />
        }
      />

      {/* Feed alias */}
      <Route
        path="/feed"
        element={<Navigate to="/app" replace />}
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
