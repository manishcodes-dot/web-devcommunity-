import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGithub, FaXTwitter, FaDiscord } from 'react-icons/fa6';
import { ArrowUpRight } from 'lucide-react';

export function Footer15({
  brandName = 'OVERSTACK',
  description = 'An open publishing platform for developers, engineers, and curious thinkers to discover details they didn’t know and share what they’ve learned.',
  isDarkMode = false,
}) {
  const navigate = useNavigate();

  return (
    <footer className="w-full font-sans antialiased mt-16 transition-colors duration-300 bg-[#1c2128] dark:bg-[#12151a] text-zinc-300 border-t border-zinc-800/80">
      <div className="container mx-auto max-w-6xl px-6 py-12 lg:py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-zinc-800/70">
          {/* Brand Info & Mission (Col 1-5) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 cursor-pointer select-none w-fit"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#2FA084] to-emerald-400 flex items-center justify-center font-mono font-black text-white text-xs shadow-md shadow-emerald-500/25 flex-shrink-0">
                &lt;/&gt;
              </div>
              <div className="flex flex-col">
                <span className="font-black text-base tracking-tight leading-none text-white font-mono">
                  {brandName}
                </span>
                <span className="text-[10px] font-mono tracking-wider font-bold text-[#2FA084] uppercase mt-0.5">
                  PUBLISHING
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-zinc-400 max-w-sm">
              {description}
            </p>

            {/* Social & Community Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-800/90 hover:bg-[#2FA084] hover:text-white text-zinc-400 flex items-center justify-center transition-colors cursor-pointer"
                title="GitHub"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-800/90 hover:bg-[#2FA084] hover:text-white text-zinc-400 flex items-center justify-center transition-colors cursor-pointer"
                title="Twitter / X"
              >
                <FaXTwitter className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-zinc-800/90 hover:bg-[#2FA084] hover:text-white text-zinc-400 flex items-center justify-center transition-colors cursor-pointer"
                title="Discord Community"
              >
                <FaDiscord className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav Columns (Col 6-12) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Read & Explore */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                Explore
              </span>
              <ul className="flex flex-col gap-2.5 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/app')}
                    className="text-zinc-400 hover:text-[#2FA084] transition-colors cursor-pointer text-left"
                  >
                    Community Feed
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/app')}
                    className="text-zinc-400 hover:text-[#2FA084] transition-colors cursor-pointer text-left"
                  >
                    Saved Posts
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/app')}
                    className="text-zinc-400 hover:text-[#2FA084] transition-colors cursor-pointer text-left"
                  >
                    Tech Discussions
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/app')}
                    className="text-zinc-400 hover:text-[#2FA084] transition-colors cursor-pointer text-left"
                  >
                    Code Snippets
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 2: Share & Write */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                Write & Share
              </span>
              <ul className="flex flex-col gap-2.5 text-sm">
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/create')}
                    className="text-zinc-400 hover:text-[#2FA084] transition-colors cursor-pointer text-left flex items-center gap-1"
                  >
                    <span>Write a Note</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/app')}
                    className="text-zinc-400 hover:text-[#2FA084] transition-colors cursor-pointer text-left"
                  >
                    Creator Stats
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/app')}
                    className="text-zinc-400 hover:text-[#2FA084] transition-colors cursor-pointer text-left"
                  >
                    Followed Writers
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-zinc-400 hover:text-[#2FA084] transition-colors cursor-pointer text-left"
                  >
                    Author Sign In
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Topics */}
            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <span className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                Popular Topics
              </span>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {['#react', '#node', '#architecture', '#systemdesign', '#python', '#ai', '#debugging'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => navigate(`/app?tag=${t.replace('#', '')}`)}
                    className="px-2 py-0.5 rounded-md bg-zinc-800/80 hover:bg-[#2FA084]/20 hover:text-[#2FA084] text-xs font-mono text-zinc-400 transition-colors cursor-pointer"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Clean Bottom Copyright & Community Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} OVERSTACK. Built for developers, builders, and thinkers.</p>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <span>Open knowledge sharing — just like Medium & DEV Community.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer15;
