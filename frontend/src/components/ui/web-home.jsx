import React from 'react';
import { useNavigate } from 'react-router-dom';
import Newsletter3 from '@/components/ui/newsletter-3';
import { ArrowRight } from 'lucide-react';

export function WebHome({ onGetStarted, isDarkMode = false }) {
  const navigate = useNavigate();

  const handleCta = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      navigate('/app');
    }
  };

  const handleSearchPrompt = (prompt) => {
    navigate(`/app?search=${encodeURIComponent(prompt)}`);
  };

  const handleSelectTag = (tag) => {
    const cleanTag = tag.replace(/^#/, '');
    navigate(`/app?tag=${encodeURIComponent(cleanTag)}`);
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-300 font-sans select-none ${
        isDarkMode ? 'bg-[#222831] text-[#eeeeee]' : 'bg-[#eeeeee] text-[#222831]'
      }`}
    >
      {/* Sleek Minimalist Top Navigation */}
      <header className="w-full backdrop-blur-md bg-white/70 dark:bg-[#18181b]/70 border-b border-slate-200/50 dark:border-zinc-800/50 z-20">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Logo & Brand */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#2FA084] to-emerald-400 flex items-center justify-center font-mono font-black text-white text-xs shadow-sm shadow-emerald-500/25 flex-shrink-0">
              &lt;/&gt;
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-sm tracking-tight leading-none text-slate-900 dark:text-white font-mono">
                OVERSTACK
              </span>
              <span className="text-[9px] font-mono tracking-wider font-bold text-[#2FA084] uppercase mt-0.5">
                PUBLISHING
              </span>
            </div>
          </div>

          {/* Right Action Links */}
          <nav className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-medium">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="px-2 py-1 text-slate-600 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={handleCta}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#2FA084] hover:bg-[#268068] text-white shadow-sm shadow-[#2FA084]/20 transition-all hover:scale-105 cursor-pointer flex items-center gap-1"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section - Pure, Minimal, Focused */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <Newsletter3
          badgeText="✦ Developer Community"
          heading="Discover what you didn't know. Share what you do."
          description="Explore deep technical notes, solve tricky bugs, and share your knowledge with fellow developers."
          buttonText="Get started for free"
          subtext="Free forever • No credit card required • Instant access"
          onCtaClick={handleCta}
          onSendPrompt={handleSearchPrompt}
          onSelectTag={handleSelectTag}
          isDarkMode={isDarkMode}
        />
      </main>

      {/* Clean, Minimalist Bottom Footer */}
      <footer className="w-full py-4 text-xs border-t border-slate-200/50 dark:border-zinc-800/50 z-20">
        <div className="container mx-auto max-w-5xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-zinc-500 dark:text-zinc-400">
          <span>© {new Date().getFullYear()} OVERSTACK • The open developer publishing platform</span>
          <div className="flex items-center gap-4 text-xs">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#2FA084] transition-colors cursor-pointer"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default WebHome;
