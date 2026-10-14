import React from 'react';
import { Badge } from '@/components/base-ui/badge';
import { ArrowUpRight } from 'lucide-react';
import Particles from '@/components/ui/particles';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import PromptBar from '@/components/ui/prompt-bar';

export const Newsletter3 = ({
  badgeText = '✦ Developer Community',
  heading = "Discover what you didn't know. Share what you do.",
  description = "Explore deep technical notes, solve tricky bugs, and share your knowledge.",
  buttonText = 'Get started for free',
  ctaHref = '#',
  onCtaClick,
  onSendPrompt,
  onSelectTag,
  subtext = 'Free forever • No credit card required • Instant access',
  isDarkMode = false,
}) => {
  return (
    <section className={`relative flex flex-col flex-1 w-full items-center justify-center overflow-hidden transition-colors duration-300 ${
      isDarkMode ? 'bg-[#222831] text-[#eeeeee]' : 'bg-[#eeeeee] text-[#222831]'
    } py-12 md:py-16`}>
      {/* Background Particles */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Particles
          particleColors={isDarkMode ? ["#2FA084", "#eeeeee", "#393e46"] : ["#2FA084", "#222831", "#393e46"]}
          particleCount={220}
          particleSpread={12}
          speed={0.15}
          particleBaseSize={90}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
        />
      </div>

      {/* Background Grid Pattern */}
      <div className={`absolute inset-0 z-0 h-full w-full pointer-events-none bg-[size:3.5rem_3.5rem] ${
        isDarkMode
          ? 'bg-[linear-gradient(to_right,rgba(238,238,238,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(238,238,238,0.12)_1px,transparent_1px)]'
          : 'bg-[linear-gradient(to_right,rgba(34,40,49,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,40,49,0.15)_1px,transparent_1px)]'
      }`}>
        {/* Subtle Radial Glow */}
        <div className={`absolute inset-0 ${
          isDarkMode
            ? 'bg-[radial-gradient(circle_600px_at_50%_0%,rgba(47,160,132,0.35),transparent)]'
            : 'bg-[radial-gradient(circle_600px_at_50%_0%,rgba(47,160,132,0.22),transparent)]'
        }`}></div>
      </div>

      <div className="relative z-10 container mx-auto flex max-w-3xl flex-col items-center px-4 text-center md:px-6">
        {badgeText && (
          <Badge className="border-none px-3.5 mb-3 rounded-full py-1 text-xs font-semibold tracking-wide transition-colors shadow-xs bg-[#2FA084] text-white hover:bg-[#268068]">
            {badgeText}
          </Badge>
        )}

        <h1 className={`mb-4 text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl leading-[1.1] ${
          isDarkMode ? 'text-[#eeeeee]' : 'text-[#222831]'
        }`}>
          {heading}
        </h1>

        <p className={`mb-8 max-w-lg text-base leading-relaxed md:text-lg font-normal ${
          isDarkMode ? 'text-[#eeeeee]/80' : 'text-[#393e46]'
        }`}>
          {description}
        </p>

        <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4">
          <PromptBar
            onSend={(prompt, mode) => {
              if (onSendPrompt) {
                onSendPrompt(prompt, mode);
              } else if (onCtaClick) {
                onCtaClick();
              }
            }}
            onAttach={() => window.location.assign('/create')}
            isDarkMode={isDarkMode}
            placeholder="Search tech notes, ask a dev question, or explore..."
          />

          <a href={ctaHref} onClick={onCtaClick} className="no-underline mt-1">
            <ShimmerButton
              shimmerColor="#ffffff"
              shimmerSize="0.18em"
              shimmerDuration="2.5s"
              borderRadius="9999px"
              background="#2FA084"
              spread="140deg"
              className="px-8 py-3.5 shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer text-white"
            >
              <span className="flex items-center justify-center gap-2.5 text-center text-base font-bold leading-none tracking-tight md:text-lg text-white">
                {buttonText}
                <ArrowUpRight className="h-5 w-5 stroke-[2.5]" />
              </span>
            </ShimmerButton>
          </a>

          {subtext && (
            <p className={`text-xs md:text-sm font-medium ${
              isDarkMode ? 'text-zinc-400' : 'text-slate-500'
            }`}>
              {subtext}
            </p>
          )}

          {/* Minimal Trending Dev Community Topics */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
            <span className={`text-[11px] font-semibold uppercase tracking-wider ${
              isDarkMode ? 'text-zinc-500' : 'text-slate-400'
            }`}>
              Popular:
            </span>
            {['#javascript', '#react', '#nodejs', '#architecture', '#ai'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => {
                  if (onSelectTag) onSelectTag(tag);
                  else if (onCtaClick) onCtaClick();
                }}
                className={`rounded-full px-2.5 py-0.5 text-xs font-mono font-medium transition-all duration-150 cursor-pointer ${
                  isDarkMode
                    ? 'bg-zinc-800/80 text-zinc-300 hover:bg-emerald-500/20 hover:text-emerald-400'
                    : 'bg-white/80 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200/60 shadow-xs'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter3;
