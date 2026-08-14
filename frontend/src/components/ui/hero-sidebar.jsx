import React, { useState, useEffect, useRef } from 'react'
import {
  Search,
  Home,
  Compass,
  Bookmark,
  Bell,
  Globe,
  Lock,
  FileText,
  Users,
  Plus,
  ChevronDown,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  X,
  Moon,
  Sun
} from 'lucide-react'
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

export function HeroSidebar({
  activeItem = 'Home',
  onSelect,
  isDarkMode = false,
  onToggleTheme,
  isCollapsed: controlledIsCollapsed,
  onToggleCollapse: controlledOnToggleCollapse
}) {
  const [internalIsCollapsed, setInternalIsCollapsed] = useState(false)
  const isCollapsed = controlledIsCollapsed !== undefined ? controlledIsCollapsed : internalIsCollapsed

  const toggleCollapse = () => {
    if (controlledOnToggleCollapse) {
      controlledOnToggleCollapse()
    } else {
      setInternalIsCollapsed(!internalIsCollapsed)
    }
  }

  const [currentActive, setCurrentActive] = useState(activeItem)
  const [isLibraryOpen, setIsLibraryOpen] = useState(true)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const profileRef = useRef(null)

  // Listen for outside click to close profile popover
  useEffect(() => {
    if (!isProfileOpen) return
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isProfileOpen])

  // Listen for physical Escape key & ⌘K/Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        setIsSearchOpen(false)
        setIsProfileOpen(false)
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsSearchOpen((prev) => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleNavClick = (name) => {
    setCurrentActive(name)
    if (onSelect) onSelect(name)
  }

  return (
    <aside
      className={`h-screen flex flex-col justify-between p-3 border-r font-sans select-none relative overflow-visible transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      } ${
        isDarkMode
          ? 'bg-[#1c222a] text-zinc-300 border-zinc-800/80'
          : 'bg-white text-slate-700 border-slate-200/80 shadow-xs'
      }`}
    >
      {/* Top Header & Navigation */}
      <div className="flex flex-col space-y-4">
        {/* Brand Header & Sidebar Collapse Button */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center flex-col gap-3' : 'justify-between'} px-1 py-1.5`}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-white text-sm shadow-sm shadow-emerald-500/30 flex-shrink-0">
              H
            </div>
            {!isCollapsed && (
              <span className={`font-bold text-base tracking-tight truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                HeroUI Labs
              </span>
            )}
          </div>

          {/* Sidebar Collapse Toggle Button */}
          <button
            onClick={toggleCollapse}
            className={`p-1.5 rounded-lg transition-colors flex-shrink-0 ${
              isDarkMode
                ? 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Main Nav Items */}
        <nav className="space-y-1">
          {/* Home */}
          <button
            onClick={() => handleNavClick('Home')}
            title="Home"
            className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-2' : 'gap-3 px-3 py-2'} rounded-xl text-sm font-medium transition-all ${
              currentActive === 'Home'
                ? isDarkMode
                  ? 'bg-[#27272a]/80 text-white shadow-xs font-semibold'
                  : 'bg-slate-200/80 text-slate-900 shadow-xs font-semibold'
                : isDarkMode
                  ? 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            <Home className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span>Home</span>}
          </button>

          {/* Explore */}
          <button
            onClick={() => handleNavClick('Explore')}
            title="Explore"
            className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-2' : 'gap-3 px-3 py-2'} rounded-xl text-sm font-medium transition-all ${
              currentActive === 'Explore'
                ? isDarkMode
                  ? 'bg-[#27272a]/80 text-white shadow-xs font-semibold'
                  : 'bg-slate-200/80 text-slate-900 shadow-xs font-semibold'
                : isDarkMode
                  ? 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            <Compass className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span>Explore</span>}
          </button>

          {/* Bookmarks */}
          <button
            onClick={() => handleNavClick('Bookmarks')}
            title="Bookmarks"
            className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-2' : 'gap-3 px-3 py-2'} rounded-xl text-sm font-medium transition-all ${
              currentActive === 'Bookmarks'
                ? isDarkMode
                  ? 'bg-[#27272a]/80 text-white shadow-xs font-semibold'
                  : 'bg-slate-200/80 text-slate-900 shadow-xs font-semibold'
                : isDarkMode
                  ? 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            <Bookmark className="w-4 h-4 flex-shrink-0" />
            {!isCollapsed && <span>Bookmarks</span>}
          </button>
        </nav>

        {/* Spaces Section */}
        <div className="pt-2">
          {!isCollapsed && (
            <div className={`px-3 pb-2 text-xs font-semibold tracking-wide ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
              Spaces
            </div>
          )}

          <div className="space-y-1">
            {/* My Library Collapsible */}
            <div>
              <button
                onClick={() => isCollapsed ? toggleCollapse() : setIsLibraryOpen(!isLibraryOpen)}
                title="My library"
                className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-2' : 'justify-between px-3 py-2'} rounded-xl text-sm font-medium transition-colors group ${
                  isDarkMode
                    ? 'text-zinc-200 hover:bg-zinc-900/60'
                    : 'text-slate-700 hover:bg-slate-100/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Lock className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? 'text-zinc-400 group-hover:text-zinc-200' : 'text-slate-400 group-hover:text-slate-700'}`} />
                  {!isCollapsed && <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>My library</span>}
                </div>
                {!isCollapsed && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      isDarkMode ? 'text-zinc-400' : 'text-slate-400'
                    } ${isLibraryOpen ? '' : '-rotate-90'}`}
                  />
                )}
              </button>

              {/* Nested tree items */}
              {isLibraryOpen && !isCollapsed && (
                <div className={`ml-5 mt-1 pl-3 space-y-1 border-l ${
                  isDarkMode ? 'border-zinc-800/80' : 'border-slate-200'
                }`}>
                  <button
                    onClick={() => handleNavClick('Design Tokens')}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                      currentActive === 'Design Tokens'
                        ? isDarkMode ? 'text-white font-medium bg-zinc-800/40' : 'text-slate-900 font-semibold bg-slate-200/60'
                        : isDarkMode ? 'text-zinc-300 hover:text-white hover:bg-zinc-900/40' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>Design Tokens</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('Color Palette')}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                      currentActive === 'Color Palette'
                        ? isDarkMode ? 'text-white font-medium bg-zinc-800/40' : 'text-slate-900 font-semibold bg-slate-200/60'
                        : isDarkMode ? 'text-zinc-300 hover:text-white hover:bg-zinc-900/40' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>Color Palette</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('Typography')}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm transition-colors ${
                      currentActive === 'Typography'
                        ? isDarkMode ? 'text-white font-medium bg-zinc-800/40' : 'text-slate-900 font-semibold bg-slate-200/60'
                        : isDarkMode ? 'text-zinc-300 hover:text-white hover:bg-zinc-900/40' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>Typography</span>
                  </button>
                </div>
              )}
            </div>

            {/* Design Team */}
            <button
              onClick={() => handleNavClick('Design team')}
              title="Design team"
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-2' : 'gap-3 px-3 py-2'} rounded-xl text-sm font-medium transition-all ${
                currentActive === 'Design team'
                  ? isDarkMode ? 'bg-[#27272a]/80 text-white font-semibold' : 'bg-slate-200/80 text-slate-900 font-semibold'
                  : isDarkMode ? 'text-zinc-300 hover:text-white hover:bg-zinc-900/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Users className="w-4 h-4 text-slate-400 flex-shrink-0" />
              {!isCollapsed && <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Design team</span>}
            </button>

            {/* Add Space */}
            <button
              onClick={() => handleNavClick('Add space')}
              title="Add space"
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-2' : 'gap-3 px-3 py-2'} rounded-xl text-sm font-medium transition-colors ${
                isDarkMode
                  ? 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Plus className="w-4 h-4 text-slate-400 flex-shrink-0" />
              {!isCollapsed && <span>Add space</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Profile Popover & Trigger */}
      <div ref={profileRef} className="relative pt-2">
        {/* Floating Popover Menu */}
        {isProfileOpen && !isCollapsed && (
          <div className={`absolute bottom-full mb-2 left-0 right-0 z-50 border rounded-2xl p-3.5 shadow-xl space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-150 ${
            isDarkMode
              ? 'bg-[#18181b] border-zinc-800/90 text-zinc-200'
              : 'bg-white border-slate-200 text-slate-800 shadow-slate-300/50'
          }`}>
            {/* User Profile Header inside Card */}
            <div className={`flex items-center gap-3 pb-2 border-b ${
              isDarkMode ? 'border-zinc-800/50' : 'border-slate-100'
            }`}>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 flex-shrink-0 shadow-inner" />
              <div className="overflow-hidden">
                <div className={`font-semibold text-sm truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Junior Garcia
                </div>
                <div className={`text-xs truncate ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                  junior@heroui.com
                </div>
              </div>
            </div>

            {/* Popover Actions */}
            <div className="space-y-1 pt-0.5 text-sm font-medium">
              <button
                onClick={() => handleNavClick('Dashboard')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'text-zinc-200 hover:text-white hover:bg-zinc-800/60'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Dashboard
              </button>

              <button
                onClick={() => handleNavClick('Profile')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'text-zinc-200 hover:text-white hover:bg-zinc-800/60'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                Profile
              </button>

              <button
                onClick={() => handleNavClick('Settings')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'text-zinc-200 hover:text-white hover:bg-zinc-800/60'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>Settings</span>
                <Settings className={`w-4 h-4 ${isDarkMode ? 'text-zinc-400' : 'text-slate-400'}`} />
              </button>

              <button
                onClick={() => handleNavClick('Create Team')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${
                  isDarkMode
                    ? 'text-zinc-200 hover:text-white hover:bg-zinc-800/60'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <span>Create Team</span>
                <Users className={`w-4 h-4 ${isDarkMode ? 'text-zinc-400' : 'text-slate-400'}`} />
              </button>

              {onToggleTheme && (
                <AnimatedThemeToggler
                  theme={isDarkMode ? "dark" : "light"}
                  onThemeChange={() => onToggleTheme()}
                  duration={1200}
                  variant="circle"
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
                    isDarkMode
                      ? 'text-zinc-200 hover:text-white hover:bg-zinc-800/60'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {isDarkMode ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                    <span>Theme</span>
                  </div>
                  <div className={`w-8 h-4.5 rounded-full p-0.5 transition-colors flex items-center ${isDarkMode ? 'bg-emerald-500 justify-end' : 'bg-slate-300 justify-start'}`}>
                    <div className="w-3.5 h-3.5 rounded-full bg-white shadow-sm" />
                  </div>
                </AnimatedThemeToggler>
              )}

              <button
                onClick={() => handleNavClick('Logout')}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors font-medium ${
                  isDarkMode
                    ? 'text-red-500 hover:bg-red-500/10'
                    : 'text-red-600 hover:bg-red-50'
                }`}
              >
                <span>Log Out</span>
                <LogOut className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        )}

        {/* Bottom Profile Trigger Bar */}
        <button
          onClick={() => isCollapsed ? toggleCollapse() : setIsProfileOpen(!isProfileOpen)}
          title="Junior"
          className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-2' : 'justify-between px-2.5 py-2'} rounded-xl transition-colors text-left group ${
            isDarkMode
              ? 'hover:bg-zinc-900/80 text-white'
              : 'hover:bg-slate-100 text-slate-900'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 flex-shrink-0 shadow-inner" />
            {!isCollapsed && <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Junior</span>}
          </div>
          {!isCollapsed && (
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                isDarkMode ? 'text-zinc-400' : 'text-slate-400'
              } ${isProfileOpen ? 'rotate-180' : ''}`}
            />
          )}
        </button>
      </div>

      {/* Command Search Modal Dialog */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-start justify-center pt-20 px-4 cursor-pointer"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className={`w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 border cursor-default ${
              isDarkMode
                ? 'bg-[#18181b] border-zinc-800 text-white'
                : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex items-center px-4 border-b ${
              isDarkMode ? 'border-zinc-800/80' : 'border-slate-200'
            }`}>
              <Search className="w-4 h-4 text-slate-400 mr-3 flex-shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search components, design tokens, spaces..."
                className={`w-full bg-transparent py-3.5 text-sm focus:outline-none ${
                  isDarkMode
                    ? 'text-white placeholder-zinc-500'
                    : 'text-slate-900 placeholder-slate-400'
                }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape' || e.key === 'Esc') {
                    setIsSearchOpen(false)
                  }
                }}
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className={`text-xs px-2 py-1 rounded font-semibold cursor-pointer transition-colors ${
                  isDarkMode
                    ? 'text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700'
                    : 'text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200'
                }`}
              >
                ESC
              </button>
            </div>

            <div className="p-2 max-h-60 overflow-y-auto space-y-1">
              <div className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider ${
                isDarkMode ? 'text-zinc-500' : 'text-slate-400'
              }`}>
                Quick Navigation
              </div>
              {['Home', 'Activity', 'Browse', 'Design Tokens', 'Color Palette', 'Typography', 'Design team']
                .filter((item) =>
                  item.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      handleNavClick(item)
                      setIsSearchOpen(false)
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                      isDarkMode
                        ? 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
                        : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <span>{item}</span>
                    <span className={`text-xs ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>Jump to</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}

export default HeroSidebar
