import { useState } from 'react';
import {
  Settings,
  Moon,
  Sun,
  Bell,
  Key,
  Trash2,
  LogOut,
  Copy,
  Check,
  Shield,
  Sliders,
} from 'lucide-react';

export function SettingsView({
  currentUser,
  userEmail,
  isDarkMode = false,
  onToggleTheme,
  onSignOut,
}) {
  const [emailDigest, setEmailDigest] = useState(true);
  const [inAppAlerts, setInAppAlerts] = useState(true);
  const [copiedToken, setCopiedToken] = useState(false);
  const [showToken, setShowToken] = useState(false);
  const [cacheCleared, setCacheCleared] = useState(false);

  const token = localStorage.getItem('token') || 'No active session token';



  const handleCopyToken = () => {
    navigator.clipboard.writeText(token);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleClearCache = () => {
    if (window.confirm('Clear local offline notes and bookmarks cache?')) {
      localStorage.removeItem('news_custom_notes');
      localStorage.removeItem('news_portal_bookmarks');
      setCacheCleared(true);
      setTimeout(() => setCacheCleared(false), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-8 animate-in fade-in duration-200">
      {/* Settings Header */}
      <div className="space-y-1 pb-4 border-b border-slate-200/80 dark:border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
            <Settings className="w-5 h-5" />
          </div>
          <h1
            className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            Workspace Settings
          </h1>
        </div>
        <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
          Manage your publishing preferences, notification controls, and session configuration.
        </p>
      </div>

      {/* Section 1: Publishing Preferences */}
      <div
        className={`rounded-3xl border p-6 space-y-5 ${
          isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-slate-200/80 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-emerald-500" />
          <h2 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Publishing Defaults
          </h2>
        </div>



          <div className="pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <h4 className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-slate-800'}`}>
                Interface Theme
              </h4>
              <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                Switch between high-contrast dark mode and crisp daylight theme.
              </p>
            </div>
            <button
              type="button"
              onClick={onToggleTheme}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                isDarkMode
                  ? 'border-zinc-700 bg-zinc-800/80 text-zinc-200 hover:text-white'
                  : 'border-slate-200 bg-slate-50 text-slate-700 hover:text-slate-900 shadow-2xs'
              }`}
            >
              {isDarkMode ? <Moon className="w-3.5 h-3.5 text-amber-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
              <span>{isDarkMode ? 'Dark Theme' : 'Light Theme'}</span>
            </button>
          </div>
        </div>

      {/* Section 2: Notifications */}
      <div
        className={`rounded-3xl border p-6 space-y-5 ${
          isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-slate-200/80 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-emerald-500" />
          <h2 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Notifications & Alerts
          </h2>
        </div>

        <div className="space-y-4 divide-y divide-slate-100 dark:divide-zinc-800/80">
          <div className="flex items-center justify-between gap-4 pt-1">
            <div className="space-y-0.5">
              <h4 className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-slate-800'}`}>
                Community Reaction Alerts
              </h4>
              <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                Notify me in the app when readers like or respond to my articles.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setInAppAlerts(!inAppAlerts)}
              className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer flex items-center ${
                inAppAlerts ? 'bg-emerald-500 justify-end' : 'bg-slate-300 dark:bg-zinc-700 justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 pt-4">
            <div className="space-y-0.5">
              <h4 className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-slate-800'}`}>
                Weekly Reading Digest
              </h4>
              <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                Send trending articles summary to {currentUser?.email || userEmail || 'your email'}.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setEmailDigest(!emailDigest)}
              className={`w-11 h-6 rounded-full transition-colors p-0.5 cursor-pointer flex items-center ${
                emailDigest ? 'bg-emerald-500 justify-end' : 'bg-slate-300 dark:bg-zinc-700 justify-start'
              }`}
            >
              <div className="w-5 h-5 rounded-full bg-white shadow-xs" />
            </button>
          </div>
        </div>
      </div>

      {/* Section 3: API & Security Credentials */}
      <div
        className={`rounded-3xl border p-6 space-y-5 ${
          isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-slate-200/80 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-2">
          <Key className="w-4 h-4 text-emerald-500" />
          <h2 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            API & Session Credentials
          </h2>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className={`text-xs font-semibold ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
              Active JWT Bearer Token
            </label>
            <div className="flex items-center gap-2">
              <input
                type={showToken ? 'text' : 'password'}
                readOnly
                value={token}
                className={`flex-1 rounded-xl border px-3 py-2 text-xs font-mono transition-all outline-none ${
                  isDarkMode
                    ? 'bg-zinc-900 border-zinc-800 text-zinc-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowToken(!showToken)}
                className="px-3 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                {showToken ? 'Hide' : 'Reveal'}
              </button>
              <button
                type="button"
                onClick={handleCopyToken}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors cursor-pointer shadow-xs"
              >
                {copiedToken ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedToken ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Data & Account Danger Zone */}
      <div
        className={`rounded-3xl border p-6 space-y-4 border-red-500/20 ${
          isDarkMode ? 'bg-red-950/10' : 'bg-red-50/40'
        }`}
      >
        <div className="flex items-center gap-2 text-red-500">
          <Shield className="w-4 h-4" />
          <h2 className="font-bold text-base">Account & Storage Management</h2>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <div className="space-y-0.5">
            <h4 className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-slate-800'}`}>
              Reset Local Storage Cache
            </h4>
            <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
              Clear cached offline bookmarks, drafts, and UI preferences.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClearCache}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{cacheCleared ? 'Cache Cleared!' : 'Clear Cache'}</span>
          </button>
        </div>

        <div className="pt-4 border-t border-red-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h4 className={`text-sm font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-slate-800'}`}>
              Sign Out of Session
            </h4>
            <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
              Log out of your current account on this device.
            </p>
          </div>
          <button
            type="button"
            onClick={onSignOut}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer shadow-xs active:scale-95"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsView;
