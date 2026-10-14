import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeroSidebar from './hero-sidebar';
import NewsHome from './news-home';
import UserProfileView from './user-profile';
import DashboardView from './dashboard-view';
import SettingsView from './settings-view';
import {
  DesignTokensView,
  ColorPaletteView,
  TypographyView,
  TeamView,
} from './spaces-views';
import {
  CodeSnippetsView,
  ShowDevView,
  DevDiscussionsView,
} from './dev-community-views';
import { FollowingView } from './following-view';

export function ClientHome({
  userEmail,
  currentUser,
  onSignOut,
  customNotes = [],
  isDarkMode: controlledIsDarkMode,
  onToggleTheme: controlledOnToggleTheme,
}) {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('Home');
  const [internalIsDarkMode, setInternalIsDarkMode] = useState(false);
  const [feedResetKey, setFeedResetKey] = useState(0);

  const isDarkMode = controlledIsDarkMode !== undefined ? controlledIsDarkMode : internalIsDarkMode;
  const handleToggleTheme = () => {
    if (controlledOnToggleTheme) {
      controlledOnToggleTheme();
    } else {
      setInternalIsDarkMode(!internalIsDarkMode);
    }
  };

  return (
    <div
      className={`flex h-screen w-full overflow-hidden font-sans transition-colors duration-200 ${
        isDarkMode ? 'bg-[#222831] text-[#eeeeee]' : 'bg-[#eeeeee] text-[#222831]'
      }`}
    >
      {/* Hero Sidebar on the Left */}
      <HeroSidebar
        activeItem={activeSection}
        currentUser={currentUser}
        userEmail={userEmail}
        isDarkMode={isDarkMode}
        onToggleTheme={handleToggleTheme}
        onSelect={(item) => {
          if (item === 'Logout') {
            if (onSignOut) onSignOut();
          } else if (item === 'CreateArticle' || item === 'Write') {
            navigate('/create');
          } else {
            setFeedResetKey((prev) => prev + 1);
            setActiveSection(item);
          }
        }}
      />

      {/* Client Home Workspace on the Right */}
      <div
        className={`flex-1 h-screen overflow-y-auto transition-colors duration-200 ${
          isDarkMode ? 'bg-[#222831] text-[#eeeeee]' : 'bg-[#eeeeee] text-[#222831]'
        }`}
      >
        {activeSection === 'Home' ? (
          <div className="h-full">
            <NewsHome
              key={`home-${feedResetKey}`}
              userEmail={userEmail}
              currentUser={currentUser}
              onSignOut={onSignOut}
              hideSidebar={true}
              isDarkMode={isDarkMode}
              onToggleTheme={handleToggleTheme}
              customNotes={customNotes}
            />
          </div>
        ) : activeSection === 'Saved Post' || activeSection === 'Saved Posts' || activeSection === 'Bookmarks' || activeSection === 'Library' ? (
          <div className="h-full">
            <NewsHome
              key={`saved-${feedResetKey}`}
              userEmail={userEmail}
              currentUser={currentUser}
              bookmarksOnly={true}
              onSignOut={onSignOut}
              hideSidebar={true}
              isDarkMode={isDarkMode}
              onToggleTheme={handleToggleTheme}
              customNotes={customNotes}
            />
          </div>
        ) : activeSection === 'My Notes' || activeSection === 'Stories' ? (
          <div className="h-full">
            <NewsHome
              key={`stories-${feedResetKey}`}
              userEmail={userEmail}
              currentUser={currentUser}
              myNotesOnly={true}
              onSignOut={onSignOut}
              hideSidebar={true}
              isDarkMode={isDarkMode}
              onToggleTheme={handleToggleTheme}
              customNotes={customNotes}
            />
          </div>
        ) : activeSection === 'Explore' ? (
          <div className="h-full">
            <NewsHome
              userEmail={userEmail}
              currentUser={currentUser}
              exploreMode={true}
              onSignOut={onSignOut}
              hideSidebar={true}
              isDarkMode={isDarkMode}
              onToggleTheme={handleToggleTheme}
              customNotes={customNotes}
            />
          </div>
        ) : activeSection === 'Discussions' ? (
          <DevDiscussionsView isDarkMode={isDarkMode} />
        ) : activeSection === 'Code Snippets' ? (
          <CodeSnippetsView isDarkMode={isDarkMode} />
        ) : activeSection === '#showdev' ? (
          <ShowDevView isDarkMode={isDarkMode} />
        ) : (activeSection === 'Following' || activeSection === 'Following Feed' || activeSection === 'Discover Developers' || activeSection.startsWith('@')) ? (
          <FollowingView
            currentUser={currentUser}
            userEmail={userEmail}
            isDarkMode={isDarkMode}
            initialDevHandle={activeSection.startsWith('@') ? activeSection.replace(/^@/, '') : null}
          />
        ) : activeSection === 'Dashboard' || activeSection === 'Stats' ? (
          <DashboardView
            currentUser={currentUser}
            userEmail={userEmail}
            isDarkMode={isDarkMode}
            onNavigateSection={(sec) => setActiveSection(sec)}
          />
        ) : activeSection === 'Profile' || activeSection === 'Edit Profile' || activeSection === 'User Profile' ? (
          <UserProfileView
            currentUser={currentUser}
            userEmail={userEmail}
            isDarkMode={isDarkMode}
            onBackToFeed={() => setActiveSection('Home')}
            initialEditing={activeSection === 'Edit Profile'}
          />
        ) : activeSection === 'Settings' ? (
          <SettingsView
            currentUser={currentUser}
            userEmail={userEmail}
            isDarkMode={isDarkMode}
            onToggleTheme={handleToggleTheme}
            onSignOut={onSignOut}
          />
        ) : activeSection === 'Design Tokens' ? (
          <DesignTokensView isDarkMode={isDarkMode} />
        ) : activeSection === 'Color Palette' ? (
          <ColorPaletteView isDarkMode={isDarkMode} />
        ) : activeSection === 'Typography' ? (
          <TypographyView isDarkMode={isDarkMode} />
        ) : activeSection === 'Design team' || activeSection === 'Create Team' ? (
          <TeamView
            currentUser={currentUser}
            userEmail={userEmail}
            isDarkMode={isDarkMode}
          />
        ) : (
          <div className="p-8 max-w-6xl mx-auto space-y-6">
            <div
              className={`flex items-center justify-between border-b pb-4 ${
                isDarkMode ? 'border-zinc-800' : 'border-slate-200'
              }`}
            >
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {activeSection}
                </h1>
                <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                  Workspace Space
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveSection('Home')}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'bg-zinc-800 hover:bg-zinc-700 text-white'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                ← Back to Feed
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientHome
