import React from 'react'
import Newsletter3 from '@/components/ui/newsletter-3'
import Features1 from '@/components/ui/feature-1'
import Faq6 from '@/components/ui/faq-6'
import Footer15 from '@/components/ui/footer-15'

export function WebHome({ onGetStarted, isDarkMode = true }) {
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
        onCtaClick={onGetStarted}
        isDarkMode={isDarkMode}
      />
      <Features1 isDarkMode={isDarkMode} />
      <Faq6 isDarkMode={isDarkMode} />
      <Footer15 isDarkMode={isDarkMode} />
    </main>
  )
}

export default WebHome
