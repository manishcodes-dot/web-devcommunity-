import { useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import WebHome from '@/components/ui/web-home';
import ClientHome from '@/components/ui/client-home';
import Auth1 from '@/components/ui/auth-01';
import Auth2 from '@/components/ui/auth-02';
import CreateNotePage from '@/components/ui/create-note';

function LoginPage({ onLoginSuccess, isDarkMode }) {
  const navigate = useNavigate();

  const handleLoginSubmit = (email) => {
    if (onLoginSuccess) onLoginSuccess(email || 'junior@heroui.com');
    navigate('/app');
  };

  return (
    <main className={`min-h-screen w-full transition-colors duration-300 ${
      isDarkMode ? 'bg-[#222831] text-[#eeeeee]' : 'bg-[#eeeeee] text-[#222831]'
    }`}>
      <Auth1 
        bottomPromptText="Don't have an account?"
        bottomPromptLinkText="Create new account"
        onBottomPromptClick={() => navigate('/signup')}
        onBackToHome={() => navigate('/')}
        onSubmit={(email) => handleLoginSubmit(email)}
        isDarkMode={isDarkMode}
      />
    </main>
  );
}

function SignupPage({ onSignupSuccess, isDarkMode }) {
  const navigate = useNavigate();

  const handleSignupSubmit = (data) => {
    const email = data?.email || 'junior@heroui.com';
    if (onSignupSuccess) onSignupSuccess(email);
    navigate('/app');
  };

  return (
    <main className={`min-h-screen w-full transition-colors duration-300 ${
      isDarkMode ? 'bg-[#222831] text-[#eeeeee]' : 'bg-[#eeeeee] text-[#222831]'
    }`}>
      <Auth2 
        signInPromptText="Already have an account?"
        signInLinkText="Sign in"
        onSignInClick={() => navigate('/login')}
        onBackToHome={() => navigate('/')}
        onSubmit={(data) => handleSignupSubmit(data)}
        isDarkMode={isDarkMode}
      />
    </main>
  );
}

function App() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('junior@heroui.com');
  const [customNotes, setCustomNotes] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const handleSaveNote = (newNote) => {
    setCustomNotes((prev) => [newNote, ...prev]);
  };

  return (
    <Routes>
      {/* Public Landing Web Home - Locked to White/Light Theme */}
      <Route
        path="/"
        element={
          <WebHome
            onGetStarted={() => navigate('/signup')}
            isDarkMode={false}
          />
        }
      />

      {/* Auth Pages - Locked to White/Light Theme */}
      <Route
        path="/login"
        element={<LoginPage isDarkMode={false} onLoginSuccess={(email) => setUserEmail(email)} />}
      />
      <Route
        path="/signup"
        element={<SignupPage isDarkMode={false} onSignupSuccess={(email) => setUserEmail(email)} />}
      />

      {/* Notion-Style Create Note Page */}
      <Route
        path="/create"
        element={
          <CreateNotePage
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
            onSaveNote={handleSaveNote}
          />
        }
      />

      {/* Main App Dashboard */}
      <Route
        path="/app"
        element={
          <ClientHome
            userEmail={userEmail}
            onSignOut={() => navigate('/')}
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
            onSignOut={() => navigate('/')}
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
