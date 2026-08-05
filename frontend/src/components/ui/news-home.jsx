import { useState } from "react";
import {
  FaHeart,
  FaBookmark,
  FaRegBookmark,
  FaRegHeart,
  FaRegComment,
  FaSearch,
  FaBell,
  FaPen,
  FaSignOutAlt,
  FaShareAlt,
  FaTimes,
  FaCheck,
  FaUserPlus,
  FaUserCheck,
  FaFire,
  FaClock,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { MdArrowBack, MdVerified } from "react-icons/md";

// Mock news data (Substack / Medium text-focused articles)
const INITIAL_ARTICLES = [
  {
    id: 1,
    title: "The Architecture of Modern Web Applications in 2026",
    excerpt:
      "Why monolithic simplicity is returning, how edge compute changes state management, and what we learned after building platforms for millions of concurrent readers.",
    content: `Building web applications in 2026 has reached a fascinating inflection point. For the past decade, microservices and hyper-decoupled frontends were treated as the default architecture for every growing engineering team. However, as infrastructure costs rose and operational complexity exploded, the industry began asking a simple question: "Is this actually making us ship faster?"

### The Renaissance of the Unified Stack
What we're seeing today isn't a retreat to ancient patterns, but rather a hyper-optimized synthesis of monolithic developer experience combined with edge routing capabilities. Modern bundlers, server-driven UI primitives, and global key-value stores allow developers to maintain a single unified codebase while deploying globally in milliseconds.

### Core Architecture Shift
1. **Zero-Latency Data Fetching**: Moving query execution directly to edge workers closest to the end user.
2. **Component-Driven State**: Eliminating global store boilerplate in favor of scoped local state hooks.
3. **Resilient CSS Standards**: Tailwind v4 and native CSS nesting providing predictable, lightweight layouts without runtime costs.

### What Comes Next?
As AI tools assist in code generation, the bottleneck shifts from writing code to reading and validating software architecture. Clean, readable codebases with simple abstractions will dominate the next decade of web development.`,
    category: "Technology",
    author: "Elena Rostova",
    authorHandle: "@elena_tech",
    authorAvatar: "ER",
    publishedAt: "2 hours ago",
    readTime: "6 min read",
    claps: 1420,
    commentsCount: 38,
    isFeatured: true,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 2,
    title: "Why Minimalist UI Design Outperforms Heavy Visual Trends",
    excerpt:
      "In an era of cognitive overload, clarity is the ultimate luxury. How stripped-down typography and precise layout hierarchy drive 3x higher user engagement.",
    content: `When users land on a website, they don't want to decipher a visual maze. They seek immediate answers, seamless navigation, and frictionless readability.

### The Psychology of Visual Noise
Every border, gradient, and floating element consumes cognitive bandwidth. When designing digital products, reduction is often more powerful than addition. By focusing on typography, whitespace, and sharp contrast, you allow the content itself to shine.

### Three Rules for Cleaner Interfaces
- **Typography First**: Choose a font hierarchy that communicates hierarchy without requiring decorative dividers.
- **Controlled Palette**: Use neutral backgrounds (like deep dark #09090b) with a single vibrant accent color to guide user attention.
- **Purposeful Motion**: Micro-animations should confirm actions, not distract from reading.`,
    category: "Design & UX",
    author: "Marcus Chen",
    authorHandle: "@mchen_design",
    authorAvatar: "MC",
    publishedAt: "4 hours ago",
    readTime: "4 min read",
    claps: 890,
    commentsCount: 22,
    isFeatured: false,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 3,
    title: "Navigating the Next Cycle of Global Tech Markets",
    excerpt:
      "An in-depth analysis of capital flows, venture fund deployments, and why vertical software SaaS is experiencing a quiet revival.",
    content: `The tech funding market has settled into a new equilibrium. Venture capital is no longer chasing vanity growth metrics; instead, sustainable unit economics and proven profitability are leading every investment Memo.

### Key Takeaways for Founders
- Capital efficiency is now the primary metric of company health.
- Niche, domain-specific AI workflows are outperforming broad multi-purpose tools.
- Retention metrics matter far more than top-of-funnel user acquisition.`,
    category: "Finance & Markets",
    author: "Sarah Jenkins",
    authorHandle: "@s_jenkins_vc",
    authorAvatar: "SJ",
    publishedAt: "6 hours ago",
    readTime: "8 min read",
    claps: 2310,
    commentsCount: 54,
    isFeatured: false,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 4,
    title: "The Art of Writing Deep-Dive Technical Newsletters",
    excerpt:
      "Lessons from growing a tech publication to 100,000 paid subscribers without ad spending or clickbait headlines.",
    content: `Great writing creates its own distribution network. When you provide genuine value in every single issue, your readers become your primary marketing engine.

### Building Trust Through Consistency
The most successful newsletter authors focus on long-form, thoroughly researched essays rather than shallow daily recaps. Depth creates authority, authority creates trust, and trust converts readers into paying subscribers.`,
    category: "Publishing",
    author: "David Vance",
    authorHandle: "@vance_notes",
    authorAvatar: "DV",
    publishedAt: "10 hours ago",
    readTime: "5 min read",
    claps: 640,
    commentsCount: 17,
    isFeatured: false,
    isBookmarked: false,
    isLiked: false,
  },
  {
    id: 5,
    title: "AI Agents and the Transformation of Knowledge Work",
    excerpt:
      "Autonomous code agents are redefining productivity. Here is how leading engineering organizations are adapting their workflows.",
    content: `We are witnessing a shift from developer assistant tools to autonomous software agents that execute multi-step objectives independently.

### The New Developer Workflow
Rather than writing every line manually, developers are transitioning into system architects and code reviewers. The core skills of 2026 are precise problem definition, prompt architecture, and rigorous automated testing.`,
    category: "AI & Future",
    author: "Dr. Aris Thorne",
    authorHandle: "@athorne_ai",
    authorAvatar: "AT",
    publishedAt: "1 day ago",
    readTime: "7 min read",
    claps: 3100,
    commentsCount: 89,
    isFeatured: false,
    isBookmarked: false,
    isLiked: false,
  },
];

const CATEGORIES = [
  "For You",
  "Following",
  "Technology",
  "Design & UX",
  "Finance & Markets",
  "AI & Future",
  "Publishing",
];

const TOPIC_TAGS = [
  "#ArtificialIntelligence",
  "#WebArchitecture",
  "#FinTech",
  "#DesignSystems",
  "#Productivity",
  "#Startups",
  "#ReactJS",
];

const TOP_WRITERS = [
  { name: "Elena Rostova", handle: "@elena_tech", avatar: "ER", followers: "42.5k" },
  { name: "Marcus Chen", handle: "@mchen_design", avatar: "MC", followers: "28.1k" },
  { name: "Sarah Jenkins", handle: "@s_jenkins_vc", avatar: "SJ", followers: "56.9k" },
];

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export function NewsHome({ userEmail = "alex@company.io", onSignOut }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [articles, setArticles] = useState(INITIAL_ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState("For You");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null); // Active article modal/drawer
  const [followedWriters, setFollowedWriters] = useState({});
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [newsletterInput, setNewsletterInput] = useState("");

  // Like article handler
  const toggleLike = (id, e) => {
    if (e) e.stopPropagation();
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id === id) {
          const newIsLiked = !art.isLiked;
          return {
            ...art,
            isLiked: newIsLiked,
            claps: newIsLiked ? art.claps + 1 : art.claps - 1,
          };
        }
        return art;
      })
    );
    if (selectedArticle && selectedArticle.id === id) {
      setSelectedArticle((prev) => ({
        ...prev,
        isLiked: !prev.isLiked,
        claps: !prev.isLiked ? prev.claps + 1 : prev.claps - 1,
      }));
    }
  };

  // Bookmark article handler
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
  const toggleFollow = (handle) => {
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

  const featuredArticle = articles.find((art) => art.isFeatured) || articles[0];

  return (
    <div
      className={`min-h-screen w-full font-sans transition-colors duration-300 ${
        isDarkMode
          ? "bg-[#222831] text-[#eeeeee] selection:bg-[#2FA084] selection:text-white"
          : "bg-[#eeeeee] text-[#222831] selection:bg-[#2FA084] selection:text-white"
      }`}
    >
      {/* 1. Header Navigation */}
      <header
        className={`sticky top-0 z-40 w-full border-b transition-colors duration-300 backdrop-blur-md ${
          isDarkMode
            ? "border-[#393e46] bg-[#222831]/95 text-[#eeeeee]"
            : "border-[#393e46]/20 bg-white/95 text-[#222831] shadow-xs"
        }`}
      >
        <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo & Search */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl font-extrabold text-lg shadow-md bg-[#2FA084] text-white">
                N
              </div>
              <span
                className={`text-xl font-black tracking-wider uppercase select-none ${
                  isDarkMode ? "text-[#eeeeee]" : "text-[#222831]"
                }`}
              >
                OVERSTACK
              </span>
            </div>

            {/* Search Input */}
            <div className="relative hidden md:block w-64 lg:w-80">
              <FaSearch
                className={`absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 ${
                  isDarkMode ? "text-[#eeeeee]/60" : "text-[#393e46]/60"
                }`}
              />
              <input
                type="text"
                placeholder="Search articles, topics, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full rounded-full border py-2 pl-9 pr-4 text-xs transition-all focus:border-[#2FA084] focus:outline-none focus:ring-1 focus:ring-[#2FA084]/50 ${
                  isDarkMode
                    ? "bg-[#393e46] border-[#393e46] text-[#eeeeee] placeholder-[#eeeeee]/60"
                    : "bg-[#eeeeee] border-[#393e46]/20 text-[#222831] placeholder-[#393e46]/60"
                }`}
              />
            </div>
          </div>

          {/* Right Section Actions */}
          <div className="flex items-center gap-3">
            {/* Animated Magic UI Theme Toggler */}
            <AnimatedThemeToggler
              theme={isDarkMode ? "dark" : "light"}
              onThemeChange={(newTheme) => setIsDarkMode(newTheme === "dark")}
              duration={450}
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all cursor-pointer ${
                isDarkMode
                  ? "bg-[#393e46] border-[#393e46] text-[#2FA084] hover:bg-[#393e46]/80"
                  : "bg-[#eeeeee] border-[#393e46]/20 text-[#2FA084] hover:bg-[#eeeeee]/80"
              }`}
            />

            <button
              type="button"
              onClick={() => alert("Editor coming soon!")}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-white bg-[#2FA084] hover:bg-[#268068] shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <FaPen className="h-3 w-3" />
              <span className="hidden sm:inline">Write Story</span>
            </button>

            <button
              type="button"
              className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition-colors cursor-pointer ${
                isDarkMode
                  ? "bg-[#393e46] border-[#393e46] text-[#eeeeee] hover:text-[#2FA084]"
                  : "bg-[#eeeeee] border-[#393e46]/20 text-[#393e46] hover:text-[#2FA084]"
              }`}
              title="Notifications"
            >
              <FaBell className="h-3.5 w-3.5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#2FA084]" />
            </button>

            {/* User Profile Pill */}
            <div
              className={`flex items-center gap-3 pl-2 border-l ${
                isDarkMode ? "border-[#393e46]" : "border-[#393e46]/20"
              }`}
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold ${
                  isDarkMode
                    ? "bg-[#393e46] border-[#393e46] text-[#2FA084]"
                    : "bg-[#eeeeee] border-[#393e46]/20 text-[#2FA084]"
                }`}
              >
                {userEmail.substring(0, 2).toUpperCase()}
              </div>
              <button
                type="button"
                onClick={onSignOut}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                  isDarkMode
                    ? "bg-[#393e46] border-[#393e46] text-[#eeeeee] hover:bg-[#2FA084] hover:text-white"
                    : "bg-[#eeeeee] border-[#393e46]/20 text-[#393e46] hover:bg-[#2FA084] hover:text-white"
                }`}
                title="Sign Out"
              >
                <FaSignOutAlt className="h-3 w-3" />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Categories Bar */}
        <div
          className={`border-t ${
            isDarkMode ? "border-[#393e46] bg-[#222831]/80" : "border-[#393e46]/20 bg-[#eeeeee]/80"
          }`}
        >
          <div className="container mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto px-4 py-2 sm:px-6 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#2FA084] text-white font-bold shadow-md"
                    : isDarkMode
                    ? "bg-[#393e46] text-[#eeeeee] hover:bg-[#2FA084]/20 border border-[#393e46]"
                    : "bg-white text-[#393e46] hover:bg-[#2FA084]/10 border border-[#393e46]/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Mobile Search Bar */}
        <div className="mb-6 md:hidden">
          <div className="relative w-full">
            <FaSearch
              className={`absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 ${
                isDarkMode ? "text-zinc-400" : "text-slate-400"
              }`}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full rounded-full border py-2.5 pl-9 pr-4 text-xs focus:border-black focus:outline-none ${
                isDarkMode
                  ? "bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500"
                  : "bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-sm"
              }`}
            />
          </div>
        </div>

        {/* Hero Featured Article (Text-focused Substack style) */}
        {!searchQuery && selectedCategory === "For You" && featuredArticle && (
          <section
            onClick={() => setSelectedArticle(featuredArticle)}
            className={`mb-10 group relative w-full overflow-hidden rounded-3xl border p-6 md:p-10 transition-all duration-300 cursor-pointer ${
              isDarkMode
                ? "bg-[#393e46] border-[#393e46] hover:border-[#2FA084] shadow-2xl"
                : "bg-white border-[#393e46]/20 hover:border-[#2FA084] shadow-lg"
            }`}
          >
            <div className="absolute top-0 right-0 p-6 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
              <FaFire className="h-24 w-24 text-[#2FA084]" />
            </div>

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-bold border uppercase tracking-wider bg-[#2FA084]/20 text-[#2FA084] border-[#2FA084]/40">
                  Featured Story
                </span>
                <span
                  className={`text-xs flex items-center gap-1 ${
                    isDarkMode ? "text-[#eeeeee]/70" : "text-[#393e46]/70"
                  }`}
                >
                  <FaClock className="h-3 w-3" /> {featuredArticle.readTime}
                </span>
              </div>

              <h1
                className={`text-3xl font-extrabold tracking-tight md:text-5xl lg:text-6xl transition-colors leading-tight ${
                  isDarkMode
                    ? "text-[#eeeeee]"
                    : "text-[#222831]"
                }`}
              >
                {featuredArticle.title}
              </h1>

              <p
                className={`text-base md:text-xl leading-relaxed line-clamp-3 ${
                  isDarkMode ? "text-[#eeeeee]/90" : "text-[#393e46]"
                }`}
              >
                {featuredArticle.excerpt}
              </p>

              <div
                className={`flex flex-wrap items-center justify-between gap-4 pt-4 border-t ${
                  isDarkMode ? "border-[#222831]" : "border-[#393e46]/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold ${
                      isDarkMode
                        ? "bg-[#222831] border-[#222831] text-[#2FA084]"
                        : "bg-[#eeeeee] border-[#393e46]/20 text-[#2FA084]"
                    }`}
                  >
                    {featuredArticle.authorAvatar}
                  </div>
                  <div>
                    <div
                      className={`flex items-center gap-1 text-sm font-bold ${
                        isDarkMode ? "text-[#eeeeee]" : "text-[#222831]"
                      }`}
                    >
                      <span>{featuredArticle.author}</span>
                      <MdVerified className="h-4 w-4 text-[#2FA084]" />
                    </div>
                    <span
                      className={`text-xs ${
                        isDarkMode ? "text-[#eeeeee]/70" : "text-[#393e46]/70"
                      }`}
                    >
                      {featuredArticle.authorHandle} • {featuredArticle.publishedAt}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={(e) => toggleLike(featuredArticle.id, e)}
                    className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                      isDarkMode ? "text-[#eeeeee]/70 hover:text-[#2FA084]" : "text-[#393e46]/70 hover:text-[#2FA084]"
                    }`}
                  >
                    {featuredArticle.isLiked ? (
                      <FaHeart className="h-4 w-4 text-red-500" />
                    ) : (
                      <FaRegHeart className="h-4 w-4" />
                    )}
                    <span>{featuredArticle.claps}</span>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => toggleBookmark(featuredArticle.id, e)}
                    className={`transition-colors ${
                      isDarkMode ? "text-[#eeeeee]/70 hover:text-[#2FA084]" : "text-[#393e46]/70 hover:text-[#2FA084]"
                    }`}
                  >
                    {featuredArticle.isBookmarked ? (
                      <FaBookmark className="h-4 w-4 text-[#2FA084]" />
                    ) : (
                      <FaRegBookmark className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Content Layout: 2 Columns */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Main Feed */}
          <div className="lg:col-span-8 space-y-6">
            <div
              className={`flex items-center justify-between pb-2 border-b ${
                isDarkMode ? "border-zinc-800" : "border-slate-200"
              }`}
            >
              <h2
                className={`text-lg font-bold tracking-wide ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
              >
                {selectedCategory} Articles ({filteredArticles.length})
              </h2>
            </div>

            {filteredArticles.length === 0 ? (
              <div
                className={`rounded-2xl border p-12 text-center ${
                  isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-white border-slate-200 shadow-sm"
                }`}
              >
                <p className={isDarkMode ? "text-zinc-400 text-base" : "text-slate-500 text-base"}>
                  No articles found matching your criteria.
                </p>
              </div>
            ) : (
              filteredArticles.map((art) => (
                <article
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className={`group rounded-2xl border p-6 transition-all duration-200 cursor-pointer space-y-3 ${
                    isDarkMode
                      ? "bg-[#393e46] border-[#393e46] hover:border-[#2FA084] shadow-md hover:shadow-xl"
                      : "bg-white border-[#393e46]/20 shadow-md hover:shadow-xl hover:border-[#2FA084]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex items-center gap-2 text-xs ${
                        isDarkMode ? "text-[#eeeeee]/70" : "text-[#393e46]/70"
                      }`}
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold bg-[#2FA084] text-white">
                        {art.authorAvatar}
                      </div>
                      <span
                        className={`font-semibold ${
                          isDarkMode ? "text-[#eeeeee]" : "text-[#222831]"
                        }`}
                      >
                        {art.author}
                      </span>
                      <span>•</span>
                      <span>{art.publishedAt}</span>
                    </div>

                    <span
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold border ${
                        isDarkMode
                          ? "bg-[#222831] text-[#2FA084] border-[#222831]"
                          : "bg-[#eeeeee] text-[#2FA084] border-[#393e46]/20"
                      }`}
                    >
                      {art.category}
                    </span>
                  </div>

                  <h3
                    className={`text-xl md:text-2xl font-bold transition-colors group-hover:text-[#2FA084] leading-snug ${
                      isDarkMode
                        ? "text-[#eeeeee]"
                        : "text-[#222831]"
                    }`}
                  >
                    {art.title}
                  </h3>

                  <p
                    className={`text-sm leading-relaxed line-clamp-2 font-normal ${
                      isDarkMode ? "text-[#eeeeee]/80" : "text-[#393e46]"
                    }`}
                  >
                    {art.excerpt}
                  </p>

                  <div
                    className={`flex items-center justify-between pt-2 text-xs border-t ${
                      isDarkMode
                        ? "text-[#eeeeee]/70 border-[#222831]"
                        : "text-[#393e46]/70 border-[#393e46]/10"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <FaClock className="h-3 w-3" /> {art.readTime}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => toggleLike(art.id, e)}
                        className="flex items-center gap-1 hover:text-red-500 transition-colors"
                      >
                        {art.isLiked ? (
                          <FaHeart className="h-3.5 w-3.5 text-red-500" />
                        ) : (
                          <FaRegHeart className="h-3.5 w-3.5" />
                        )}
                        <span>{art.claps}</span>
                      </button>

                      <span className="flex items-center gap-1">
                        <FaRegComment className="h-3.5 w-3.5" />
                        <span>{art.commentsCount}</span>
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => toggleBookmark(art.id, e)}
                      className="transition-colors p-1 hover:text-[#2FA084]"
                    >
                      {art.isBookmarked ? (
                        <FaBookmark className="h-4 w-4 text-[#2FA084]" />
                      ) : (
                        <FaRegBookmark className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Right Sidebar Widgets */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Newsletter Subscription Box */}
            <div
              className={`rounded-3xl border p-6 shadow-xl space-y-4 ${
                isDarkMode
                  ? "bg-[#393e46] border-[#393e46]"
                  : "bg-white border-[#393e46]/20 shadow-xl"
              }`}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl font-bold bg-[#2FA084] text-white">
                ✉
              </div>
              <div>
                <h3
                  className={`text-lg font-bold ${
                    isDarkMode ? "text-[#eeeeee]" : "text-[#222831]"
                  }`}
                >
                  Daily Briefing Newsletter
                </h3>
                <p
                  className={`text-xs mt-1 leading-relaxed ${
                    isDarkMode ? "text-[#eeeeee]/70" : "text-[#393e46]"
                  }`}
                >
                  Get curations of top stories and deep tech essays delivered to your inbox every morning.
                </p>
              </div>

              {emailSubscribed ? (
                <div className={`flex items-center gap-2 rounded-xl border p-3 text-xs font-semibold ${
                  isDarkMode ? "bg-[#2FA084]/20 text-[#2FA084] border-[#2FA084]/40" : "bg-[#2FA084]/10 text-[#2FA084] border-[#2FA084]/30"
                }`}>
                  <FaCheck className="h-4 w-4" />
                  <span>Subscribed! Check your inbox for confirmation.</span>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterInput) setEmailSubscribed(true);
                  }}
                  className="space-y-2"
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={newsletterInput}
                    onChange={(e) => setNewsletterInput(e.target.value)}
                    required
                    className={`w-full rounded-xl border px-3.5 py-2.5 text-xs focus:border-[#2FA084] focus:outline-none ${
                      isDarkMode
                        ? "bg-[#222831] border-[#222831] text-[#eeeeee] placeholder-[#eeeeee]/60"
                        : "bg-[#eeeeee] border-[#393e46]/20 text-[#222831] placeholder-[#393e46]/60"
                    }`}
                  />
                  <button
                    type="submit"
                    className="w-full rounded-xl py-2.5 text-xs font-bold transition-all shadow-md cursor-pointer bg-[#2FA084] hover:bg-[#268068] text-white"
                  >
                    Subscribe Now
                  </button>
                </form>
              )}
            </div>

            {/* Top Writers / Publications to Follow */}
            <div
              className={`rounded-3xl border p-6 space-y-4 ${
                isDarkMode ? "bg-[#393e46] border-[#393e46]" : "bg-white border-[#393e46]/20 shadow-md"
              }`}
            >
              <h3
                className={`text-sm font-bold uppercase tracking-wider ${
                  isDarkMode ? "text-[#eeeeee]" : "text-[#222831]"
                }`}
              >
                Top Writers & Publications
              </h3>
              <div className="space-y-4">
                {TOP_WRITERS.map((writer) => {
                  const isFollowing = followedWriters[writer.handle];
                  return (
                    <div
                      key={writer.handle}
                      className="flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold bg-[#2FA084] text-white">
                          {writer.avatar}
                        </div>
                        <div>
                          <p
                            className={`text-xs font-bold ${
                              isDarkMode ? "text-[#eeeeee]" : "text-[#222831]"
                            }`}
                          >
                            {writer.name}
                          </p>
                          <p
                            className={`text-[11px] ${
                              isDarkMode ? "text-[#eeeeee]/70" : "text-[#393e46]/70"
                            }`}
                          >
                            {writer.followers} readers
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleFollow(writer.handle)}
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition-all cursor-pointer ${
                          isFollowing
                            ? isDarkMode
                              ? "bg-[#222831] text-[#eeeeee]"
                              : "bg-[#eeeeee] text-[#222831]"
                            : "bg-[#2FA084] text-white hover:bg-[#268068]"
                        }`}
                      >
                        {isFollowing ? (
                          <>
                            <FaUserCheck className="h-3 w-3" />
                            <span>Following</span>
                          </>
                        ) : (
                          <>
                            <FaUserPlus className="h-3 w-3" />
                            <span>Follow</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Trending Topic Pills */}
            <div
              className={`rounded-3xl border p-6 space-y-4 ${
                isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-white border-slate-200 shadow-md"
              }`}
            >
              <h3
                className={`text-sm font-bold uppercase tracking-wider ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Recommended Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {TOPIC_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag.replace("#", ""))}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                      isDarkMode
                        ? "bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white"
                        : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* 5. Article Reader Overlay Modal / Drawer */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md overflow-y-auto">
          <div
            className={`relative my-8 w-full max-w-3xl rounded-3xl border p-6 sm:p-10 shadow-2xl space-y-6 ${
              isDarkMode ? "bg-[#222831] border-[#393e46] text-[#eeeeee]" : "bg-white border-[#393e46]/20 text-[#393e46]"
            }`}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedArticle(null)}
              className={`absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border transition-colors cursor-pointer ${
                isDarkMode
                  ? "bg-[#393e46] border-[#393e46] text-[#eeeeee] hover:text-[#2FA084]"
                  : "bg-[#eeeeee] border-[#393e46]/20 text-[#393e46] hover:text-[#2FA084]"
              }`}
            >
              <FaTimes className="h-4 w-4" />
            </button>

            {/* Category & Read Time */}
            <div className="flex items-center gap-3">
              <span className="rounded-full px-3 py-1 text-xs font-bold border uppercase bg-[#2FA084]/20 text-[#2FA084] border-[#2FA084]/40">
                {selectedArticle.category}
              </span>
              <span
                className={`text-xs flex items-center gap-1 ${
                  isDarkMode ? "text-[#eeeeee]/70" : "text-[#393e46]/70"
                }`}
              >
                <FaClock className="h-3 w-3" /> {selectedArticle.readTime}
              </span>
            </div>

            {/* Title */}
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-black leading-tight ${
                isDarkMode ? "text-[#eeeeee]" : "text-[#222831]"
              }`}
            >
              {selectedArticle.title}
            </h1>

            {/* Author Meta Bar */}
            <div
              className={`flex items-center justify-between border-y py-4 ${
                isDarkMode ? "border-[#393e46]" : "border-[#393e46]/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border text-sm font-bold bg-[#2FA084] text-white">
                  {selectedArticle.authorAvatar}
                </div>
                <div>
                  <div
                    className={`flex items-center gap-1 text-sm font-bold ${
                      isDarkMode ? "text-[#eeeeee]" : "text-[#222831]"
                    }`}
                  >
                    <span>{selectedArticle.author}</span>
                    <MdVerified className="h-4 w-4 text-[#2FA084]" />
                  </div>
                  <span
                    className={`text-xs ${
                      isDarkMode ? "text-[#eeeeee]/70" : "text-[#393e46]/70"
                    }`}
                  >
                    {selectedArticle.authorHandle} • {selectedArticle.publishedAt}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleLike(selectedArticle.id)}
                  className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    isDarkMode
                      ? "bg-[#393e46] border-[#393e46] text-[#eeeeee] hover:text-red-400"
                      : "bg-[#eeeeee] border-[#393e46]/20 text-[#393e46] hover:text-red-500"
                  }`}
                >
                  {selectedArticle.isLiked ? (
                    <FaHeart className="h-4 w-4 text-red-500" />
                  ) : (
                    <FaRegHeart className="h-4 w-4" />
                  )}
                  <span>{selectedArticle.claps}</span>
                </button>

                <button
                  type="button"
                  onClick={() => toggleBookmark(selectedArticle.id)}
                  className={`rounded-full border p-2 transition-colors ${
                    isDarkMode
                      ? "bg-[#393e46] border-[#393e46] text-[#eeeeee] hover:text-[#2FA084]"
                      : "bg-[#eeeeee] border-[#393e46]/20 text-[#393e46] hover:text-[#2FA084]"
                  }`}
                >
                  {selectedArticle.isBookmarked ? (
                    <FaBookmark className="h-4 w-4 text-[#2FA084]" />
                  ) : (
                    <FaRegBookmark className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Article Content Paragraphs */}
            <div
              className={`space-y-4 text-base sm:text-lg leading-relaxed whitespace-pre-line font-normal ${
                isDarkMode ? "text-[#eeeeee]/90" : "text-[#393e46]"
              }`}
            >
              {selectedArticle.content}
            </div>

            {/* Footer Actions */}
            <div
              className={`pt-6 border-t flex items-center justify-between ${
                isDarkMode ? "border-[#393e46]" : "border-[#393e46]/10"
              }`}
            >
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-xs font-bold transition-colors cursor-pointer ${
                  isDarkMode
                    ? "bg-[#393e46] border-[#393e46] text-[#eeeeee] hover:text-[#2FA084]"
                    : "bg-[#eeeeee] border-[#393e46]/20 text-[#393e46] hover:text-[#2FA084]"
                }`}
              >
                <MdArrowBack className="h-4 w-4" />
                <span>Back to feed</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert("Link copied to clipboard!");
                }}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all cursor-pointer bg-[#2FA084] text-white hover:bg-[#268068]"
              >
                <FaShareAlt className="h-3.5 w-3.5" />
                <span>Share Article</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsHome;
