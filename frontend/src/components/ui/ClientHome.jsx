import React, { useState } from 'react'
import HeroSidebar from './hero-sidebar'
import NewsHome from './news-home'

export function ClientHome({ userEmail, onSignOut }) {
  const [activeSection, setActiveSection] = useState('Home')
  const [isDarkMode, setIsDarkMode] = useState(false) // Light theme default for Client Home & Sidebar
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  return (
    <div className={`flex h-screen w-full overflow-hidden font-sans transition-colors duration-200 ${
      isDarkMode ? 'bg-[#09090b] text-zinc-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Hero Sidebar on the Left (Light theme default) */}
      <HeroSidebar
        activeItem={activeSection}
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onSelect={(item) => {
          if (item === 'Logout') {
            if (onSignOut) onSignOut()
          } else if (item === 'CreateArticle') {
            setIsCreateOpen(true)
          } else {
            setActiveSection(item)
          }
        }}
      />

      {/* Client Home Workspace on the Right */}
      <div className={`flex-1 h-screen overflow-y-auto transition-colors duration-200 ${
        isDarkMode ? 'bg-[#0c0c0e] text-zinc-100' : 'bg-[#f8fafc] text-slate-900'
      }`}>
        {activeSection === 'Home' || activeSection === 'Explore' || activeSection === 'Bookmarks' ? (
          <div className="h-full">
            <NewsHome
              userEmail={userEmail}
              onSignOut={onSignOut}
              hideSidebar={true}
              isDarkMode={isDarkMode}
              externalCreateOpen={isCreateOpen}
              onCloseExternalCreate={() => setIsCreateOpen(false)}
            />
          </div>
        ) : (
          <div className="p-8 max-w-6xl mx-auto space-y-6">
            <div className={`flex items-center justify-between border-b pb-4 ${
              isDarkMode ? 'border-zinc-800' : 'border-slate-200'
            }`}>
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activeSection}</h1>
                <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>Client Workspace & Space Settings</p>
              </div>
              <button
                onClick={() => setActiveSection('Home')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isDarkMode
                    ? 'bg-zinc-800 hover:bg-zinc-700 text-white'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                ← Back to Feed
              </button>
            </div>

            <div className={`p-6 rounded-2xl border ${
              isDarkMode
                ? 'bg-[#141417] border-zinc-800 text-zinc-300'
                : 'bg-white border-slate-200 text-slate-700 shadow-xs'
            }`}>
              <p className="text-sm">
                You are currently viewing <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{activeSection}</span> space in the Client Home Page.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ClientHome
