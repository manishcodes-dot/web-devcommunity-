import { useState, useEffect, useRef } from 'react';
import {
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Moon,
  Sun,
  ChevronDown,
  User,
  Edit3,
} from 'lucide-react';
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { UserAvatar } from "./user-avatar";

// Custom outline SVG icons matching the design
function HomeIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5L12 3.5L21 10.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V10.5Z" />
      <path d="M9 21V13.5H15V21" />
    </svg>
  );
}

function SavedPostIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6.5C4 5.12 5.12 4 6.5 4H14.5" />
      <path d="M4 6.5V19.5L7.5 17.2" />
      <path d="M8 8.5C8 7.12 9.12 6 10.5 6H17.5C18.88 6 20 7.12 20 8.5V21.5L14 17.8L8 21.5V8.5Z" />
    </svg>
  );
}

function StoriesIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <line x1="8.5" y1="8" x2="15.5" y2="8" />
      <line x1="8.5" y1="12" x2="15.5" y2="12" />
      <line x1="8.5" y1="16" x2="12" y2="16" />
    </svg>
  );
}


const NAV_ITEMS = [
  { id: 'Home', label: 'Home', icon: HomeIcon },
  { id: 'Saved Post', label: 'Saved Post', icon: SavedPostIcon },
  { id: 'Stories', label: 'Stories', icon: StoriesIcon },
];

export function HeroSidebar({
  activeItem = 'Home',
  onSelect,
  isDarkMode = false,
  onToggleTheme,
  isCollapsed: controlledIsCollapsed,
  onToggleCollapse: controlledOnToggleCollapse,
  currentUser,
  userEmail,
}) {
  const [internalIsCollapsed, setInternalIsCollapsed] = useState(false);
  const isCollapsed = controlledIsCollapsed !== undefined ? controlledIsCollapsed : internalIsCollapsed;

  const toggleCollapse = () => {
    if (controlledOnToggleCollapse) {
      controlledOnToggleCollapse();
    } else {
      setInternalIsCollapsed(!internalIsCollapsed);
    }
  };

  const [currentActive, setCurrentActive] = useState(activeItem);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Followed developers state
  const [followedDevs, setFollowedDevs] = useState(() => {
    try {
      const saved = localStorage.getItem('overstack_followed_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const active = parsed.filter((d) => d.isFollowing !== false);
          if (active.length > 0) return active;
        }
      }
    } catch {
      // ignore
    }
    return [
      { id: 'dev-sarah', name: 'Sarah Chen', handle: 'sarah_frontend', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', isFollowing: true },
      { id: 'dev-marcus', name: 'Marcus Vance', handle: 'marcus_dist', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', isFollowing: true },
      { id: 'dev-elena', name: 'Elena Rostova', handle: 'elena_ai', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', isFollowing: true },
      { id: 'dev-david', name: 'David Kim', handle: 'david_cloud', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', isFollowing: true },
    ];
  });

  useEffect(() => {
    const handleUpdate = () => {
      try {
        const saved = localStorage.getItem('overstack_followed_users');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setFollowedDevs(parsed.filter((d) => d.isFollowing !== false));
          }
        }
      } catch {
        // ignore
      }
    };
    window.addEventListener('following_updated', handleUpdate);
    return () => window.removeEventListener('following_updated', handleUpdate);
  }, []);

  useEffect(() => {
    if (activeItem) {
      setCurrentActive(activeItem);
    }
  }, [activeItem]);

  // Listen for outside click to close profile popover
  useEffect(() => {
    if (!isProfileOpen) return;
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileOpen]);

  // Escape key closes profile
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        setIsProfileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (name) => {
    setCurrentActive(name);
    if (onSelect) onSelect(name);
  };

  const isItemActive = (id) => {
    if (currentActive === id) return true;
    if (id === 'Home' && (currentActive === 'Dev Feed' || currentActive === 'feed')) return true;
    if (id === 'Saved Post' && (currentActive === 'Bookmarks' || currentActive === 'Library' || currentActive === 'Saved Post' || currentActive === 'Saved Posts')) return true;
    if (id === 'Stories' && currentActive === 'My Notes') return true;
    if (id === 'Stats' && currentActive === 'Dashboard') return true;
    return false;
  };

  return (
    <aside
      className={`h-screen flex flex-col justify-between py-4 border-r font-sans select-none relative overflow-visible transition-all duration-300 ${
        isCollapsed ? 'w-16 px-2' : 'w-60 px-3'
      } ${
        isDarkMode
          ? 'bg-[#18181b] text-zinc-300 border-zinc-800/60'
          : 'bg-white text-slate-700 border-slate-200/80 shadow-xs'
      }`}
    >
      {/* Top Header & Navigation */}
      <div className="flex flex-col space-y-4">
        {/* Brand Header & Collapse Toggle */}
        <div className={`flex items-center ${isCollapsed ? 'justify-center flex-col gap-3' : 'justify-between'} px-2 py-1`}>
          <div
            onClick={() => handleNavClick('Home')}
            className="flex items-center gap-2.5 cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center font-mono font-black text-white text-xs shadow-md shadow-emerald-500/25 flex-shrink-0 tracking-tighter">
              &lt;/&gt;
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className={`font-black text-base tracking-tight truncate leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  OVERSTACK
                </span>
                <span className="text-[10px] font-mono tracking-wider font-bold text-emerald-500 uppercase mt-0.5">
                  PUBLISHING
                </span>
              </div>
            )}
          </div>

          {/* Sidebar Collapse Toggle Button */}
          <button
            type="button"
            onClick={toggleCollapse}
            className={`p-1.5 rounded-lg transition-colors flex-shrink-0 cursor-pointer ${
              isDarkMode
                ? 'text-zinc-500 hover:text-white hover:bg-zinc-800'
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

        {/* Clean Navigation: Home, Saved Post, Stories, Stats */}
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = isItemActive(item.id);
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                title={item.label}
                className={`relative w-full flex items-center ${
                  isCollapsed ? 'justify-center px-0 py-2.5' : 'gap-4 px-4 py-2.5'
                } text-[15px] sm:text-base transition-colors cursor-pointer text-left select-none ${
                  active
                    ? isDarkMode
                      ? 'text-white font-medium'
                      : 'text-slate-900 font-medium'
                    : isDarkMode
                      ? 'text-zinc-400 hover:text-zinc-100'
                      : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {/* Active Indicator on the left edge */}
                {active && (
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2.5px] h-5 rounded-r-xs ${
                      isDarkMode ? 'bg-white' : 'bg-slate-900'
                    }`}
                  />
                )}
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Following Functions Section Below */}
        <div className="pt-3 border-t border-slate-100 dark:border-zinc-800/60">
          {!isCollapsed && (
            <div className="flex items-center justify-between px-4 pb-1.5">
              <button
                type="button"
                onClick={() => handleNavClick('Following')}
                className={`text-[11px] font-bold uppercase tracking-wider font-mono cursor-pointer transition-colors ${
                  currentActive === 'Following'
                    ? 'text-emerald-500'
                    : isDarkMode
                    ? 'text-zinc-500 hover:text-zinc-300'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                Following ({followedDevs.length})
              </button>
            </div>
          )}

          <div className="space-y-0.5">
            {followedDevs.map((dev) => (
              <button
                key={dev.id}
                type="button"
                onClick={() => handleNavClick('@' + dev.handle)}
                title={`${dev.name} (@${dev.handle})`}
                className={`relative w-full flex items-center ${
                  isCollapsed ? 'justify-center px-0 py-2' : 'gap-3 px-4 py-2'
                } rounded-xl text-xs font-medium transition-colors cursor-pointer text-left ${
                  currentActive === '@' + dev.handle
                    ? isDarkMode
                      ? 'text-white font-semibold'
                      : 'text-slate-900 font-semibold'
                    : isDarkMode
                      ? 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/40'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                }`}
              >
                {currentActive === '@' + dev.handle && (
                  <span
                    className={`absolute left-0 top-1/2 -translate-y-1/2 w-[2.5px] h-4 rounded-r-xs ${
                      isDarkMode ? 'bg-white' : 'bg-slate-900'
                    }`}
                  />
                )}
                <UserAvatar
                  src={dev.avatar}
                  name={dev.name}
                  seed={dev.handle || dev.name}
                  size={20}
                  className="w-5 h-5 rounded-full shrink-0"
                />
                {!isCollapsed && (
                  <div className="flex flex-col items-start min-w-0">
                    <span className="text-xs truncate leading-tight font-medium">{dev.name}</span>
                    <span className="text-[10px] text-emerald-500 truncate leading-tight">@{dev.handle}</span>
                  </div>
                )}
              </button>
            ))}

            {followedDevs.length === 0 && !isCollapsed && (
              <div className="px-4 py-2 text-xs text-zinc-500 italic">
                No followed users yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Profile Popover & Trigger */}
      <div ref={profileRef} className="relative pt-2">
        {/* Floating Popover Menu */}
        {isProfileOpen && !isCollapsed && (
          <div className={`absolute bottom-full mb-2 left-0 right-0 z-50 rounded-2xl p-3 shadow-2xl space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-150 ring-1 ring-black/5 dark:ring-white/10 ${
            isDarkMode
              ? 'bg-[#18181b] text-zinc-200'
              : 'bg-white text-slate-800'
          }`}>
            {/* Clickable Profile Card -> Redirect to Edit Profile */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                handleNavClick('Edit Profile');
                setIsProfileOpen(false);
              }}
              title="Click to view & edit your profile"
              className={`flex items-center gap-2.5 p-2 rounded-xl transition-all cursor-pointer group ${
                isDarkMode
                  ? 'hover:bg-zinc-800/80 bg-zinc-800/30'
                  : 'hover:bg-slate-100 bg-slate-50/60'
              }`}
            >
              <UserAvatar
                src={currentUser?.avatar}
                name={currentUser?.name || userEmail}
                seed={currentUser?.name || userEmail}
                size={32}
                className="w-8 h-8 rounded-full shrink-0 ring-1 ring-emerald-500/30"
              />
              <div className="overflow-hidden flex-1 min-w-0">
                <div className="font-semibold text-xs truncate group-hover:text-emerald-500 transition-colors">
                  {currentUser?.name || userEmail?.split('@')[0] || 'User'}
                </div>
                <div className="text-[11px] truncate text-zinc-400">
                  {currentUser?.email || userEmail || 'user@example.com'}
                </div>
              </div>
              <div className="p-1 rounded-md text-zinc-400 group-hover:text-emerald-500 transition-colors shrink-0" title="Edit Profile">
                <Edit3 className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="h-px bg-slate-100 dark:bg-zinc-800/60" />

            {/* Edit Profile Menu Item */}
            <button
              type="button"
              onClick={() => {
                handleNavClick('Edit Profile');
                setIsProfileOpen(false);
              }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                isDarkMode ? 'hover:bg-zinc-800 text-zinc-300 hover:text-white' : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-emerald-500" />
                <span>Edit Profile</span>
              </div>
              <Edit3 className="w-3 h-3 opacity-60" />
            </button>

            {/* Settings */}
            <button
              type="button"
              onClick={() => {
                handleNavClick('Settings');
                setIsProfileOpen(false);
              }}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                isDarkMode ? 'hover:bg-zinc-800 text-zinc-300 hover:text-white' : 'hover:bg-slate-100 text-slate-700 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Settings className="w-3.5 h-3.5 opacity-70" />
                <span>Settings</span>
              </div>
              <Settings className="w-3.5 h-3.5 opacity-60" />
            </button>

            {onToggleTheme && (
              <AnimatedThemeToggler
                theme={isDarkMode ? "dark" : "light"}
                onThemeChange={() => onToggleTheme()}
                duration={1200}
                variant="circle"
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isDarkMode ? 'hover:bg-zinc-800 text-zinc-300' : 'hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isDarkMode ? <Moon className="w-3.5 h-3.5 text-amber-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
                  <span>Theme</span>
                </div>
                <div className={`w-7 h-4 rounded-full p-0.5 transition-colors flex items-center ${isDarkMode ? 'bg-emerald-500 justify-end' : 'bg-slate-300 justify-start'}`}>
                  <div className="w-3 h-3 rounded-full bg-white shadow-xs" />
                </div>
              </AnimatedThemeToggler>
            )}

            <button
              type="button"
              onClick={() => {
                handleNavClick('Logout');
                setIsProfileOpen(false);
              }}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
            >
              <span>Log Out</span>
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Bottom Profile Trigger Bar */}
        <button
          type="button"
          onClick={() => isCollapsed ? toggleCollapse() : setIsProfileOpen(!isProfileOpen)}
          title={currentUser?.name || 'Profile'}
          className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0 py-2' : 'justify-between px-3 py-2'} rounded-xl transition-colors text-left cursor-pointer ${
            isDarkMode
              ? 'hover:bg-zinc-900/60 text-white'
              : 'hover:bg-slate-100 text-slate-900'
          }`}
        >
          <div className="flex items-center gap-3">
            <UserAvatar
              src={currentUser?.avatar}
              name={currentUser?.name || userEmail}
              seed={currentUser?.name || userEmail}
              size={28}
              className="w-7 h-7 rounded-full shrink-0"
            />
            {!isCollapsed && (
              <span className={`font-medium text-xs sm:text-sm truncate ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>
                {currentUser?.name || userEmail?.split('@')[0] || 'User'}
              </span>
            )}
          </div>
          {!isCollapsed && (
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isDarkMode ? 'text-zinc-500' : 'text-slate-400'
              } ${isProfileOpen ? 'rotate-180' : ''}`}
            />
          )}
        </button>
      </div>
    </aside>
  );
}

export default HeroSidebar;
