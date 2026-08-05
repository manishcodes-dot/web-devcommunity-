import { useState } from 'react'
import Newsletter3 from '@/components/ui/newsletter-3'
import Features1 from '@/components/ui/feature-1'
import Faq6 from '@/components/ui/faq-6'
import Footer15 from '@/components/ui/footer-15'
import Auth1 from '@/components/ui/auth-01'
import Auth2 from '@/components/ui/auth-02'
import NewsHome from '@/components/ui/news-home'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [userEmail, setUserEmail] = useState('alex@company.io')
  const [isDarkMode, setIsDarkMode] = useState(false) // Default to light theme

  const handleGetStarted = (e) => {
    if (e) e.preventDefault()
    setCurrentPage('signup')
  }

  const handleLoginSuccess = (email) => {
    if (email) setUserEmail(email)
    setCurrentPage('feed')
  }

  const handleSignupSuccess = (data) => {
    if (data?.email) setUserEmail(data.email)
    setCurrentPage('feed')
  }

  if (currentPage === 'feed') {
    return (
      <NewsHome
        userEmail={userEmail}
        onSignOut={() => setCurrentPage('home')}
      />
    )
  }

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

  return (
    <main className={`min-h-screen w-full transition-colors duration-300 ${
      isDarkMode ? 'bg-[#09090b] text-white' : 'bg-white text-slate-900'
    }`}>
      <Newsletter3 
        badgeText="Get Started"
        heading="Get the latest, stay inspired"
        description="Join for design tips, fresh releases, and smarter ways to elevate your work."
        buttonText="Get started for free"
        subtext="No credit card required • Instant access"
        onCtaClick={handleGetStarted}
        isDarkMode={isDarkMode}
      />
      <Features1 isDarkMode={isDarkMode} />
      <Faq6 isDarkMode={isDarkMode} />
      <Footer15 isDarkMode={isDarkMode} />
    </main>
  )
}

export default App
