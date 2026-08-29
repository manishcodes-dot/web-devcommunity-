import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaBookmark,
  FaRegBookmark,
  FaPen,
  FaUserPlus,
  FaUserCheck,
  FaSignOutAlt,
  FaArrowLeft,
  FaEllipsisH,
  FaUser,
  FaBan,
  FaFlag,
  FaPlus,
  FaLock,
  FaGlobe,
  FaTrash,
} from "react-icons/fa";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import PromptBar from "@/components/ui/prompt-bar";
import AiChatBot from "@/components/ui/ai-chat-bot";
import { fetchArticlesApi, deleteArticleApi } from "@/services/articleService";

/**
 * INITIAL_ARTICLES
 * Sample feed articles dataset with rich text content, categories, author profiles, and metrics.
 */
const INITIAL_ARTICLES = [];

const CATEGORIES = [
  "For You",
  "General",
  "Design System",
  "Market Pulse",
  "AI & Data",
  "Frontend",
];

export function NewsHome({
  userEmail = "admin@company.io",
  currentUser,
  myNotesOnly = false,
  onSignOut,
  hideSidebar = false,
  isDarkMode: controlledIsDarkMode,
  externalCreateOpen,
  onCloseExternalCreate,
  customNotes = [],
}) {
  const navigate = useNavigate();
  const [articles, setArticles] = useState(INITIAL_ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState("For You");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [internalIsDarkMode, setInternalIsDarkMode] = useState(false);
  const isDarkMode =
    controlledIsDarkMode !== undefined ? controlledIsDarkMode : internalIsDarkMode;
  const setIsDarkMode = (val) =>
    setInternalIsDarkMode(typeof val === "function" ? val(isDarkMode) : val);
  const [followedWriters, setFollowedWriters] = useState({});
  const [openMenuId, setOpenMenuId] = useState(null);

  // Close article options menu popover on click outside
  useEffect(() => {
    if (openMenuId === null) return;
    const handleClickOutside = () => {
      setOpenMenuId(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  // Fetch real articles from backend MongoDB database
  useEffect(() => {
    const loadBackendArticles = async () => {
      try {
        const params = myNotesOnly ? { myNotes: 'true' } : {};
        const response = await fetchArticlesApi(params);
        const apiArticles = response.data?.articles || response.articles || [];
        const formatted = apiArticles.map((art) => ({
          id: art._id,
          title: art.title,
          excerpt: art.summary || art.content?.substring(0, 150) || '',
          content: art.content,
          category: art.category?.name || 'General',
          isPrivate: Boolean(art.isPrivate),
          author: art.author?.name || 'Community Writer',
          authorEmail: art.author?.email || '',
          authorId: art.author?._id || art.author?.id || art.author,
          authorAvatar: art.author?.avatar || '',
          publishedAt: art.createdAt ? new Date(art.createdAt).toLocaleDateString() : 'Recently',
          claps: art.viewsCount || 0,
          commentsCount: 0,
          isLiked: false,
          isBookmarked: false,
        }));
        setArticles(formatted);
      } catch (err) {
        console.error('Failed to fetch articles from database:', err.message);
      }
    };
    loadBackendArticles();
  }, [myNotesOnly]);

  // Article creation state
  const [internalIsCreateOpen, setInternalIsCreateOpen] = useState(false);
  const isCreateOpen = externalCreateOpen !== undefined ? externalCreateOpen : internalIsCreateOpen;
  const setIsCreateOpen = (val) => {
    setInternalIsCreateOpen(val);
    if (onCloseExternalCreate && !val) onCloseExternalCreate();
  };
  const [newTitle, setNewTitle] = useState("");
  const [newExcerpt, setNewExcerpt] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("Architecture");
  const [newCoverImage, setNewCoverImage] = useState("");
  const [newIsPrivate, setNewIsPrivate] = useState(false);

  const handleCreateArticle = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const createdArt = {
      id: String(Date.now()),
      title: newTitle,
      excerpt: newExcerpt || newTitle,
      content: newContent || newExcerpt || newTitle,
      category: newCategory,
      isPrivate: newIsPrivate,
      author: userEmail.split("@")[0] || "Junior Garcia",
      authorEmail: userEmail,
      authorHandle: `@${(userEmail.split("@")[0] || "junior").toLowerCase()}`,
      authorAvatar: (userEmail.substring(0, 2) || "JG").toUpperCase(),
      publishedAt: "Just now",
      claps: 0,
      commentsCount: 0,
      isLiked: false,
      isBookmarked: false,
      coverImage: newCoverImage.trim() || "",
    };

    setArticles([createdArt, ...articles]);
    setIsCreateOpen(false);
    setNewTitle("");
    setNewExcerpt("");
    setNewContent("");
    setNewCoverImage("");
    setNewIsPrivate(false);
  };

  // Clap / Like handler
  const toggleLike = (id, e) => {
    if (e) e.stopPropagation();
    setArticles((prev) =>
      prev.map((art) =>
        art.id === id
          ? {
              ...art,
              claps: art.isLiked ? art.claps - 1 : art.claps + 1,
              isLiked: !art.isLiked,
            }
          : art
      )
    );
    if (selectedArticle && selectedArticle.id === id) {
      setSelectedArticle((prev) => ({
        ...prev,
        claps: prev.isLiked ? prev.claps - 1 : prev.claps + 1,
        isLiked: !prev.isLiked,
      }));
    }
  };

  // Bookmark handler
  const toggleBookmark = (id, e) => {
    if (e) e.stopPropagation();
    setArticles((prev) =>
      prev.map((art) =>
        art.id === id ? { ...art, isBookmarked: !art.isBookmarked } : art
      )
    );
    if (selectedArticle && selectedArticle.id === id) {
      setSelectedArticle((prev) => ({
        ...prev,
        isBookmarked: !prev.isBookmarked,
      }));
    }
  };

  // Follow writer handler
  const toggleFollow = (handle, e) => {
    if (e) e.stopPropagation();
    setFollowedWriters((prev) => ({
      ...prev,
      [handle]: !prev[handle],
    }));
  };

  // Deduplicate articles between customNotes and backend articles by title/id
  const articleTitles = new Set(articles.map((a) => a.title?.trim().toLowerCase()));
  const uniqueCustomNotes = customNotes.filter(
    (cn) => !articleTitles.has(cn.title?.trim().toLowerCase())
  );
  const allArticles = [...articles, ...uniqueCustomNotes];

  // Filter articles based on Search query & Public/Private visibility rules
  const filteredArticles = allArticles.filter((art) => {
    // 1. Visibility Check: If private, only show to the author who wrote it
    if (art.isPrivate) {
      const currentUserName = (userEmail.split("@")[0] || "junior").toLowerCase();
      const isAuthorByEmail =
        art.authorEmail &&
        art.authorEmail.toLowerCase() === userEmail.toLowerCase();
      const isAuthorByName =
        art.author && art.author.toLowerCase() === currentUserName;

      if (!isAuthorByEmail && !isAuthorByName) {
        return false;
      }
    }

    // 2. Search query filter
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      art.title?.toLowerCase().includes(query) ||
      art.excerpt?.toLowerCase().includes(query) ||
      art.author?.toLowerCase().includes(query)
    );
  });

  return (
    <div
      className={`min-h-screen w-full font-sans transition-colors duration-300 flex flex-col md:flex-row ${
        isDarkMode
          ? "bg-[#222831] text-[#eeeeee] selection:bg-[#2FA084] selection:text-white"
          : "bg-[#eeeeee] text-[#222831] selection:bg-[#2FA084] selection:text-white"
      }`}
    >
      {/* 1. Optional Standalone Left Sidebar (Only rendered if hideSidebar is false) */}
      {!hideSidebar && (
        <aside
          className={`w-full md:w-64 md:h-screen md:fixed md:top-0 md:left-0 shrink-0 border-r flex flex-col justify-between p-4 z-40 transition-colors duration-300 ${
            isDarkMode
              ? "border-zinc-800/80 bg-[#1c222a] text-zinc-300"
              : "border-slate-200/80 bg-white text-slate-700 shadow-xs"
          }`}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between md:justify-start gap-3 cursor-pointer py-1">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl font-extrabold text-lg shadow-sm bg-emerald-500 text-white">
                  H
                </div>
                <span
                  className={`text-xl font-bold tracking-tight ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  HeroUI Labs
                </span>
              </div>

              <div className="md:hidden">
                <AnimatedThemeToggler
                  theme={isDarkMode ? "dark" : "light"}
                  onThemeChange={(newTheme) => setIsDarkMode(newTheme === "dark")}
                  duration={450}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-zinc-800"
                />
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <p
                className={`text-[11px] font-bold uppercase tracking-wider px-3 pb-1 ${
                  isDarkMode ? "text-zinc-500" : "text-slate-400"
                }`}
              >
                Categories
              </p>
              <div className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible scrollbar-none pb-2 md:pb-0">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left rounded-xl px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-emerald-500 text-white font-bold shadow-xs"
                        : isDarkMode
                        ? "text-zinc-400 hover:text-white hover:bg-zinc-900"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/60 dark:border-zinc-800/60 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold ${
                    isDarkMode
                      ? "bg-zinc-800 border-zinc-700 text-emerald-400"
                      : "bg-slate-100 border-slate-200 text-emerald-600"
                  }`}
                >
                  {userEmail.substring(0, 2).toUpperCase()}
                </div>
                <span
                  className={`text-xs font-bold truncate max-w-[100px] ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {userEmail.split("@")[0]}
                </span>
              </div>

              <button
                type="button"
                onClick={onSignOut}
                className={`inline-flex items-center gap-1 rounded-xl border p-2 text-xs font-semibold transition-colors cursor-pointer ${
                  isDarkMode
                    ? "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-red-500/20 hover:text-red-400"
                    : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-red-50 hover:text-red-600"
                }`}
                title="Sign Out"
              >
                <FaSignOutAlt className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content Area */}
      <main
        className={`flex-1 ${
          hideSidebar ? "" : "md:ml-64"
        } px-4 py-6 sm:px-8 max-w-5xl mx-auto w-full`}
      >
        {selectedArticle ? (
          /* Dedicated Article Page View */
          <div className="w-full space-y-6 animate-in fade-in duration-200">
            {/* Navigation & Actions Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-zinc-800/60">
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isDarkMode
                    ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                    : "bg-slate-200/80 hover:bg-slate-300 text-slate-800"
                }`}
              >
                <FaArrowLeft className="h-3.5 w-3.5" />
                <span>Back to feed</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={(e) => toggleLike(selectedArticle.id, e)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-800 text-xs font-semibold hover:text-red-500 transition-colors cursor-pointer"
                >
                  {selectedArticle.isLiked ? (
                    <FaHeart className="h-3.5 w-3.5 text-red-500" />
                  ) : (
                    <FaRegHeart className="h-3.5 w-3.5" />
                  )}
                  <span>{selectedArticle.claps}</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => toggleBookmark(selectedArticle.id, e)}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    selectedArticle.isBookmarked
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                      : isDarkMode
                      ? "border-zinc-800 text-zinc-400 hover:text-white"
                      : "border-slate-200 text-slate-600 hover:text-slate-900"
                  }`}
                  title={selectedArticle.isBookmarked ? "Remove bookmark" : "Bookmark article"}
                >
                  {selectedArticle.isBookmarked ? (
                    <FaBookmark className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <FaRegBookmark className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Article Content Header & Body */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                {selectedArticle.authorAvatar && typeof selectedArticle.authorAvatar === 'string' && selectedArticle.authorAvatar.startsWith('http') ? (
                  <img
                    src={selectedArticle.authorAvatar}
                    alt={selectedArticle.author || 'Author'}
                    className="h-10 w-10 rounded-full object-cover shrink-0 border border-slate-200 dark:border-zinc-700"
                  />
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold bg-emerald-500 text-white shadow-sm">
                    {(selectedArticle.author || 'Author').substring(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-sm">{selectedArticle.author}</h4>
                  <p
                    className={`text-xs ${
                      isDarkMode ? "text-zinc-400" : "text-slate-500"
                    }`}
                  >
                    {selectedArticle.authorHandle} • {selectedArticle.publishedAt}
                  </p>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                {selectedArticle.title}
              </h1>

              {selectedArticle.coverImage && (
                <div className="w-full h-64 sm:h-96 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-zinc-800">
                  <img
                    src={selectedArticle.coverImage}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="pt-2 text-base sm:text-lg leading-relaxed whitespace-pre-line font-normal text-slate-700 dark:text-zinc-300">
                {selectedArticle.content}
              </div>
            </div>
          </div>
        ) : (
          /* Main Feed View */
          <>
            {/* Top Bar: Search Bar with Create New Note Button on its Right Side */}
            <div className="mb-8 flex flex-col sm:flex-row items-center gap-3 w-full">
              {/* Search Bar Container */}
              <div className="relative flex-1 w-full">
                <FaSearch
                  className={`absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 ${
                    isDarkMode ? "text-zinc-500" : "text-slate-400"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search articles, notes, topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full rounded-2xl border py-3 pl-10 pr-20 text-xs sm:text-sm font-medium transition-all focus:outline-none focus:border-emerald-500 shadow-xs ${
                    isDarkMode
                      ? "bg-[#141417] border-zinc-800 text-white placeholder-zinc-500 focus:bg-[#18181b]"
                      : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white"
                  }`}
                />
                <div className="absolute top-1/2 right-3 -translate-y-1/2 flex items-center gap-1">
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className={`text-xs p-1 rounded-full ${
                        isDarkMode ? "text-zinc-400 hover:text-white" : "text-slate-400 hover:text-slate-700"
                      }`}
                    >
                      ✕
                    </button>
                  )}
                  <kbd
                    className={`hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono rounded-md border ${
                      isDarkMode
                        ? "text-zinc-400 bg-zinc-800/80 border-zinc-700/60"
                        : "text-slate-500 bg-slate-100 border-slate-200"
                    }`}
                  >
                    Ctrl+K
                  </kbd>
                </div>
              </div>

              {/* Create New Note Button on Right Side of Search Bar */}
              <button
                type="button"
                onClick={() => navigate('/create')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
              >
                <FaPen className="h-3.5 w-3.5" />
                <span>Create New Note</span>
              </button>
            </div>

            {/* Article Feed Section */}
            <div className="w-full space-y-4">
              <div className="pb-2 flex items-center justify-between">
                <h2
                  className={`text-lg font-bold tracking-tight ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  Articles & Notes ({filteredArticles.length})
                </h2>
              </div>

              {filteredArticles.length === 0 ? (
                <div
                  className={`rounded-3xl border p-12 text-center space-y-4 ${
                    isDarkMode
                      ? "bg-[#18181b] border-zinc-800/80 text-zinc-400"
                      : "bg-white border-slate-200/80 text-slate-500 shadow-xs"
                  }`}
                >
                  <p className="text-sm font-medium">
                    No articles found. Be the first to create one!
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate('/create')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all cursor-pointer"
                  >
                    <FaPlus className="h-3.5 w-3.5" />
                    <span>Create Your First Note</span>
                  </button>
                </div>
              ) : (
                filteredArticles.map((art) => (
                  <article
                    key={art.id}
                    onClick={() => setSelectedArticle(art)}
                    className={`rounded-3xl border p-6 space-y-4 cursor-pointer ${
                      isDarkMode
                        ? "bg-[#18181b] border-zinc-800/80 text-zinc-200 shadow-md"
                        : "bg-white border-slate-200/80 text-slate-800 shadow-xs"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 sm:gap-6">
                      {/* Left Column: Author, Title & Excerpt */}
                      <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex items-center gap-2.5 text-xs">
                          {art.authorAvatar && typeof art.authorAvatar === 'string' && art.authorAvatar.startsWith('http') ? (
                            <img
                              src={art.authorAvatar}
                              alt={art.author || 'Author'}
                              className="h-7 w-7 rounded-full object-cover shrink-0 border border-slate-200 dark:border-zinc-700"
                            />
                          ) : (
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-bold bg-emerald-500 text-white shadow-xs">
                              {(art.author || 'Author').substring(0, 2).toUpperCase()}
                            </div>
                          )}
                          <span
                            className={`font-semibold ${
                              isDarkMode ? "text-zinc-200" : "text-slate-800"
                            }`}
                          >
                            {art.author}
                          </span>
                          <span className={isDarkMode ? "text-zinc-600" : "text-slate-300"}>
                            •
                          </span>
                          <span className={isDarkMode ? "text-zinc-400" : "text-slate-500"}>
                            {art.publishedAt}
                          </span>
                          <span className={isDarkMode ? "text-zinc-600" : "text-slate-300"}>
                            •
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                              art.isPrivate
                                ? "bg-amber-500/10 border-amber-500/30 text-amber-500"
                                : "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                            }`}
                          >
                            {art.isPrivate ? (
                              <>
                                <FaLock className="h-2.5 w-2.5" />
                                <span>Private</span>
                              </>
                            ) : (
                              <>
                                <FaGlobe className="h-2.5 w-2.5" />
                                <span>Public</span>
                              </>
                            )}
                          </span>
                        </div>

                        <h3
                          className={`text-xl md:text-2xl font-bold leading-snug tracking-tight ${
                            isDarkMode ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {art.title}
                        </h3>

                        <p
                          className={`text-sm leading-relaxed line-clamp-2 font-normal ${
                            isDarkMode ? "text-zinc-400" : "text-slate-600"
                          }`}
                        >
                          {art.excerpt}
                        </p>
                      </div>

                      {/* Right Column: User Post Image */}
                      {art.coverImage && (
                        <div className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900">
                          <img
                            src={art.coverImage}
                            alt={art.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>

                    {/* Bottom Row Actions */}
                    <div
                      className={`flex items-center justify-between pt-3 text-xs border-t ${
                        isDarkMode
                          ? "text-zinc-400 border-zinc-800/60"
                          : "text-slate-500 border-slate-100"
                      }`}
                    >
                      <div className="flex items-center gap-5">
                        <span className="flex items-center gap-1.5">
                          {art.isLiked ? (
                            <FaHeart className="h-3.5 w-3.5 text-red-500" />
                          ) : (
                            <FaRegHeart className="h-3.5 w-3.5" />
                          )}
                          <span>{art.claps}</span>
                        </span>

                        <span className="flex items-center gap-1.5">
                          <FaRegComment className="h-3.5 w-3.5" />
                          <span>{art.commentsCount}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={(e) => toggleBookmark(art.id, e)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            art.isBookmarked
                              ? "text-emerald-500"
                              : isDarkMode
                              ? "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                              : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                          }`}
                          title={art.isBookmarked ? "Remove bookmark" : "Bookmark article"}
                        >
                          {art.isBookmarked ? (
                            <FaBookmark className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <FaRegBookmark className="h-4 w-4" />
                          )}
                        </button>

                        {/* Three Dots Dropdown Menu */}
                        <div className="relative">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(openMenuId === art.id ? null : art.id);
                            }}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              openMenuId === art.id
                                ? isDarkMode
                                  ? "bg-zinc-800 text-white"
                                  : "bg-slate-200 text-slate-900"
                                : isDarkMode
                                ? "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800"
                                : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                            }`}
                            title="More options"
                          >
                            <FaEllipsisH className="h-4 w-4" />
                          </button>

                          {openMenuId === art.id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className={`absolute right-0 bottom-8 sm:bottom-auto sm:top-8 w-44 rounded-2xl border p-1.5 shadow-xl z-30 transition-all ${
                                isDarkMode
                                  ? "bg-[#18181b] border-zinc-800 text-zinc-200"
                                  : "bg-white border-slate-200 text-slate-800"
                              }`}
                            >
                              <button
                                type="button"
                                onClick={(e) => {
                                  toggleFollow(art.authorHandle, e);
                                  setOpenMenuId(null);
                                }}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-xs rounded-xl font-medium transition-colors cursor-pointer ${
                                  isDarkMode
                                    ? "hover:bg-zinc-800 text-zinc-200"
                                    : "hover:bg-slate-100 text-slate-700"
                                }`}
                              >
                                {followedWriters[art.authorHandle] ? (
                                  <>
                                    <FaUserCheck className="h-3.5 w-3.5 text-emerald-500" />
                                    <span>Following</span>
                                  </>
                                ) : (
                                  <>
                                    <FaUserPlus className="h-3.5 w-3.5 text-emerald-500" />
                                    <span>Follow User</span>
                                  </>
                                )}
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setOpenMenuId(null);
                                  alert(`Viewing profile of ${art.author}`);
                                }}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-xs rounded-xl font-medium transition-colors cursor-pointer ${
                                  isDarkMode
                                    ? "hover:bg-zinc-800 text-zinc-200"
                                    : "hover:bg-slate-100 text-slate-700"
                                }`}
                              >
                                <FaUser className="h-3.5 w-3.5 text-blue-500" />
                                <span>User Profile</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setOpenMenuId(null);
                                  alert(`Marked "${art.title}" as Not Interested`);
                                }}
                                className={`w-full flex items-center gap-2 px-3 py-2 text-xs rounded-xl font-medium transition-colors cursor-pointer ${
                                  isDarkMode
                                    ? "hover:bg-zinc-800 text-zinc-200"
                                    : "hover:bg-slate-100 text-slate-700"
                                }`}
                              >
                                <FaBan className="h-3.5 w-3.5 text-amber-500" />
                                <span>Not Interested</span>
                              </button>

                              <div className="my-1 border-t border-slate-200/60 dark:border-zinc-800/60" />

                              {Boolean(
                                currentUser && (
                                  (art.authorId && (art.authorId === currentUser._id || art.authorId === currentUser.id || String(art.authorId) === String(currentUser._id))) ||
                                  (art.authorEmail && currentUser.email && art.authorEmail.toLowerCase() === currentUser.email.toLowerCase()) ||
                                  (art.author && currentUser.name && art.author.trim().toLowerCase() === currentUser.name.trim().toLowerCase())
                                )
                              ) ? (
                                <button
                                  type="button"
                                  onClick={async (e) => {
                                    e.stopPropagation();
                                    setOpenMenuId(null);
                                    const targetId = art.id || art._id;
                                    if (window.confirm(`Are you sure you want to delete "${art.title}"?`)) {
                                      try {
                                        await deleteArticleApi(targetId);
                                      } catch (err) {
                                        console.error('Delete API error:', err);
                                      }

                                      setArticles((prev) => prev.filter((a) => a.id !== targetId && a._id !== targetId && a.title !== art.title));

                                      try {
                                        const saved = localStorage.getItem('news_custom_notes');
                                        if (saved) {
                                          const parsed = JSON.parse(saved);
                                          const filtered = parsed.filter((n) => n.id !== targetId && n._id !== targetId && n.title !== art.title);
                                          localStorage.setItem('news_custom_notes', JSON.stringify(filtered));
                                        }
                                      } catch (err) {
                                        console.error('Failed to clear custom notes:', err);
                                      }
                                    }
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-xl font-medium text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                                >
                                  <FaTrash className="h-3.5 w-3.5" />
                                  <span>Delete Article</span>
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenMenuId(null);
                                    alert(`Reported "${art.title}" to moderators`);
                                  }}
                                  className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-xl font-medium text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                                >
                                  <FaFlag className="h-3.5 w-3.5" />
                                  <span>Report</span>
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </>
        )}
      </main>

      {/* Create Article Modal Dialog */}
      {isCreateOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 cursor-pointer"
          onClick={() => setIsCreateOpen(false)}
        >
          <div
            className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border cursor-default space-y-5 ${
              isDarkMode
                ? "bg-[#18181b] border-zinc-800 text-white"
                : "bg-white border-slate-200 text-slate-900"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-zinc-800/60">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <FaPen className="h-4 w-4" />
                </div>
                <h3 className="text-lg font-bold">Create New Article</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateArticle} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. The Architecture of Modern Web Applications in 2026"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-xs focus:outline-none focus:border-emerald-500 ${
                    isDarkMode
                      ? "bg-zinc-900/90 border-zinc-800 text-white placeholder-zinc-500"
                      : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className={`w-full rounded-xl border px-3 py-2.5 text-xs focus:outline-none focus:border-emerald-500 ${
                      isDarkMode
                        ? "bg-zinc-900 border-zinc-800 text-white"
                        : "bg-slate-50 border-slate-200 text-slate-900"
                    }`}
                  >
                    {CATEGORIES.filter((c) => c !== "For You").map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                    Image URL (optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newCoverImage}
                    onChange={(e) => setNewCoverImage(e.target.value)}
                    className={`w-full rounded-xl border px-3.5 py-2.5 text-xs focus:outline-none focus:border-emerald-500 ${
                      isDarkMode
                        ? "bg-zinc-900/90 border-zinc-800 text-white placeholder-zinc-500"
                        : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                  Short Excerpt / Summary
                </label>
                <textarea
                  rows={2}
                  placeholder="A quick summary of what readers will learn..."
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  className={`w-full rounded-xl border p-3 text-xs focus:outline-none focus:border-emerald-500 ${
                    isDarkMode
                      ? "bg-zinc-900/90 border-zinc-800 text-white placeholder-zinc-500"
                      : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                  Full Story Content
                </label>
                <textarea
                  rows={4}
                  placeholder="Write your story content here..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className={`w-full rounded-xl border p-3 text-xs focus:outline-none focus:border-emerald-500 ${
                    isDarkMode
                      ? "bg-zinc-900/90 border-zinc-800 text-white placeholder-zinc-500"
                      : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400"
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                  Note Visibility
                </label>
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setNewIsPrivate(false)}
                    className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      !newIsPrivate
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-500 shadow-xs"
                        : isDarkMode
                        ? "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <FaGlobe className="h-3.5 w-3.5" />
                    <span>Public (Everyone)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewIsPrivate(true)}
                    className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      newIsPrivate
                        ? "bg-amber-500/10 border-amber-500 text-amber-500 shadow-xs"
                        : isDarkMode
                        ? "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                        : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <FaLock className="h-3.5 w-3.5" />
                    <span>Private (Only Me)</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                    isDarkMode
                      ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating AI Chat Bot at the bottom */}
      <AiChatBot
        isDarkMode={isDarkMode}
        onCreateNoteClick={() => setIsCreateOpen(true)}
      />
    </div>
  );
}

export default NewsHome;
