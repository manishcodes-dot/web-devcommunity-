import { useState, useEffect } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaBookmark,
  FaRegBookmark,
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
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaExclamationTriangle,
  FaSpinner,
  FaQuoteLeft,
  FaEye,
  FaThLarge,
} from "react-icons/fa";
import { MdVerified, MdArrowBack } from "react-icons/md";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

// Mock Categories
const CATEGORIES = [
  "All",
  "Technology",
  "AI",
  "Programming",
  "Design",
  "Business",
  "Lifestyle",
  "Travel",
  "Education",
  "Health",
  "Science",
];

// Mock Articles Data
const INITIAL_ARTICLES = [
  {
    id: 1,
    title: "The Architecture of Modern Web Applications in 2026",
    excerpt:
      "Why monolithic simplicity is returning, how edge compute changes state management, and what we learned after building platforms for millions of readers.",
    content: `Building web applications in 2026 has reached a fascinating inflection point. For the past decade, microservices and hyper-decoupled frontends were treated as the default architecture for every growing engineering team. However, as infrastructure costs rose and operational complexity exploded, the industry began asking a simple question: "Is this actually making us ship faster?"

### The Renaissance of the Unified Stack
What we're seeing today isn't a retreat to ancient patterns, but rather a hyper-optimized synthesis of monolithic developer experience combined with edge routing capabilities. Modern bundlers, server-driven UI primitives, and global key-value stores allow developers to maintain a single unified codebase while deploying globally in milliseconds.

### Core Architecture Shift
1. **Zero-Latency Data Fetching**: Moving query execution directly to edge workers closest to the end user.
2. **Component-Driven State**: Eliminating global store boilerplate in favor of scoped local state hooks.
3. **Resilient CSS Standards**: Native CSS nesting and zero-runtime style systems providing predictable, lightweight layouts without performance bottlenecks.

### What Comes Next?
As AI tools assist in code generation, the bottleneck shifts from writing code to reading and validating software architecture. Clean, readable codebases with simple abstractions will dominate the next decade of web development.`,
    category: "Technology",
    author: "Elena Rostova",
    authorHandle: "@elena_tech",
    authorAvatar: "ER",
    authorRole: "Principal Systems Engineer",
    coverImage:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2 hours ago",
    readTime: "6 min read",
    claps: 1420,
    commentsCount: 38,
    isFeatured: true,
    isBookmarked: false,
    isLiked: false,
    tags: ["WebDev", "Architecture", "EdgeCompute"],
  },
  {
    id: 2,
    title: "Why Minimalist UI Design Outperforms Heavy Visual Trends",
    excerpt:
      "In an era of cognitive overload, clarity is the ultimate luxury. How stripped-down typography and precise layout hierarchy drive 3x higher user engagement.",
    content: `When users land on a digital application, they don't want to decipher a visual maze. They seek immediate answers, seamless navigation, and frictionless readability.

### The Psychology of Visual Noise
Every unnecessary border, heavy shadow, and floating decorative element consumes cognitive bandwidth. When designing digital products, reduction is often far more powerful than addition. By focusing on typography, whitespace, and sharp contrast, you allow the content itself to shine.

### Three Golden Rules for Cleaner Interfaces
- **Typography First**: Choose a font hierarchy that communicates structural depth without requiring visual dividers.
- **Controlled Color System**: Use a refined primary tone with subtle secondary accents to guide user attention purposefully.
- **Purposeful Motion**: Micro-animations should confirm user actions, not distract from reading.`,
    category: "Design",
    author: "Marcus Chen",
    authorHandle: "@mchen_design",
    authorAvatar: "MC",
    authorRole: "Lead Design Strategist",
    coverImage:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "4 hours ago",
    readTime: "4 min read",
    claps: 890,
    commentsCount: 22,
    isFeatured: false,
    isBookmarked: false,
    isLiked: false,
    tags: ["UX", "DesignSystems", "Productivity"],
  },
  {
    id: 3,
    title: "Navigating the Next Cycle of Global Tech Markets",
    excerpt:
      "An in-depth analysis of capital flows, venture fund deployments, and why vertical software SaaS is experiencing a quiet revival.",
    content: `The tech funding market has settled into a healthy new equilibrium. Venture capital is no longer chasing vanity top-line growth metrics; instead, sustainable unit economics and proven capital efficiency lead every investment memorandum.

### Key Takeaways for Founders
- **Capital Efficiency Above All**: Burn multiple and runway duration are now primary indicators of company health.
- **Vertical Specialization**: Niche, domain-specific AI workflows are outperforming broad multi-purpose SaaS tools.
- **Retention Driven Growth**: Net dollar retention matters far more than aggressive top-of-funnel customer acquisition.`,
    category: "Business",
    author: "Sarah Jenkins",
    authorHandle: "@s_jenkins_vc",
    authorAvatar: "SJ",
    authorRole: "Venture Partner",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "6 hours ago",
    readTime: "8 min read",
    claps: 2310,
    commentsCount: 54,
    isFeatured: false,
    isBookmarked: false,
    isLiked: false,
    tags: ["Finance", "SaaS", "Startups"],
  },
  {
    id: 4,
    title: "Understanding Large Language Model Reasoning & Distillation",
    excerpt:
      "How small, specialized models trained via chain-of-thought distillation match 10x larger base models on reasoning tasks.",
    content: `Machine learning research over the past year has shown that model size is not the only vector for performance. By distilling domain knowledge and chain-of-thought traces into compact architectures, developers can achieve fast inference speeds at a fraction of the cost.`,
    category: "AI",
    author: "Dr. Aris Thorne",
    authorHandle: "@aris_ai",
    authorAvatar: "AT",
    authorRole: "AI Researcher",
    coverImage:
      "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "1 day ago",
    readTime: "7 min read",
    claps: 3120,
    commentsCount: 89,
    isFeatured: false,
    isBookmarked: false,
    isLiked: false,
    tags: ["AI", "MachineLearning", "LLMs"],
  },
  {
    id: 5,
    title: "Mastering Async Concurrency Patterns in Rust and Go",
    excerpt:
      "A head-to-head comparison of memory management, channel primitives, futures execution, and thread safety benchmarks.",
    content: `Concurrency bugs are among the hardest software defects to diagnose in distributed systems. Both Rust and Go offer strong concurrency primitives, but approach safety and developer ergonomics from fundamentally different angles.`,
    category: "Programming",
    author: "David Vance",
    authorHandle: "@dvance_dev",
    authorAvatar: "DV",
    authorRole: "Staff Backend Engineer",
    coverImage:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2 days ago",
    readTime: "10 min read",
    claps: 1750,
    commentsCount: 45,
    isFeatured: false,
    isBookmarked: false,
    isLiked: false,
    tags: ["Rust", "GoLang", "Concurrency"],
  },
  {
    id: 6,
    title: "The Solitary Hiker’s Guide to High-Altitude Mindset",
    excerpt:
      "Lessons learned from spending 30 days traversing remote Alpine trails alone, and how solitudeSharpens creative focus.",
    content: `Stepping away from constant notifications and digital noise opens up vast mental space. Out on the trail, survival and pace dictate the rhythm of your thoughts.`,
    category: "Travel",
    author: "Claire DeWitt",
    authorHandle: "@claire_alpine",
    authorAvatar: "CD",
    authorRole: "Exploration Writer",
    coverImage:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "3 days ago",
    readTime: "5 min read",
    claps: 1240,
    commentsCount: 19,
    isFeatured: false,
    isBookmarked: false,
    isLiked: false,
    tags: ["Travel", "Mindfulness", "Adventure"],
  },
];

// Mock Top Writers
const POPULAR_WRITERS = [
  {
    name: "Elena Rostova",
    handle: "@elena_tech",
    avatar: "ER",
    role: "Principal Systems Engineer",
    followers: "42.5k",
    articlesCount: 64,
  },
  {
    name: "Marcus Chen",
    handle: "@mchen_design",
    avatar: "MC",
    role: "Lead Design Strategist",
    followers: "28.1k",
    articlesCount: 41,
  },
  {
    name: "Sarah Jenkins",
    handle: "@s_jenkins_vc",
    avatar: "SJ",
    role: "Venture Partner @ Foundry",
    followers: "56.9k",
    articlesCount: 89,
  },
  {
    name: "Dr. Aris Thorne",
    handle: "@aris_ai",
    avatar: "AT",
    role: "AI Alignment Researcher",
    followers: "39.4k",
    articlesCount: 32,
  },
];

// Testimonials
const TESTIMONIALS = [
  {
    quote:
      "OVERSTACK has become my daily morning ritual. The density of high-quality technical essays without clickbait is unmatched.",
    author: "Jessica Lin",
    role: "VP of Engineering at CloudScale",
    avatar: "JL",
  },
  {
    quote:
      "As a designer, I love the clean typography and distraction-free reader interface. Publishing my field notes here doubled my reach.",
    author: "Devon Reed",
    role: "Product Designer at Vercel",
    avatar: "DR",
  },
  {
    quote:
      "The community feedback on my architecture articles gave me insights I couldn't find anywhere else. Truly a top-tier publishing platform.",
    author: "Amir Patel",
    role: "Staff Infrastructure Architect",
    avatar: "AP",
  },
];

export function CommunityPlatform({ userEmail = "alex@company.io", onSignOut }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [articles, setArticles] = useState(INITIAL_ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [followedWriters, setFollowedWriters] = useState({});
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [newsletterInput, setNewsletterInput] = useState("");
  
  // UI State toggles for demonstration/testing
  const [viewState, setViewState] = useState("normal"); // "normal", "loading", "empty", "error"
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // Animated counters state
  const [stats, setStats] = useState({
    members: 124000,
    articles: 46800,
    readers: 1350000,
    comments: 375000,
  });

  useEffect(() => {
    // Subtle increment simulation for community stats
    const timer = setInterval(() => {
      setStats((prev) => ({
        members: prev.members + 1,
        articles: prev.articles + (Math.random() > 0.5 ? 1 : 0),
        readers: prev.readers + Math.floor(Math.random() * 3),
        comments: prev.comments + 1,
      }));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Like handler
  const toggleLike = (id, e) => {
    if (e) e.stopPropagation();
    setArticles((prev) =>
      prev.map((art) => {
        if (art.id === id) {
          const newLiked = !art.isLiked;
          return {
            ...art,
            isLiked: newLiked,
            claps: newLiked ? art.claps + 1 : art.claps - 1,
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
  const toggleFollow = (handle) => {
    setFollowedWriters((prev) => ({
      ...prev,
      [handle]: !prev[handle],
    }));
  };

  // Filter articles based on Category and Search
  const filteredArticles = articles.filter((art) => {
    const matchesCategory =
      selectedCategory === "All" || art.category === selectedCategory;

    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const featuredArticle =
    articles.find((art) => art.isFeatured) || articles[0];

  return (
    <div
      className={`min-h-screen w-full font-sans transition-colors duration-300 ${
        isDarkMode
          ? "bg-[#09090B] text-[#FAFAFA] selection:bg-[#818CF8] selection:text-black"
          : "bg-[#FAFAFA] text-[#18181B] selection:bg-[#4F46E5] selection:text-white"
      }`}
    >
      {/* 1. Transparent Sticky Navigation Bar */}
      <header
        className={`sticky top-0 z-40 w-full border-b backdrop-blur-md transition-colors duration-300 ${
          isDarkMode
            ? "border-[#3F3F46]/60 bg-[#09090B]/85 text-[#FAFAFA]"
            : "border-[#E4E4E7] bg-white/85 text-[#18181B] shadow-xs"
        }`}
      >
        <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          {/* Logo & Search */}
          <div className="flex items-center gap-6">
            <div
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4F46E5] text-white font-extrabold text-lg shadow-md transition-transform group-hover:scale-105">
                N
              </div>
              <span className="text-xl font-extrabold tracking-tight font-title">
                OVERSTACK
              </span>
            </div>

            {/* Search Input */}
            <div className="relative hidden md:block w-64 lg:w-80">
              <FaSearch
                className={`absolute top-1/2 left-3.5 h-3.5 w-3.5 -translate-y-1/2 ${
                  isDarkMode ? "text-[#A1A1AA]" : "text-[#71717A]"
                }`}
              />
              <input
                type="text"
                placeholder="Search articles, topics, authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full rounded-full border py-2 pl-9 pr-4 text-xs transition-all focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? "bg-[#18181B] border-[#3F3F46] text-[#FAFAFA] placeholder-[#A1A1AA] focus:ring-[#818CF8]/50"
                    : "bg-white border-[#E4E4E7] text-[#18181B] placeholder-[#71717A] focus:ring-[#4F46E5]/40 shadow-2xs"
                }`}
              />
            </div>
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-3">
            {/* View State Switcher for Demo Validation */}
            <div className="hidden xl:flex items-center gap-1 bg-[#F4F4F5] dark:bg-[#18181B] border border-[#E4E4E7] dark:border-[#3F3F46] rounded-full p-1 text-[11px] font-medium">
              <button
                type="button"
                onClick={() => setViewState("normal")}
                className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                  viewState === "normal"
                    ? "bg-white dark:bg-[#27272A] text-[#18181B] dark:text-white font-bold shadow-2xs"
                    : "text-[#71717A] hover:text-[#18181B]"
                }`}
              >
                Normal
              </button>
              <button
                type="button"
                onClick={() => setViewState("loading")}
                className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                  viewState === "loading"
                    ? "bg-white dark:bg-[#27272A] text-[#18181B] dark:text-white font-bold shadow-2xs"
                    : "text-[#71717A] hover:text-[#18181B]"
                }`}
              >
                Skeleton
              </button>
              <button
                type="button"
                onClick={() => setViewState("empty")}
                className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                  viewState === "empty"
                    ? "bg-white dark:bg-[#27272A] text-[#18181B] dark:text-white font-bold shadow-2xs"
                    : "text-[#71717A] hover:text-[#18181B]"
                }`}
              >
                Empty
              </button>
              <button
                type="button"
                onClick={() => setViewState("error")}
                className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                  viewState === "error"
                    ? "bg-white dark:bg-[#27272A] text-[#18181B] dark:text-white font-bold shadow-2xs"
                    : "text-[#71717A] hover:text-[#18181B]"
                }`}
              >
                Error
              </button>
            </div>

            {/* Write Button */}
            <button
              type="button"
              onClick={() => alert("Story editor opening...")}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold shadow-sm transition-all active:scale-95 cursor-pointer ${
                isDarkMode
                  ? "bg-[#818CF8] text-[#09090B] hover:bg-[#6366F1]"
                  : "bg-[#4F46E5] text-white hover:bg-[#4338CA]"
              }`}
            >
              <FaPen className="h-3 w-3" />
              <span className="hidden sm:inline">Write Story</span>
            </button>

            {/* Theme Toggler */}
            <AnimatedThemeToggler
              theme={isDarkMode ? "dark" : "light"}
              onThemeChange={(newTheme) => setIsDarkMode(newTheme === "dark")}
              duration={450}
              className={`flex h-9 w-9 items-center justify-center rounded-full border transition-all cursor-pointer ${
                isDarkMode
                  ? "bg-[#18181B] border-[#3F3F46] text-[#FBBF24] hover:bg-[#27272A]"
                  : "bg-white border-[#E4E4E7] text-[#4F46E5] hover:bg-[#F4F4F5]"
              }`}
            />

            {/* Notifications Popover Toggle */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen((v) => !v)}
                className={`relative flex h-9 w-9 items-center justify-center rounded-full border transition-colors cursor-pointer ${
                  isDarkMode
                    ? "bg-[#18181B] border-[#3F3F46] text-[#D4D4D8] hover:text-white"
                    : "bg-white border-[#E4E4E7] text-[#52525B] hover:text-[#18181B]"
                }`}
                title="Notifications"
              >
                <FaBell className="h-3.5 w-3.5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#14B8A6]" />
              </button>

              {notificationsOpen && (
                <div
                  className={`absolute right-0 mt-3 w-72 sm:w-80 rounded-2xl border p-4 shadow-xl z-50 transition-all ${
                    isDarkMode
                      ? "bg-[#18181B] border-[#3F3F46] text-[#FAFAFA]"
                      : "bg-white border-[#E4E4E7] text-[#18181B]"
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#E4E4E7] dark:border-[#3F3F46]">
                    <span className="text-xs font-bold">Notifications</span>
                    <span className="text-[10px] text-[#14B8A6] font-semibold">
                      Mark all read
                    </span>
                  </div>
                  <div className="mt-3 space-y-3">
                    <div className="flex gap-2.5 text-xs">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#4F46E5]/10 text-[#4F46E5] dark:text-[#818CF8] font-bold text-[10px]">
                        ER
                      </div>
                      <div>
                        <p className="font-semibold leading-snug">
                          Elena Rostova liked your story "Web Architecture"
                        </p>
                        <span className="text-[10px] text-[#71717A]">
                          10m ago
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2.5 text-xs">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#14B8A6]/10 text-[#14B8A6] font-bold text-[10px]">
                        MC
                      </div>
                      <div>
                        <p className="font-semibold leading-snug">
                          Marcus Chen started following you
                        </p>
                        <span className="text-[10px] text-[#71717A]">
                          1h ago
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown Toggle */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((v) => !v)}
                className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold transition-all cursor-pointer ${
                  isDarkMode
                    ? "bg-[#27272A] border-[#3F3F46] text-[#818CF8]"
                    : "bg-[#F4F4F5] border-[#E4E4E7] text-[#4F46E5]"
                }`}
              >
                {userEmail.substring(0, 2).toUpperCase()}
              </button>

              {profileOpen && (
                <div
                  className={`absolute right-0 mt-3 w-56 rounded-2xl border p-2 shadow-xl z-50 ${
                    isDarkMode
                      ? "bg-[#18181B] border-[#3F3F46] text-[#FAFAFA]"
                      : "bg-white border-[#E4E4E7] text-[#18181B]"
                  }`}
                >
                  <div className="px-3 py-2 border-b border-[#E4E4E7] dark:border-[#3F3F46]">
                    <p className="text-xs font-bold truncate">{userEmail}</p>
                    <span className="text-[10px] text-[#71717A]">
                      Pro Contributor
                    </span>
                  </div>
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={() => alert("Profile settings")}
                      className="w-full text-left px-3 py-1.5 text-xs rounded-xl hover:bg-[#F4F4F5] dark:hover:bg-[#27272A]"
                    >
                      Profile Settings
                    </button>
                    <button
                      type="button"
                      onClick={() => alert("Saved stories")}
                      className="w-full text-left px-3 py-1.5 text-xs rounded-xl hover:bg-[#F4F4F5] dark:hover:bg-[#27272A]"
                    >
                      Saved Bookmarks
                    </button>
                    <button
                      type="button"
                      onClick={onSignOut}
                      className="w-full flex items-center gap-2 text-left px-3 py-1.5 text-xs text-red-500 rounded-xl hover:bg-red-500/10"
                    >
                      <FaSignOutAlt className="h-3 w-3" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6">
        {/* Soft Ambient Background Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-[#4F46E5]/20 via-[#14B8A6]/15 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-semibold border bg-[#4F46E5]/10 text-[#4F46E5] dark:text-[#818CF8] border-[#4F46E5]/30">
              <span className="h-2 w-2 rounded-full bg-[#14B8A6] animate-pulse" />
              <span>A Publishing Home for Creators & Engineers</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight font-title">
              Where ideas meet impact. Share stories, learn together.
            </h1>

            <p className="text-base sm:text-xl max-w-2xl leading-relaxed text-[#52525B] dark:text-[#D4D4D8]">
              Join an open community of engineers, product thinkers, and domain experts sharing in-depth tutorials, real-world case studies, and editorial essays.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={() => alert("Opening publishing editor...")}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold shadow-lg transition-all hover:scale-105 cursor-pointer ${
                  isDarkMode
                    ? "bg-[#818CF8] text-[#09090B] hover:bg-[#6366F1]"
                    : "bg-[#4F46E5] text-white hover:bg-[#4338CA]"
                }`}
              >
                <span>Start Writing Free</span>
                <FaArrowRight className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const element = document.getElementById("articles-grid");
                  element?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold border transition-all cursor-pointer ${
                  isDarkMode
                    ? "bg-[#18181B] border-[#3F3F46] text-[#FAFAFA] hover:bg-[#27272A]"
                    : "bg-white border-[#E4E4E7] text-[#18181B] hover:bg-[#F4F4F5] shadow-xs"
                }`}
              >
                <span>Explore Stories</span>
              </button>
            </div>
          </div>

          {/* Custom Collaboration Visual Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className={`relative w-full max-w-md rounded-3xl border p-6 shadow-2xl backdrop-blur-md transition-all ${
                isDarkMode
                  ? "bg-[#18181B]/80 border-[#3F3F46]"
                  : "bg-white/80 border-[#E4E4E7]"
              }`}
            >
              <div className="flex items-center justify-between border-b pb-4 border-[#E4E4E7] dark:border-[#3F3F46]">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-amber-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <span className="text-[11px] font-mono text-[#71717A]">
                  community_feed.ts
                </span>
              </div>

              <div className="mt-4 space-y-4 font-mono text-xs">
                <div className="p-3 rounded-2xl bg-[#F4F4F5] dark:bg-[#27272A]">
                  <span className="text-[#4F46E5] dark:text-[#818CF8] font-bold">
                    const
                  </span>{" "}
                  publication = {"{"}
                  <br />
                  &nbsp;&nbsp;title:{" "}
                  <span className="text-[#14B8A6]">"Zero-Latency State"</span>,
                  <br />
                  &nbsp;&nbsp;claps: <span className="text-[#F59E0B]">1420</span>,
                  <br />
                  &nbsp;&nbsp;verified: <span className="text-emerald-500">true</span>
                  <br />
                  {"}"};
                </div>

                <div className="flex items-center justify-between p-3 rounded-2xl border border-[#E4E4E7] dark:border-[#3F3F46]">
                  <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-full bg-[#4F46E5] text-white flex items-center justify-center font-sans font-bold text-xs">
                      ER
                    </div>
                    <div>
                      <p className="font-sans font-bold text-xs">Elena Rostova</p>
                      <p className="font-sans text-[10px] text-[#71717A]">
                        Published 2m ago
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#14B8A6]/10 px-2.5 py-1 font-sans text-[11px] font-semibold text-[#14B8A6]">
                    <FaHeart className="h-3 w-3 text-red-500" /> 1.4k
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Animated Trending Topics */}
      <section className="py-6 border-y border-[#E4E4E7] dark:border-[#3F3F46] bg-white/50 dark:bg-[#18181B]/50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center gap-4 overflow-x-auto scrollbar-none py-1">
            <span className="text-xs font-bold uppercase tracking-wider shrink-0 text-[#71717A]">
              Trending Topics:
            </span>
            {CATEGORIES.filter((c) => c !== "All").map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? isDarkMode
                      ? "bg-[#818CF8] text-[#09090B] shadow-md scale-105"
                      : "bg-[#4F46E5] text-white shadow-md scale-105"
                    : isDarkMode
                    ? "bg-[#27272A] text-[#D4D4D8] hover:bg-[#3F3F46] hover:text-white"
                    : "bg-[#F4F4F5] text-[#52525B] hover:bg-[#E4E4E7] hover:text-[#18181B]"
                }`}
              >
                #{cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Article Card */}
      {!searchQuery && selectedCategory === "All" && featuredArticle && (
        <section className="py-12 px-4 sm:px-6">
          <div className="container mx-auto max-w-7xl">
            <div
              onClick={() => setSelectedArticle(featuredArticle)}
              className={`group relative grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-3xl border transition-all duration-300 cursor-pointer shadow-lg hover:shadow-2xl ${
                isDarkMode
                  ? "bg-[#18181B] border-[#3F3F46] hover:border-[#818CF8]/50"
                  : "bg-white border-[#E4E4E7] hover:border-[#4F46E5]/40"
              }`}
            >
              {/* Image Container */}
              <div className="lg:col-span-7 relative h-72 lg:h-auto overflow-hidden">
                <img
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F59E0B] px-3.5 py-1 text-xs font-extrabold text-black shadow-md uppercase tracking-wider">
                    <FaFire className="h-3 w-3" /> Featured Story
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#14B8A6]">
                      {featuredArticle.category}
                    </span>
                    <span className="text-xs text-[#71717A] flex items-center gap-1">
                      <FaClock className="h-3 w-3" /> {featuredArticle.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug group-hover:text-[#4F46E5] dark:group-hover:text-[#818CF8] transition-colors font-title">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-sm sm:text-base leading-relaxed text-[#52525B] dark:text-[#D4D4D8] line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E4E4E7] dark:border-[#3F3F46] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[#4F46E5] text-white flex items-center justify-center font-bold text-sm">
                      {featuredArticle.authorAvatar}
                    </div>
                    <div>
                      <p className="text-xs font-bold flex items-center gap-1">
                        <span>{featuredArticle.author}</span>
                        <MdVerified className="h-4 w-4 text-[#14B8A6]" />
                      </p>
                      <span className="text-[11px] text-[#71717A]">
                        {featuredArticle.publishedAt}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => toggleLike(featuredArticle.id, e)}
                      className="flex items-center gap-1.5 text-xs font-semibold hover:text-red-500 transition-colors"
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
                      className="p-1 hover:text-[#4F46E5] transition-colors"
                    >
                      {featuredArticle.isBookmarked ? (
                        <FaBookmark className="h-4 w-4 text-[#4F46E5] dark:text-[#818CF8]" />
                      ) : (
                        <FaRegBookmark className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. Responsive Article Grid & Tab Filters */}
      <section id="articles-grid" className="py-12 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl space-y-8">
          {/* Filter Bar & Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4 border-[#E4E4E7] dark:border-[#3F3F46]">
            <div>
              <h2 className="text-2xl font-bold tracking-tight font-title">
                {selectedCategory} Articles
              </h2>
              <p className="text-xs text-[#71717A]">
                Showing {filteredArticles.length} community posts
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? isDarkMode
                        ? "bg-[#818CF8] text-[#09090B] font-bold"
                        : "bg-[#4F46E5] text-white font-bold"
                      : "bg-[#F4F4F5] dark:bg-[#27272A] text-[#71717A] dark:text-[#A1A1AA] hover:text-[#18181B] dark:hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* GRID STATE 1: SKELETON LOADING STATE */}
          {viewState === "loading" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border p-5 space-y-4 animate-pulse bg-white dark:bg-[#18181B] border-[#E4E4E7] dark:border-[#3F3F46]"
                >
                  <div className="h-48 w-full rounded-2xl bg-gray-200 dark:bg-zinc-800" />
                  <div className="h-4 w-1/4 rounded-full bg-gray-200 dark:bg-zinc-800" />
                  <div className="h-6 w-3/4 rounded-md bg-gray-200 dark:bg-zinc-800" />
                  <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-zinc-800" />
                </div>
              ))}
            </div>
          )}

          {/* GRID STATE 2: EMPTY STATE */}
          {viewState === "empty" && (
            <div className="rounded-3xl border p-12 text-center bg-white dark:bg-[#18181B] border-[#E4E4E7] dark:border-[#3F3F46] space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F4F4F5] dark:bg-[#27272A] text-[#71717A]">
                <FaSearch className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">No articles found</h3>
              <p className="text-xs text-[#71717A] max-w-sm mx-auto">
                We couldn't find any stories matching your filters. Try clearing your search query or picking another category.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                  setViewState("normal");
                }}
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold bg-[#4F46E5] text-white hover:bg-[#4338CA] transition-all cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}

          {/* GRID STATE 3: ERROR STATE */}
          {viewState === "error" && (
            <div className="rounded-3xl border p-12 text-center bg-red-500/5 border-red-500/20 space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                <FaExclamationTriangle className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-red-500">
                Failed to load article stream
              </h3>
              <p className="text-xs text-[#71717A] max-w-sm mx-auto">
                A connection timeout occurred while syncing with the server. Please check your network and try again.
              </p>
              <button
                type="button"
                onClick={() => setViewState("normal")}
                className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold bg-red-500 text-white hover:bg-red-600 transition-all cursor-pointer"
              >
                <FaSpinner className="h-3 w-3 animate-spin" /> Retry Connection
              </button>
            </div>
          )}

          {/* GRID STATE 4: NORMAL ARTICLE GRID */}
          {viewState === "normal" && (
            <>
              {filteredArticles.length === 0 ? (
                <div className="rounded-3xl border p-12 text-center bg-white dark:bg-[#18181B] border-[#E4E4E7] dark:border-[#3F3F46]">
                  <p className="text-sm text-[#71717A]">
                    No articles found matching "{searchQuery}".
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((art) => (
                    <article
                      key={art.id}
                      onClick={() => setSelectedArticle(art)}
                      className={`group rounded-3xl border p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer space-y-4 shadow-sm hover:shadow-xl ${
                        isDarkMode
                          ? "bg-[#18181B] border-[#3F3F46] hover:border-[#818CF8]/50"
                          : "bg-white border-[#E4E4E7] hover:border-[#4F46E5]/40"
                      }`}
                    >
                      <div className="space-y-3">
                        {/* Image Thumbnail */}
                        <div className="relative h-48 w-full overflow-hidden rounded-2xl">
                          <img
                            src={art.coverImage}
                            alt={art.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <span className="absolute top-3 left-3 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-semibold text-white">
                            {art.category}
                          </span>
                        </div>

                        {/* Author Header */}
                        <div className="flex items-center justify-between text-xs text-[#71717A]">
                          <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-[#4F46E5] text-white flex items-center justify-center font-bold text-[10px]">
                              {art.authorAvatar}
                            </div>
                            <span className="font-semibold text-[#18181B] dark:text-[#FAFAFA]">
                              {art.author}
                            </span>
                          </div>
                          <span>{art.publishedAt}</span>
                        </div>

                        {/* Article Title */}
                        <h3 className="text-xl font-bold leading-snug group-hover:text-[#4F46E5] dark:group-hover:text-[#818CF8] transition-colors font-title">
                          {art.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-xs leading-relaxed text-[#52525B] dark:text-[#D4D4D8] line-clamp-2">
                          {art.excerpt}
                        </p>
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-3 border-t border-[#E4E4E7] dark:border-[#3F3F46] flex items-center justify-between text-xs text-[#71717A]">
                        <span className="flex items-center gap-1">
                          <FaClock className="h-3 w-3" /> {art.readTime}
                        </span>

                        <div className="flex items-center gap-3">
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

                          <button
                            type="button"
                            onClick={(e) => toggleBookmark(art.id, e)}
                            className="p-1 hover:text-[#4F46E5] transition-colors"
                          >
                            {art.isBookmarked ? (
                              <FaBookmark className="h-4 w-4 text-[#4F46E5] dark:text-[#818CF8]" />
                            ) : (
                              <FaRegBookmark className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Pagination Controls */}
              <div className="flex items-center justify-center gap-2 pt-6">
                <button
                  type="button"
                  onClick={() => setCurrentPageNum((p) => Math.max(1, p - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E4E4E7] dark:border-[#3F3F46] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] text-xs cursor-pointer"
                >
                  <FaChevronLeft className="h-3 w-3" />
                </button>
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setCurrentPageNum(num)}
                    className={`h-9 w-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      currentPageNum === num
                        ? isDarkMode
                          ? "bg-[#818CF8] text-black"
                          : "bg-[#4F46E5] text-white"
                        : "border border-[#E4E4E7] dark:border-[#3F3F46] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A]"
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setCurrentPageNum((p) => Math.min(3, p + 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E4E4E7] dark:border-[#3F3F46] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] text-xs cursor-pointer"
                >
                  <FaChevronRight className="h-3 w-3" />
                </button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* 6. Popular Writers Section */}
      <section className="py-16 px-4 sm:px-6 bg-[#F4F4F5]/50 dark:bg-[#18181B]/40">
        <div className="container mx-auto max-w-7xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight font-title">
                Popular Writers & Field Experts
              </h2>
              <p className="text-xs text-[#71717A]">
                Follow leading contributors for insights and tutorials
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {POPULAR_WRITERS.map((writer) => {
              const isFollowing = followedWriters[writer.handle];
              return (
                <div
                  key={writer.handle}
                  className={`rounded-3xl border p-6 flex flex-col justify-between space-y-4 shadow-sm hover:shadow-lg transition-all ${
                    isDarkMode
                      ? "bg-[#18181B] border-[#3F3F46]"
                      : "bg-white border-[#E4E4E7]"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-[#4F46E5] text-white font-bold flex items-center justify-center text-sm shadow-md">
                        {writer.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-bold flex items-center gap-1">
                          <span>{writer.name}</span>
                          <MdVerified className="h-4 w-4 text-[#14B8A6]" />
                        </p>
                        <p className="text-[11px] text-[#71717A]">
                          {writer.handle}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-[#71717A] leading-relaxed">
                      {writer.role}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E4E4E7] dark:border-[#3F3F46] flex items-center justify-between">
                    <div className="text-[11px] text-[#71717A]">
                      <span className="font-bold text-[#18181B] dark:text-[#FAFAFA]">
                        {writer.followers}
                      </span>{" "}
                      readers
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleFollow(writer.handle)}
                      className={`inline-flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                        isFollowing
                          ? "bg-[#F4F4F5] dark:bg-[#27272A] text-[#71717A]"
                          : isDarkMode
                          ? "bg-[#818CF8] text-[#09090B] hover:bg-[#6366F1]"
                          : "bg-[#4F46E5] text-white hover:bg-[#4338CA]"
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Community Statistics Section */}
      <section className="py-16 px-4 sm:px-6 bg-[#4F46E5] text-white dark:bg-[#18181B] dark:text-[#FAFAFA] dark:border-y dark:border-[#3F3F46]">
        <div className="container mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-1">
            <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-title">
              {(stats.members / 1000).toFixed(1)}k+
            </h3>
            <p className="text-xs sm:text-sm text-indigo-100 dark:text-[#A1A1AA] font-medium">
              Active Community Members
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-title">
              {(stats.articles / 1000).toFixed(1)}k+
            </h3>
            <p className="text-xs sm:text-sm text-indigo-100 dark:text-[#A1A1AA] font-medium">
              Published Articles & Tutorials
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-title">
              {(stats.readers / 1000000).toFixed(1)}M+
            </h3>
            <p className="text-xs sm:text-sm text-indigo-100 dark:text-[#A1A1AA] font-medium">
              Monthly Readers
            </p>
          </div>

          <div className="space-y-1">
            <h3 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-title">
              {(stats.comments / 1000).toFixed(0)}k+
            </h3>
            <p className="text-xs sm:text-sm text-indigo-100 dark:text-[#A1A1AA] font-medium">
              Peer Discussion Comments
            </p>
          </div>
        </div>
      </section>

      {/* 8. Testimonials Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl space-y-10">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold tracking-tight font-title">
              Loved by Engineers & Domain Leaders
            </h2>
            <p className="text-xs text-[#71717A]">
              Here is what authors and readers have to say about publishing on OVERSTACK
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className={`rounded-3xl border p-8 space-y-6 shadow-sm hover:shadow-xl transition-all ${
                  isDarkMode
                    ? "bg-[#18181B] border-[#3F3F46]"
                    : "bg-white border-[#E4E4E7]"
                }`}
              >
                <FaQuoteLeft className="h-6 w-6 text-[#14B8A6]" />
                <p className="text-sm leading-relaxed text-[#52525B] dark:text-[#D4D4D8] font-editorial italic">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="h-9 w-9 rounded-full bg-[#4F46E5] text-white flex items-center justify-center font-bold text-xs">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-xs font-bold">{t.author}</p>
                    <p className="text-[11px] text-[#71717A]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Newsletter Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <div
            className={`rounded-3xl border p-8 sm:p-12 text-center space-y-6 shadow-xl ${
              isDarkMode
                ? "bg-[#18181B] border-[#3F3F46]"
                : "bg-white border-[#E4E4E7]"
            }`}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#14B8A6]/10 text-[#14B8A6] font-bold text-xl">
              ✉
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-title">
                Stay updated with the best essays & tutorials
              </h2>
              <p className="text-xs sm:text-sm text-[#71717A] max-w-lg mx-auto">
                Get handpicked deep dives delivered directly to your inbox once a week. Zero spam. Unsubscribe anytime.
              </p>
            </div>

            {emailSubscribed ? (
              <div className="inline-flex items-center gap-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 px-6 py-3 text-xs font-bold text-emerald-500">
                <FaCheck className="h-4 w-4" />
                <span>Subscribed! Check your inbox for confirmation.</span>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (newsletterInput) setEmailSubscribed(true);
                }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={newsletterInput}
                  onChange={(e) => setNewsletterInput(e.target.value)}
                  required
                  className={`w-full rounded-full border px-4 py-3 text-xs focus:outline-none focus:ring-2 ${
                    isDarkMode
                      ? "bg-[#09090B] border-[#3F3F46] text-[#FAFAFA] focus:ring-[#818CF8]/50"
                      : "bg-[#FAFAFA] border-[#E4E4E7] text-[#18181B] focus:ring-[#4F46E5]/40"
                  }`}
                />
                <button
                  type="submit"
                  className={`w-full sm:w-auto whitespace-nowrap rounded-full px-6 py-3 text-xs font-bold shadow-md transition-all cursor-pointer ${
                    isDarkMode
                      ? "bg-[#818CF8] text-[#09090B] hover:bg-[#6366F1]"
                      : "bg-[#4F46E5] text-white hover:bg-[#4338CA]"
                  }`}
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 10. Large SaaS Footer */}
      <footer className="border-t border-[#E4E4E7] dark:border-[#3F3F46] bg-white dark:bg-[#09090B] pt-16 pb-8 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-5 gap-8 pb-12">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#4F46E5] text-white font-bold text-sm">
                N
              </div>
              <span className="text-lg font-extrabold tracking-tight font-title">
                OVERSTACK
              </span>
            </div>
            <p className="text-xs text-[#71717A] max-w-sm leading-relaxed">
              A modern, editorial community platform for engineers, creators, and leaders to share knowledge and inspire.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-500 font-semibold">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-[#18181B] dark:text-[#FAFAFA]">
              Platform
            </h4>
            <ul className="space-y-2 text-[#71717A]">
              <li><a href="#" className="hover:text-[#4F46E5]">Explore Stories</a></li>
              <li><a href="#" className="hover:text-[#4F46E5]">Featured Authors</a></li>
              <li><a href="#" className="hover:text-[#4F46E5]">Trending Topics</a></li>
              <li><a href="#" className="hover:text-[#4F46E5]">Editor Access</a></li>
            </ul>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-[#18181B] dark:text-[#FAFAFA]">
              Resources
            </h4>
            <ul className="space-y-2 text-[#71717A]">
              <li><a href="#" className="hover:text-[#4F46E5]">Writing Guidelines</a></li>
              <li><a href="#" className="hover:text-[#4F46E5]">API Documentation</a></li>
              <li><a href="#" className="hover:text-[#4F46E5]">Community Discord</a></li>
              <li><a href="#" className="hover:text-[#4F46E5]">Release Notes</a></li>
            </ul>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-[#18181B] dark:text-[#FAFAFA]">
              Legal
            </h4>
            <ul className="space-y-2 text-[#71717A]">
              <li><a href="#" className="hover:text-[#4F46E5]">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#4F46E5]">Terms of Service</a></li>
              <li><a href="#" className="hover:text-[#4F46E5]">Cookie Settings</a></li>
              <li><a href="#" className="hover:text-[#4F46E5]">Content Ownership</a></li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl pt-8 border-t border-[#E4E4E7] dark:border-[#3F3F46] flex flex-col sm:flex-row items-center justify-between text-xs text-[#71717A] gap-4">
          <p>© 2026 OVERSTACK Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Built with precision & high editorial care.</span>
          </div>
        </div>
      </footer>

      {/* Full Article Reader Modal / Drawer */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md overflow-y-auto">
          <div
            className={`relative my-8 w-full max-w-3xl rounded-3xl border p-6 sm:p-10 shadow-2xl space-y-6 ${
              isDarkMode
                ? "bg-[#18181B] border-[#3F3F46] text-[#D4D4D8]"
                : "bg-white border-[#E4E4E7] text-[#52525B]"
            }`}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 flex h-9 w-9 items-center justify-center rounded-full border border-[#E4E4E7] dark:border-[#3F3F46] hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] cursor-pointer"
            >
              <FaTimes className="h-4 w-4" />
            </button>

            {/* Category & Read Time */}
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#4F46E5]/10 text-[#4F46E5] dark:text-[#818CF8] px-3.5 py-1 text-xs font-bold uppercase">
                {selectedArticle.category}
              </span>
              <span className="text-xs text-[#71717A] flex items-center gap-1">
                <FaClock className="h-3 w-3" /> {selectedArticle.readTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-[#18181B] dark:text-[#FAFAFA] font-title">
              {selectedArticle.title}
            </h1>

            {/* Author Meta Bar */}
            <div className="flex items-center justify-between border-y border-[#E4E4E7] dark:border-[#3F3F46] py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#4F46E5] text-white flex items-center justify-center font-bold text-sm">
                  {selectedArticle.authorAvatar}
                </div>
                <div>
                  <p className="text-xs font-bold flex items-center gap-1 text-[#18181B] dark:text-[#FAFAFA]">
                    <span>{selectedArticle.author}</span>
                    <MdVerified className="h-4 w-4 text-[#14B8A6]" />
                  </p>
                  <span className="text-[11px] text-[#71717A]">
                    {selectedArticle.authorHandle} • {selectedArticle.publishedAt}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleLike(selectedArticle.id)}
                  className="flex items-center gap-1.5 rounded-full border border-[#E4E4E7] dark:border-[#3F3F46] px-3.5 py-1.5 text-xs font-semibold hover:text-red-500 cursor-pointer"
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
                  className="rounded-full border border-[#E4E4E7] dark:border-[#3F3F46] p-2 hover:text-[#4F46E5] cursor-pointer"
                >
                  {selectedArticle.isBookmarked ? (
                    <FaBookmark className="h-4 w-4 text-[#4F46E5] dark:text-[#818CF8]" />
                  ) : (
                    <FaRegBookmark className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Article Content Paragraphs using Source Serif 4 typography */}
            <div className="space-y-4 text-base sm:text-lg leading-relaxed whitespace-pre-line font-editorial">
              {selectedArticle.content}
            </div>

            {/* Modal Footer */}
            <div className="pt-6 border-t border-[#E4E4E7] dark:border-[#3F3F46] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="inline-flex items-center gap-2 rounded-full border border-[#E4E4E7] dark:border-[#3F3F46] px-5 py-2.5 text-xs font-bold hover:bg-[#F4F4F5] dark:hover:bg-[#27272A] cursor-pointer"
              >
                <MdArrowBack className="h-4 w-4" />
                <span>Back to Stories</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);
                  alert("Story link copied to clipboard!");
                }}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold shadow-md cursor-pointer ${
                  isDarkMode
                    ? "bg-[#818CF8] text-[#09090B] hover:bg-[#6366F1]"
                    : "bg-[#4F46E5] text-white hover:bg-[#4338CA]"
                }`}
              >
                <FaShareAlt className="h-3.5 w-3.5" />
                <span>Share Story</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommunityPlatform;
