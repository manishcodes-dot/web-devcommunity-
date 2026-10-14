import React, { useState } from 'react'
import HeroSidebar from './hero-sidebar'
import {
  Sparkles,
  Sliders,
  Layers,
  Palette,
  Type,
  Users,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Zap,
  Activity,
  Compass
} from 'lucide-react'

export function SidebarShowcase({ onBack }) {
  const [selectedSection, setSelectedSection] = useState('Home')

  return (
    <div className="flex h-screen w-full bg-[#09090b] text-zinc-100 overflow-hidden font-sans">
      {/* Sidebar Component */}
      <HeroSidebar
        activeItem={selectedSection}
        onSelect={(item) => setSelectedSection(item)}
      />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto bg-[#0c0c0e]">
        {/* Top Workspace Bar */}
        <header className="h-14 border-b border-zinc-800/80 px-6 flex items-center justify-between bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-zinc-500 font-medium">HeroUI Labs</span>
            <ChevronRight className="w-4 h-4 text-zinc-600" />
            <span className="text-zinc-200 font-semibold">{selectedSection}</span>
          </div>

          <div className="flex items-center gap-3">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg transition-colors"
              >
                Back to Site
              </button>
            )}
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Sidebar Demo
            </div>
          </div>
        </header>

        {/* Dynamic Content Display */}
        <main className="p-8 max-w-6xl w-full mx-auto space-y-8">
          {/* Content based on selected section */}
          {selectedSection === 'Home' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight">
                    Welcome back, Junior
                  </h1>
                  <p className="text-zinc-400 text-sm mt-1">
                    Manage your design tokens, component spaces, and team workspaces.
                  </p>
                </div>
                <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl text-sm transition-all shadow-md shadow-emerald-900/30 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  New Project
                </button>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-[#141417] border border-zinc-800/80 space-y-2">
                  <div className="text-xs font-medium text-zinc-400">Total Tokens</div>
                  <div className="text-2xl font-bold text-white">1,248</div>
                  <div className="text-xs text-emerald-400 font-medium">
                    +12 added this week
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#141417] border border-zinc-800/80 space-y-2">
                  <div className="text-xs font-medium text-zinc-400">Active Spaces</div>
                  <div className="text-2xl font-bold text-white">4 Spaces</div>
                  <div className="text-xs text-zinc-400 font-medium">
                    My library, Design team + 2 more
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-[#141417] border border-zinc-800/80 space-y-2">
                  <div className="text-xs font-medium text-zinc-400">Team Members</div>
                  <div className="text-2xl font-bold text-white">12 Members</div>
                  <div className="text-xs text-emerald-400 font-medium">
                    3 active right now
                  </div>
                </div>
              </div>

              {/* Quick Access Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-r from-zinc-900 to-[#141417] border border-zinc-800 space-y-4">
                <h2 className="text-lg font-semibold text-white">Sidebar Features Implemented</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/50">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 mt-0.5" />
                    <div>
                      <div className="font-semibold text-zinc-200">Collapsible Sub-Tree</div>
                      <div className="text-zinc-400 text-xs mt-0.5">Accordion with vertical guide lines & smooth rotation icons.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/50">
                    <Zap className="w-4 h-4 text-emerald-400 mt-0.5" />
                    <div>
                      <div className="font-semibold text-zinc-200">Interactive User Card</div>
                      <div className="text-zinc-400 text-xs mt-0.5">Toggle profile popover card with Settings, Dashboard, and Log Out options.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/50">
                    <Search className="w-4 h-4 text-emerald-400 mt-0.5" />
                    <div>
                      <div className="font-semibold text-zinc-200">Quick Command Palette (⌘K)</div>
                      <div className="text-zinc-400 text-xs mt-0.5">Click Search or press shortcut to trigger instant modal search.</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/50">
                    <Palette className="w-4 h-4 text-emerald-400 mt-0.5" />
                    <div>
                      <div className="font-semibold text-zinc-200">HeroUI Dark Aesthetic</div>
                      <div className="text-zinc-400 text-xs mt-0.5">Deep zinc tones, pill active states, and custom gradient avatar.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedSection === 'Design Tokens' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h1 className="text-2xl font-bold text-white">Design Tokens</h1>
              <p className="text-zinc-400 text-sm">System variables for color, spacing, radius, and elevation.</p>
              <div className="p-6 rounded-2xl bg-[#141417] border border-zinc-800 font-mono text-xs space-y-2">
                <div className="text-emerald-400">--color-sidebar-bg: #09090b;</div>
                <div className="text-emerald-400">--color-[#27272a]-active: #27272a;</div>
                <div className="text-emerald-400">--radius-popover: 1rem;</div>
              </div>
            </div>
          )}

          {selectedSection === 'Color Palette' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h1 className="text-2xl font-bold text-white">Color Palette</h1>
              <div className="grid grid-cols-4 gap-4">
                <div className="h-24 rounded-xl bg-[#09090b] border border-zinc-800 p-3 flex flex-col justify-end text-xs font-mono">#09090b (Sidebar)</div>
                <div className="h-24 rounded-xl bg-[#18181b] border border-zinc-800 p-3 flex flex-col justify-end text-xs font-mono">#18181b (Card)</div>
                <div className="h-24 rounded-xl bg-[#27272a] border border-zinc-800 p-3 flex flex-col justify-end text-xs font-mono">#27272a (Active)</div>
                <div className="h-24 rounded-xl bg-emerald-500 p-3 flex flex-col justify-end text-xs font-mono text-white">#10b981 (Hero Brand)</div>
              </div>
            </div>
          )}

          {selectedSection === 'Typography' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h1 className="text-2xl font-bold text-white">Typography</h1>
              <div className="p-6 rounded-2xl bg-[#141417] border border-zinc-800 space-y-4">
                <div className="text-3xl font-extrabold text-white">HeroUI Display Bold</div>
                <div className="text-xl font-semibold text-zinc-200">Section Header Semibold</div>
                <div className="text-sm font-medium text-zinc-300">Navigation Link Medium (14px)</div>
                <div className="text-xs text-zinc-500">Muted Category Header (12px)</div>
              </div>
            </div>
          )}

          {!['Home', 'Design Tokens', 'Color Palette', 'Typography'].includes(selectedSection) && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <h1 className="text-2xl font-bold text-white">{selectedSection} Workspace</h1>
              <div className="p-8 rounded-2xl bg-[#141417] border border-zinc-800/80 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center mx-auto text-emerald-400">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">Viewing {selectedSection}</h3>
                <p className="text-sm text-zinc-400 max-w-md mx-auto">
                  You successfully clicked on <span className="text-white font-medium">{selectedSection}</span> in the sidebar!
                </p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default SidebarShowcase
