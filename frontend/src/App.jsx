import { useState } from 'react'
import WebHome from '@/components/ui/WebHome'
import ClientHome from '@/components/ui/ClientHome'
import Auth1 from '@/components/ui/auth-01'
import Auth2 from '@/components/ui/auth-02'

function App() {
  const [currentPage, setCurrentPage] = useState('home') // Default is clean untouched Web Home Page Site
  const [userEmail, setUserEmail] = useState('junior@heroui.com')
  const [isDarkMode, setIsDarkMode] = useState(true)

  const handleGetStarted = (e) => {
    if (e) e.preventDefault()
    setCurrentPage('signup')
  }

  const handleLoginSuccess = (email) => {
    if (email) setUserEmail(email)
    setCurrentPage('client-home')
  }

  const handleSignupSuccess = (data) => {
    if (data?.email) setUserEmail(data.email)
    setCurrentPage('client-home')
  }

  // Client Side Home Page (With Hero Sidebar)
  if (currentPage === 'client-home' || currentPage === 'feed') {
    return (
      <ClientHome
        userEmail={userEmail}
        onSignOut={() => setCurrentPage('home')}
      />
    )
  }

  // Login Page
  if (currentPage === 'login') {
    return (
      <main className={`min-h-screen w-full transition-colors duration-300 ${
        isDarkMode ? 'bg-[#09090b] text-[#fafafa]' : 'bg-white text-slate-900'
      }`}>
        <Auth1 
          bottomPromptText="Don't have an account?"
          bottomPromptLinkText="Create new account"
          onBottomPromptClick={() => setCurrentPage('signup')}
          onBackToHome={() => setCurrentPage('home')}
          onSubmit={(email) => handleLoginSuccess(email)}
          isDarkMode={isDarkMode}
        />
      </main>
    )
  }

  // Signup Page
  if (currentPage === 'signup') {
    return (
      <main className={`min-h-screen w-full transition-colors duration-300 ${
        isDarkMode ? 'bg-[#09090b] text-[#fafafa]' : 'bg-white text-slate-900'
      }`}>
        <Auth2 
          signInPromptText="Already have an account?"
          signInLinkText="Sign in"
          onSignInClick={() => setCurrentPage('login')}
          onBackToHome={() => setCurrentPage('home')}
          onSubmit={(data) => handleSignupSuccess(data)}
          isDarkMode={isDarkMode}
        />
      </main>
    )
  }

  // Web Home Page Site (Clean & Untouched Public Landing Page)
  return (
    <WebHome
      onGetStarted={handleGetStarted}
      isDarkMode={isDarkMode}
    />
  )
}

export default App
