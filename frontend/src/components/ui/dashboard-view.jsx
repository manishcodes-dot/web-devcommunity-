import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Eye,
  Heart,
  MessageSquare,
  Plus,
  Compass,
  Settings,
  Sparkles,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import { fetchArticlesApi } from '@/services/articleService';

export function DashboardView({ currentUser, userEmail, isDarkMode = false, onNavigateSection }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalNotes: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
  });
  const [recentNotes, setRecentNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const displayName = currentUser?.name || userEmail?.split('@')[0] || 'Creator';

  useEffect(() => {
    let isMounted = true;
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const response = await fetchArticlesApi({ myNotes: 'true' });
        const notes = response.data?.articles || response.articles || [];
        if (isMounted) {
          const totalViews = notes.reduce((acc, curr) => acc + (curr.viewsCount || 0), 0);
          const totalLikes = notes.reduce(
            (acc, curr) => acc + (curr.likesCount ?? curr.likes?.length ?? 0),
            0
          );
          const totalComments = notes.reduce((acc, curr) => acc + (curr.commentsCount || 0), 0);
          setStats({
            totalNotes: notes.length,
            totalViews,
            totalLikes,
            totalComments,
          });
          setRecentNotes(notes.slice(0, 5));
        }
      } catch (err) {
        console.error('Failed to load dashboard metrics:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadDashboardData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-8 animate-in fade-in duration-200">
      {/* Dashboard Top Welcome Banner */}
      <div
        className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 border transition-all ${
          isDarkMode
            ? 'bg-gradient-to-r from-zinc-900 via-[#18181b] to-zinc-900 border-zinc-800'
            : 'bg-gradient-to-r from-emerald-50 via-white to-slate-50 border-slate-200/80 shadow-xs'
        }`}
      >
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Workspace Dashboard</span>
            </div>
            <h1
              className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Welcome back, {displayName}
            </h1>
            <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'} max-w-xl`}>
              Track your article analytics, manage your notes, and stay connected with community
              engagement across your workspace.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => navigate('/create')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Write Note</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateSection && onNavigateSection('Settings')}
              className={`p-3 rounded-2xl border transition-colors cursor-pointer ${
                isDarkMode
                  ? 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800/80'
                  : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white shadow-2xs'
              }`}
              title="Workspace Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Notes Written */}
        <div
          className={`rounded-2xl border p-5 space-y-3 transition-colors ${
            isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-slate-200/80 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-semibold ${
                isDarkMode ? 'text-zinc-400' : 'text-slate-500'
              }`}
            >
              Total Notes
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3
              className={`text-2xl sm:text-3xl font-black ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              {loading ? '...' : stats.totalNotes}
            </h3>
            <p className={`text-[11px] ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
              Published to Community
            </p>
          </div>
        </div>

        {/* Metric 2: Views Count */}
        <div
          className={`rounded-2xl border p-5 space-y-3 transition-colors ${
            isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-slate-200/80 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-semibold ${
                isDarkMode ? 'text-zinc-400' : 'text-slate-500'
              }`}
            >
              Total Reads
            </span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3
              className={`text-2xl sm:text-3xl font-black ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              {loading ? '...' : stats.totalViews}
            </h3>
            <p className={`text-[11px] ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
              Community pageviews
            </p>
          </div>
        </div>

        {/* Metric 3: Likes Received */}
        <div
          className={`rounded-2xl border p-5 space-y-3 transition-colors ${
            isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-slate-200/80 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-semibold ${
                isDarkMode ? 'text-zinc-400' : 'text-slate-500'
              }`}
            >
              Likes Received
            </span>
            <div className="p-2 rounded-xl bg-red-500/10 text-red-500">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3
              className={`text-2xl sm:text-3xl font-black ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              {loading ? '...' : stats.totalLikes}
            </h3>
            <p className={`text-[11px] ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
              Reader appreciations
            </p>
          </div>
        </div>

        {/* Metric 4: Comments Received */}
        <div
          className={`rounded-2xl border p-5 space-y-3 transition-colors ${
            isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-slate-200/80 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`text-xs font-semibold ${
                isDarkMode ? 'text-zinc-400' : 'text-slate-500'
              }`}
            >
              Discussions
            </span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-1">
            <h3
              className={`text-2xl sm:text-3xl font-black ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              {loading ? '...' : stats.totalComments}
            </h3>
            <p className={`text-[11px] ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
              Active responses
            </p>
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          type="button"
          onClick={() => onNavigateSection && onNavigateSection('Home')}
          className={`text-left rounded-2xl border p-5 space-y-2 transition-all cursor-pointer group hover:scale-[1.01] ${
            isDarkMode
              ? 'bg-[#18181b] border-zinc-800 hover:border-emerald-500/50'
              : 'bg-white border-slate-200/80 hover:border-emerald-500/50 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500">
              <TrendingUp className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Live News Feed
          </h4>
          <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            Explore the latest community articles, discussions, and updates.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigateSection && onNavigateSection('My Notes')}
          className={`text-left rounded-2xl border p-5 space-y-2 transition-all cursor-pointer group hover:scale-[1.01] ${
            isDarkMode
              ? 'bg-[#18181b] border-zinc-800 hover:border-emerald-500/50'
              : 'bg-white border-slate-200/80 hover:border-emerald-500/50 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
              <FileText className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            My Notes Library
          </h4>
          <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            View and manage your personal notes, drafts, and published content.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onNavigateSection && onNavigateSection('Bookmarks')}
          className={`text-left rounded-2xl border p-5 space-y-2 transition-all cursor-pointer group hover:scale-[1.01] ${
            isDarkMode
              ? 'bg-[#18181b] border-zinc-800 hover:border-emerald-500/50'
              : 'bg-white border-slate-200/80 hover:border-emerald-500/50 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500">
              <Compass className="w-4 h-4" />
            </div>
            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
          </div>
          <h4 className={`font-bold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Saved Bookmarks
          </h4>
          <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            Quickly jump back to stories and tutorials you have bookmarked.
          </p>
        </button>
      </div>

      {/* Recent Notes Section */}
      <div
        className={`rounded-3xl border p-6 space-y-4 ${
          isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-slate-200/80 shadow-xs'
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Recent Notes & Articles
            </h3>
            <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
              Your most recently created notes in this workspace.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateSection && onNavigateSection('My Notes')}
            className="text-xs font-bold text-emerald-500 hover:underline cursor-pointer"
          >
            View all ({stats.totalNotes})
          </button>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-slate-400">Loading notes...</div>
        ) : recentNotes.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
              You haven't published any notes yet.
            </p>
            <button
              type="button"
              onClick={() => navigate('/create')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create your first note</span>
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-zinc-800">
            {recentNotes.map((note) => (
              <div
                key={note._id || note.id}
                onClick={() => onNavigateSection && onNavigateSection('My Notes')}
                className="py-3.5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/50 dark:hover:bg-zinc-900/40 rounded-xl px-2 transition-colors"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border bg-emerald-500/10 border-emerald-500/30 text-emerald-500">
                      <FileText className="w-2.5 h-2.5" />
                      Published
                    </span>
                    <span
                      className={`text-xs font-semibold truncate ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}
                    >
                      {note.title}
                    </span>
                  </div>
                  <p
                    className={`text-[11px] truncate ${
                      isDarkMode ? 'text-zinc-400' : 'text-slate-500'
                    }`}
                  >
                    {note.summary || note.excerpt || 'No description'}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs shrink-0 text-slate-400">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{note.viewsCount || 0}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-red-500" />
                    <span>{note.likesCount || 0}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardView;
