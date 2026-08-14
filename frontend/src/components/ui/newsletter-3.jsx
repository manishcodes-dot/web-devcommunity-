import React from 'react';
import { Badge } from '@/components/base-ui/badge';
import { ArrowUpRight } from 'lucide-react';
import Particles from '@/components/ui/particles';
import { ShimmerButton } from '@/components/ui/shimmer-button';
import PromptBar from '@/components/ui/prompt-bar';

export const Newsletter3 = ({
  badgeText = 'Get Started',
  heading = 'Get the latest, stay inspired',
  description = 'Join for design tips, fresh releases, and smarter ways to elevate your work.',
  buttonText = 'Get started for free',
  ctaHref = '#',
  onCtaClick,
  subtext = 'No credit card required • Instant access',
  isDarkMode = false,
}) => {
  return (
    <section className={`relative flex min-h-screen w-full items-center justify-center overflow-hidden transition-colors duration-300 ${
      isDarkMode ? 'bg-[#222831] text-[#eeeeee]' : 'bg-[#eeeeee] text-[#222831]'
    } py-16 md:py-24`}>
      {/* Background Particles */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Particles
          particleColors={isDarkMode ? ["#2FA084", "#eeeeee", "#393e46"] : ["#2FA084", "#222831", "#393e46"]}
          particleCount={250}
          particleSpread={12}
          speed={0.15}
          particleBaseSize={100}
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
          <Badge className="border-none px-4 mb-4 rounded-full py-1.5 text-xs font-bold transition-colors shadow-sm bg-[#2FA084] text-white hover:bg-[#268068]">
            {badgeText}
          </Badge>
        )}

        <h2 className={`mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl leading-tight ${
          isDarkMode ? 'text-[#eeeeee]' : 'text-[#222831]'
        }`}>
          {heading}
        </h2>

        <p className={`mb-10 max-w-xl text-base leading-relaxed md:text-lg lg:text-xl font-normal ${
          isDarkMode ? 'text-[#eeeeee]/80' : 'text-[#393e46]'
        }`}>
          {description}
        </p>

        <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-6">
          <PromptBar onSend={(prompt, mode) => alert(`Sending prompt (${mode}): ${prompt}`)} />

          <a href={ctaHref} onClick={onCtaClick} className="no-underline mt-2">
            <ShimmerButton
              shimmerColor="#ffffff"
              shimmerSize="0.18em"
              shimmerDuration="2.5s"
              borderRadius="9999px"
              background="#2FA084"
              spread="140deg"
              className="px-9 py-4 shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer text-white"
            >
              <span className="flex items-center justify-center gap-3 text-center text-lg font-bold leading-none tracking-tight md:text-xl text-white">
                {buttonText}
                <ArrowUpRight className="h-6 w-6 stroke-[2.5]" />
              </span>
            </ShimmerButton>
          </a>

          {subtext && (
            <p className={`text-sm md:text-base font-medium mt-1 ${
              isDarkMode ? 'text-zinc-400' : 'text-slate-500'
            }`}>
              {subtext}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter3;

