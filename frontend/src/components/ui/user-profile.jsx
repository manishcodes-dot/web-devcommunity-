import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Calendar,
  Edit3,
  FileText,
  ArrowLeft,
  Plus,
  Eye,
  Save,
  X,
  CheckCircle2,
  Trash2,
  Zap,
  Award,
  Code2,
  Sparkles,
  Flame,
} from 'lucide-react';
import { fetchArticlesApi, deleteArticleApi } from '@/services/articleService';
import { updateUserProfileApi } from '@/services/userService';
import { useAuth } from '@/context/AuthContext';

export function UserProfileView({ currentUser, userEmail, isDarkMode = false, onBackToFeed, initialEditing = false }) {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [userNotes, setUserNotes] = useState([]);
  const [loadingNotes, setLoadingNotes] = useState(true);
  const [isEditing, setIsEditing] = useState(initialEditing);

  // Edit form state
  const [editName, setEditName] = useState(currentUser?.name || userEmail?.split('@')[0] || '');
  const [editBio, setEditBio] = useState(currentUser?.bio || '');
  const [editAvatar, setEditAvatar] = useState(currentUser?.avatar || '');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (initialEditing) {
      setIsEditing(true);
    }
  }, [initialEditing]);

  useEffect(() => {
    if (currentUser) {
      setEditName(currentUser.name || userEmail?.split('@')[0] || '');
      setEditBio(currentUser.bio || '');
      setEditAvatar(currentUser.avatar || '');
    }
  }, [currentUser, userEmail]);

  const toggleEditing = () => {
    if (!isEditing) {
      setEditName(currentUser?.name || userEmail?.split('@')[0] || '');
      setEditBio(currentUser?.bio || '');
      setEditAvatar(currentUser?.avatar || '');
    }
    setIsEditing((prev) => !prev);
  };

  // Load user articles
  useEffect(() => {
    const loadMyNotes = async () => {
      setLoadingNotes(true);
      try {
        const response = await fetchArticlesApi({ myNotes: 'true' });
        const articles = response.data?.articles || response.articles || [];
        setUserNotes(articles);
      } catch (err) {
        console.error('Failed to load user notes:', err.message);
      } finally {
        setLoadingNotes(false);
      }
    };
    loadMyNotes();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!currentUser?.id && !currentUser?._id) return;
    const userId = currentUser.id || currentUser._id;
    setIsSaving(true);
    try {
      await updateUserProfileApi(userId, {
        name: editName,
        bio: editBio,
        avatar: editAvatar,
      });
      if (updateUser) {
        updateUser({
          name: editName,
          bio: editBio,
          avatar: editAvatar,
        });
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setIsEditing(false);
    } catch (err) {
      alert(err.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const displayedNotes = userNotes;

  const totalViews = userNotes.reduce((acc, curr) => acc + (curr.viewsCount || 0), 0);

  return (
    <div className={`p-6 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-200 ${
      isDarkMode ? 'text-zinc-200' : 'text-slate-800'
    }`}>
      {/* Top Breadcrumb & Action */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            User Profile & Workspace
          </h1>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            Manage your profile details, statistics, and published notes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/create')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Note</span>
          </button>

          {onBackToFeed && (
            <button
              onClick={onBackToFeed}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Feed</span>
            </button>
          )}
        </div>
      </div>

      {saveSuccess && (
        <div className="flex items-center gap-2 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profile updated successfully!</span>
        </div>
      )}

      {/* Main Profile Header Banner Card */}
      <div className={`relative rounded-3xl border overflow-hidden shadow-lg transition-all ${
        isDarkMode
          ? 'bg-[#141417] border-zinc-800'
          : 'bg-white border-slate-200'
      }`}>
        {/* Cover Gradient Banner */}
        <div className="h-32 sm:h-40 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 relative">
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Profile Details Container */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 -mt-16 sm:-mt-20">
          {/* Left Avatar & Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
            <div className="relative group">
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-white dark:border-[#141417] shadow-xl"
                />
              ) : (
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 flex items-center justify-center font-extrabold text-white text-3xl border-4 border-white dark:border-[#141417] shadow-xl">
                  {(currentUser?.name || userEmail || 'JG').substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-center sm:justify-start gap-2.5">
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {currentUser?.name || userEmail?.split('@')[0] || 'Junior Garcia'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-emerald-500/10 border border-emerald-500/30 text-emerald-500">
                  {currentUser?.role || 'Developer'}
                </span>
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/10 border border-amber-500/30 text-amber-500">
                  <Zap className="w-3 h-3" />
                  <span>1,420 Dev Karma</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{currentUser?.email || userEmail || 'junior@heroui.com'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Joined {currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString() : 'Recently'}</span>
                </div>
              </div>

              {currentUser?.bio && (
                <p className={`text-xs max-w-xl leading-relaxed pt-1 ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
                  {currentUser.bio}
                </p>
              )}
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={toggleEditing}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
              isEditing
                ? 'bg-red-500/10 border-red-500/30 text-red-500 hover:bg-red-500/20'
                : isDarkMode
                ? 'bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isEditing ? <X className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
            <span>{isEditing ? 'Cancel Editing' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Edit Profile Collapsible Form */}
        {isEditing && (
          <div className={`p-6 border-t animate-in fade-in duration-150 ${
            isDarkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <form onSubmit={handleUpdateProfile} className="space-y-4 max-w-2xl">
              <h3 className={`text-sm font-bold uppercase tracking-wider text-emerald-500`}>
                Edit Account Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">Full Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className={`w-full h-10 px-3.5 rounded-xl text-xs font-medium border outline-none ${
                      isDarkMode
                        ? 'bg-zinc-900 border-zinc-700 text-white focus:border-emerald-500'
                        : 'bg-white border-slate-300 text-slate-900 focus:border-emerald-500'
                    }`}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-400">Avatar Image URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={editAvatar}
                    onChange={(e) => setEditAvatar(e.target.value)}
                    className={`w-full h-10 px-3.5 rounded-xl text-xs font-medium border outline-none ${
                      isDarkMode
                        ? 'bg-zinc-900 border-zinc-700 text-white focus:border-emerald-500'
                        : 'bg-white border-slate-300 text-slate-900 focus:border-emerald-500'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400">Bio / About You</label>
                <textarea
                  rows={2}
                  placeholder="Share a short summary about your background, projects, or interests..."
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  className={`w-full p-3 rounded-xl text-xs font-medium border outline-none resize-none ${
                    isDarkMode
                      ? 'bg-zinc-900 border-zinc-700 text-white focus:border-emerald-500'
                      : 'bg-white border-slate-300 text-slate-900 focus:border-emerald-500'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={isSaving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-sm active:scale-95 transition-all cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving Changes...' : 'Save Profile Changes'}</span>
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Account Statistics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className={`p-5 rounded-2xl border transition-all ${
          isDarkMode ? 'bg-[#141417] border-zinc-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Notes</span>
            <FileText className="w-4 h-4 text-emerald-500" />
          </div>
          <div className={`text-2xl font-extrabold mt-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {userNotes.length}
          </div>
        </div>

        <div className={`p-5 rounded-2xl border transition-all ${
          isDarkMode ? 'bg-[#141417] border-zinc-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">Articles Published</span>
            <FileText className="w-4 h-4 text-emerald-500" />
          </div>
          <div className={`text-2xl font-extrabold mt-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {userNotes.length}
          </div>
        </div>

        <div className={`p-5 rounded-2xl border transition-all ${
          isDarkMode ? 'bg-[#141417] border-zinc-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Dev Reputation</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className={`text-2xl font-extrabold mt-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            1,420
          </div>
        </div>

        <div className={`p-5 rounded-2xl border transition-all ${
          isDarkMode ? 'bg-[#141417] border-zinc-800' : 'bg-white border-slate-200 shadow-xs'
        }`}>
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-500">Total Views</span>
            <Eye className="w-4 h-4 text-cyan-500" />
          </div>
          <div className={`text-2xl font-extrabold mt-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {totalViews}
          </div>
        </div>
      </div>

      {/* Developer Badges & Tech Stack Specialties */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Developer Badges */}
        <div
          className={`p-5 rounded-3xl border space-y-3.5 ${
            isDarkMode
              ? 'bg-[#141417] border-zinc-800'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider">
                Developer Badges & Creds
              </h3>
            </div>
            <span className="text-[11px] font-mono text-zinc-400">4 Unlocked</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              {
                icon: <Code2 className="w-4 h-4 text-emerald-500" />,
                title: 'Core Contributor',
                desc: 'Top 5% author in Dev Feed',
                bg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
              },
              {
                icon: <Flame className="w-4 h-4 text-orange-500" />,
                title: '7-Day Streak',
                desc: 'Consistent daily commits',
                bg: 'bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400',
              },
              {
                icon: <Sparkles className="w-4 h-4 text-purple-500" />,
                title: 'Unicorn Creator',
                desc: 'Earned 50+ unicorns on posts',
                bg: 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400',
              },
              {
                icon: <Zap className="w-4 h-4 text-blue-500" />,
                title: 'OSS Pioneer',
                desc: 'Created #showdev project',
                bg: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
              },
            ].map((badge) => (
              <div
                key={badge.title}
                className={`p-2.5 rounded-2xl border flex items-start gap-2.5 ${badge.bg}`}
              >
                <div className="p-1 rounded-xl bg-white/60 dark:bg-zinc-900/60 shrink-0">
                  {badge.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold leading-tight truncate">{badge.title}</p>
                  <p className="text-[10px] opacity-80 leading-tight mt-0.5">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Tech Stack & Skills */}
        <div
          className={`p-5 rounded-3xl border space-y-3.5 ${
            isDarkMode
              ? 'bg-[#141417] border-zinc-800'
              : 'bg-white border-slate-200 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-500" />
              <h3 className="text-xs font-bold uppercase tracking-wider">
                Tech Stack & Specialties
              </h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-500 font-bold">Full-Stack Engineer</span>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {[
              { name: 'React 19', color: 'bg-cyan-500/10 text-cyan-500 border-cyan-500/30' },
              { name: 'TypeScript', color: 'bg-blue-500/10 text-blue-500 border-blue-500/30' },
              { name: 'Node.js', color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30' },
              { name: 'Next.js', color: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/30' },
              { name: 'MongoDB', color: 'bg-green-500/10 text-green-500 border-green-500/30' },
              { name: 'TailwindCSS', color: 'bg-teal-500/10 text-teal-500 border-teal-500/30' },
              { name: 'Docker & Podman', color: 'bg-sky-500/10 text-sky-500 border-sky-500/30' },
              { name: 'Python & LLMs', color: 'bg-amber-500/10 text-amber-500 border-amber-500/30' },
              { name: 'GraphQL', color: 'bg-pink-500/10 text-pink-500 border-pink-500/30' },
            ].map((skill) => (
              <span
                key={skill.name}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-semibold border ${skill.color} hover:scale-105 transition-transform cursor-default`}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* User Notes Workspace Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-zinc-800">
          <div className="flex items-center gap-2">
            <h3 className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              My Published Notes & Articles
            </h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-zinc-800 text-zinc-300">
              {displayedNotes.length}
            </span>
          </div>

          {/* Filter Tabs */}
          <div className={`flex rounded-xl p-1 text-xs font-semibold ${
            isDarkMode ? 'bg-[#141417] border border-zinc-800' : 'bg-slate-100 border border-slate-200'
          }`}>
            <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 text-white shadow-xs">
              All Published Notes ({userNotes.length})
            </span>
          </div>
        </div>

        {/* Notes Grid */}
        {loadingNotes ? (
          <div className="p-8 text-center text-xs font-semibold text-emerald-500">
            Loading notes from database...
          </div>
        ) : displayedNotes.length === 0 ? (
          <div className={`p-12 text-center rounded-3xl border border-dashed space-y-3 ${
            isDarkMode ? 'bg-[#141417]/50 border-zinc-800 text-zinc-400' : 'bg-slate-50 border-slate-300 text-slate-500'
          }`}>
            <FileText className="w-8 h-8 mx-auto text-zinc-500" />
            <p className="text-sm font-bold">No notes found in this view</p>
            <p className="text-xs">Create your first note to start building your workspace.</p>
            <button
              onClick={() => navigate('/create')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Note</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedNotes.map((note) => (
              <div
                key={note._id || note.id}
                className={`p-5 rounded-2xl border transition-all hover:shadow-md space-y-3 ${
                  isDarkMode
                    ? 'bg-[#141417] border-zinc-800 hover:border-zinc-700'
                    : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold border bg-emerald-500/10 border-emerald-500/30 text-emerald-500">
                    <FileText className="w-3 h-3" />
                    <span>Published</span>
                  </span>

                  <span className="text-[11px] font-medium text-zinc-500">
                    {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'Recent'}
                  </span>
                </div>

                <div>
                  <h4 className={`text-base font-bold line-clamp-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {note.title}
                  </h4>
                  <p className={`text-xs line-clamp-2 mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                    {note.summary || note.content}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-zinc-800/80 text-[11px] text-zinc-500">
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{note.viewsCount || 0} views</span>
                  </div>

                  <button
                    type="button"
                    onClick={async (e) => {
                      e.stopPropagation();
                      const noteId = note._id || note.id;
                      if (window.confirm(`Are you sure you want to delete "${note.title}"?`)) {
                        try {
                          await deleteArticleApi(noteId);
                          setUserNotes((prev) => prev.filter((n) => (n._id || n.id) !== noteId));
                        } catch (err) {
                          console.error('Failed to delete note:', err);
                          alert(err.message || 'Failed to delete note from database.');
                        }
                      }
                    }}
                    className="p-1 rounded-lg text-zinc-500 hover:text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                    title="Delete Note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfileView;
