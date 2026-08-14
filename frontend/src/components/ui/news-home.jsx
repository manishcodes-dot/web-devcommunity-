import React, { useState } from "react";
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
} from "react-icons/fa";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import PromptBar from "@/components/ui/prompt-bar";
import AiChatBot from "@/components/ui/ai-chat-bot";

/**
 * INITIAL_ARTICLES
 * Sample feed articles dataset with rich text content, categories, author profiles, and metrics.
 */
const INITIAL_ARTICLES = [
  {
    title: "The Architecture of Modern Web Applications in 2026",
    excerpt:
      "Why monolithic simplicity is returning, how edge compute changes state management, and what we learned after building platforms for millions of concurrent readers.",
    content: `For a decade, frontend development was defined by extreme fragmentation. We broke apps into dozens of micro-frontends, split state across complex client caches, and treated server-rendering as an afterthought.

Now, in 2026, the pendulum has swung back toward elegant simplicity. Edge runtimes have made server-side rendering near-instantaneous. Frameworks have unified data fetching and component rendering into cohesive, type-safe paradigms.

In this deep dive, we explore the patterns that define high-scale publishing and web apps today:
1. Zero-bundle component boundaries
2. Streaming HTML with optimistic UI hydration
3. Local-first data caching with real-time sync engines

By focusing on these core primitives, development teams deliver 10x faster page loads while maintaining clean codebase ergonomics.`,
    category: "Architecture",
    author: "Elena Rostova",
    authorHandle: "@elena_tech",
    authorAvatar: "ER",
    publishedAt: "2 hours ago",
    readTime: "6 min read",
    claps: 1420,
    commentsCount: 38,
    isLiked: false,
    isBookmarked: false,
    isFeatured: true,
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Why Minimalist UI Design Outperforms Heavy Visual Trends",
    excerpt:
      "In an era of cognitive overload, clarity is the ultimate luxury. How stripped-down typography and precise layout hierarchy drive 3x higher user engagement.",
    content: `Visual noise is the enemy of user retention. When every element on a screen demands attention with bright badges, glowing borders, and competing animations, users experience cognitive fatigue.

Minimalism in digital design isn't about removing features—it's about intentional focus. By utilizing generous whitespace, consistent typographic scales, and functional color accents, modern interfaces guide the user's eye effortlessly.

Key principles of effective functional UI:
- Visual hierarchy driven by weight and scale rather than decorative containers
- Micro-interactions that provide clear feedback without interrupting flow
- Accessible contrast ratios that perform flawlessly across light and dark modes`,
    category: "Design System",
    author: "Marcus Chen",
    authorHandle: "@marcus_design",
    authorAvatar: "MC",
    publishedAt: "4 hours ago",
    readTime: "4 min read",
    claps: 890,
    commentsCount: 22,
    isLiked: false,
    isBookmarked: false,
    isFeatured: false,
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Navigating the Next Cycle of Global Tech Markets",
    excerpt:
      "An in-depth analysis of capital flows, venture fund deployments, and why vertical software SaaS is experiencing a quiet revival.",
    content: `After two years of market recalibration, tech investments have found a durable new baseline. Investors are no longer funding growth at all costs; instead, operational durability and net revenue retention have become the primary metrics of business health.

Vertical software platforms—custom-built for specific industries like healthcare, logistics, and energy—are capturing the highest valuations. By embedding payments, AI workflows, and compliance tooling directly into workflow software, these platforms create deep defensibility.`,
    category: "Market Pulse",
    author: "Sarah Jenkins",
    authorHandle: "@sarah_vc",
    authorAvatar: "SJ",
    publishedAt: "6 hours ago",
    readTime: "8 min read",
    claps: 2310,
    commentsCount: 94,
    isLiked: true,
    isBookmarked: true,
    isFeatured: false,
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    title: "Building Resilient AI Agents with Deterministic Safeguards",
    excerpt:
      "Large language models are non-deterministic by nature. Here is how production engineering teams wrap probabilistic outputs in reliable state machines.",
    content: `Autonomous AI agents hold immense promise for automating complex multi-step workflows. However, deploying them to production environments requires strict safety boundaries.

Without deterministic guardrails, agentic loops can hallucinate API calls or get stuck in infinite retries. In this article, we break down the architecture of stateful agent supervision:
- Schema validation at every tool call boundary
- Human-in-the-loop approval triggers for high-consequence actions
- Reversible execution logs with full step rollback capabilities`,
    category: "AI & Data",
    author: "Devon Vance",
    authorHandle: "@devon_ai",
    authorAvatar: "DV",
    publishedAt: "12 hours ago",
    readTime: "5 min read",
    claps: 1750,
    commentsCount: 45,
    isLiked: false,
    isBookmarked: false,
    isFeatured: false,
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    title: "The Developer's Guide to High-Performance CSS & Rendering Engines",
    excerpt:
      "Understanding browser compositing layers, sub-pixel grid alignment, and CSS containment for 60fps animations.",
    content: `Smooth 60fps animations elevate a good web app into a great user experience. But achieving consistent frame rates across low-end mobile devices and high-refresh desktop displays requires a deep understanding of browser rendering pipelines.

Learn how to leverage transform3d, opacity shifts, and layout containment flags to avoid triggering expensive layout recalculations during active user scroll.`,
    category: "Frontend",
    author: "Elena Rostova",
    authorHandle: "@elena_tech",
    authorAvatar: "ER",
    publishedAt: "1 day ago",
    readTime: "7 min read",
    claps: 1120,
    commentsCount: 19,
    isLiked: false,
    isBookmarked: false,
    isFeatured: false,
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  },
];

const CATEGORIES = [
  "For You",
  "Architecture",
  "Design System",
  "Market Pulse",
  "AI & Data",
  "Frontend",
];

export function NewsHome({
  userEmail = "admin@company.io",
  onSignOut,
  hideSidebar = false,
  isDarkMode: controlledIsDarkMode,
  externalCreateOpen,
  onCloseExternalCreate,
}) {
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

  const handleCreateArticle = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const createdArt = {
      id: String(Date.now()),
      title: newTitle,
      excerpt: newExcerpt || newTitle,
      content: newContent || newExcerpt || newTitle,
      category: newCategory,
      author: userEmail.split("@")[0] || "Junior Garcia",
      authorHandle: `@${(userEmail.split("@")[0] || "junior").toLowerCase()}`,
      authorAvatar: (userEmail.substring(0, 2) || "JG").toUpperCase(),
      publishedAt: "Just now",
      claps: 0,
      commentsCount: 0,
      isLiked: false,
      isBookmarked: false,
      coverImage:
        newCoverImage ||
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    };

    setArticles([createdArt, ...articles]);
    setIsCreateOpen(false);
    setNewTitle("");
    setNewExcerpt("");
    setNewContent("");
    setNewCoverImage("");
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

  // Filter articles based on Category and Search
  const filteredArticles = articles.filter((art) => {
    const matchesCategory =
      selectedCategory === "For You" ||
      selectedCategory === "Following" ||
      art.category === selectedCategory;

    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className={`min-h-screen w-full font-sans transition-colors duration-300 flex flex-col md:flex-row ${
        isDarkMode
          ? "bg-[#09090b] text-zinc-100 selection:bg-emerald-500 selection:text-white"
          : "bg-[#f8fafc] text-slate-900 selection:bg-emerald-500 selection:text-white"
      }`}
    >
      {/* 1. Optional Standalone Left Sidebar (Only rendered if hideSidebar is false) */}
      {!hideSidebar && (
        <aside
          className={`w-full md:w-64 md:h-screen md:fixed md:top-0 md:left-0 shrink-0 border-r flex flex-col justify-between p-4 z-40 transition-colors duration-300 ${
            isDarkMode
              ? "border-zinc-800/80 bg-[#09090b] text-zinc-300"
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
                <div className="flex h-10 w-10 items-center justify-center rounded-full font-bold bg-emerald-500 text-white shadow-sm">
                  {selectedArticle.authorAvatar}
                </div>
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
                onClick={() => setIsCreateOpen(true)}
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
                  {selectedCategory} Articles ({filteredArticles.length})
                </h2>
              </div>

              {filteredArticles.length === 0 ? (
                <div
                  className={`rounded-3xl border p-12 text-center ${
                    isDarkMode
                      ? "bg-[#18181b] border-zinc-800/80 text-zinc-400"
                      : "bg-white border-slate-200/80 text-slate-500 shadow-xs"
                  }`}
                >
                  <p className="text-sm font-medium">
                    No articles found matching your criteria.
                  </p>
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
                          <div className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold bg-emerald-500 text-white shadow-xs">
                            {art.authorAvatar}
                          </div>
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

                              <button
                                type="button"
                                onClick={() => {
                                  setOpenMenuId(null);
                                  alert(`Reported "${art.title}" to moderators`);
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs rounded-xl font-medium text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                              >
                                <FaFlag className="h-3.5 w-3.5" />
                                <span>Report</span>
                              </button>
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
