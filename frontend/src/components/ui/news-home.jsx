import { useState, useEffect } from "react";
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
  FaTrash,
  FaPaperPlane,
  FaRocket,
  FaComments,
  FaTrophy,
  FaExternalLinkAlt,
  FaHashtag,
} from "react-icons/fa";
import { Sparkles, Clock, Flame, Check, X, MessageSquare, Zap, Copy, Share2 } from "lucide-react";

import { useAuth } from "@/context/AuthContext";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import AiChatBot from "@/components/ui/ai-chat-bot";
import {
  fetchArticlesApi,
  deleteArticleApi,
  toggleArticleLikeApi,
} from "@/services/articleService";
import {
  fetchArticleCommentsApi,
  createCommentApi,
  deleteCommentApi,
} from "@/services/commentService";

/**
 * INITIAL_DEV_ARTICLES
 * Production-grade developer community feed dataset with technical architectures, code snippets, and benchmarks.
 */
const INITIAL_DEV_ARTICLES = [
  {
    id: "dev-art-1",
    title: "The Architecture of Modern Web Applications in 2026: Monoliths, Edge & RSC",
    excerpt: "Why teams are abandoning microservice sprawl, how edge compute changes state management, and what we learned serving 10M requests per day.",
    content: `Building web applications in 2026 has reached a fascinating inflection point. For the past decade, microservices and hyper-decoupled frontends were treated as the default architecture for every growing engineering team. However, as infrastructure costs rose and operational complexity exploded, the industry began asking a simple question: "Is this actually making us ship faster?"

### The Renaissance of the Unified Stack
What we are seeing today is not a retreat to ancient patterns, but rather a hyper-optimized synthesis of monolithic developer experience combined with edge routing capabilities. Modern bundlers, server-driven UI primitives (RSC), and global key-value stores allow developers to maintain a single unified codebase while deploying globally in milliseconds.

\`\`\`typescript
// Edge Route Handler with cached KV lookup
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orgId = searchParams.get('orgId');
  
  const cached = await edgeKV.get(\`org:\${orgId}:config\`);
  if (cached) return Response.json(JSON.parse(cached));
  
  const fresh = await db.organizations.findUnique({ where: { id: orgId } });
  await edgeKV.put(\`org:\${orgId}:config\`, JSON.stringify(fresh), { ttl: 3600 });
  return Response.json(fresh);
}
\`\`\`

### Core Architectural Principles
1. **Zero-Latency Data Fetching**: Moving query execution directly to edge workers closest to the end user.
2. **Component-Driven State**: Eliminating global store boilerplate in favor of scoped local state hooks and server actions.
3. **Optimistic UI Updates**: Delivering instant user feedback before server transactions complete.`,
    category: "Architecture",
    tags: ["architecture", "react", "webdev", "edge"],
    readTime: "5 min read",
    author: "Alex Rivera",
    authorHandle: "@alex_architect",
    authorTitle: "Staff Systems Architect",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    publishedAt: "Today",
    claps: 124,
    unicorns: 45,
    commentsCount: 18,
    isLiked: false,
    coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "dev-art-2",
    title: "How We Scaled Node.js Microservices to 10M RPM with Worker Threads & Redis",
    excerpt: "Overcoming the single-threaded CPU bottleneck in heavy JSON deserialization pipelines using Node.js cluster pooling and pipeline buffers.",
    content: `When our event pipeline reached 10,000,000 requests per minute, CPU profiling revealed that 42% of our time was spent simply parsing and validating massive JSON payloads. 

### Why the Event Loop Choked
Even though Node.js excels at asynchronous I/O, heavy computational loads freeze the main thread. Here is how we offloaded processing to dedicated Worker Threads:

\`\`\`javascript
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  module.exports = function parseAsync(rawBuffer) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, { workerData: rawBuffer });
      worker.on('message', resolve);
      worker.on('error', reject);
    });
  };
} else {
  const { workerData } = require('worker_threads');
  const result = JSON.parse(workerData);
  parentPort.postMessage(result);
}
\`\`\`

### Results
- P99 latency dropped from 320ms to 18ms.
- Memory consumption stabilized with zero memory leaks over 30 days of continuous traffic.`,
    category: "Backend",
    tags: ["nodejs", "backend", "redis", "performance"],
    readTime: "7 min read",
    author: "Sarah Chen",
    authorHandle: "@sarah_backend",
    authorTitle: "Principal Backend Engineer",
    authorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
    publishedAt: "Yesterday",
    claps: 98,
    unicorns: 38,
    commentsCount: 12,
    isLiked: false,
    coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "dev-art-3",
    title: "Building Production-Grade AI Agents with Tool Calling and Persistent Memory",
    excerpt: "Designing resilient tool-use loops, JSON schema guardrails, and vector recall so your LLM agents do not hallucinate in production.",
    content: `Autonomous AI agents are only as reliable as their execution loops and context boundaries. In this guide, we break down how to construct deterministic agents with full rollback mechanisms.

### Schema Validation & Tool Calling
Never pass raw unvalidated parameters to your internal APIs. Use strict Zod / Pydantic schemas:

\`\`\`python
from pydantic import BaseModel, Field

class DatabaseQueryTool(BaseModel):
    query_type: str = Field(description="Must be SELECT or COUNT")
    table: str = Field(description="Authorized table name")
    limit: int = Field(default=20, le=100)
    
def execute_safe_query(params: DatabaseQueryTool):
    # Enforces read-only execution with safety boundaries
    return db.readonly_pool.query(params)
\`\`\`

### Persistent Memory Patterns
We store conversational episodic memory in a hybrid Redis + Vector database, maintaining token limits while retaining critical state across sessions.`,
    category: "AI",
    tags: ["ai", "python", "llm", "agents"],
    readTime: "6 min read",
    author: "David Kim",
    authorHandle: "@david_ai",
    authorTitle: "AI Research Lead",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    publishedAt: "2 days ago",
    claps: 156,
    unicorns: 62,
    commentsCount: 29,
    isLiked: false,
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "dev-art-4",
    title: "Mastering TypeScript 5.8: Const Type Parameters and Satisfies Operator",
    excerpt: "Eliminate type assertions, keep literal inference sharp, and write maintainable domain models without type gymnastics.",
    content: `TypeScript 5.8 introduces powerful optimizations for type narrowing and const modifiers on type parameters.

\`\`\`typescript
// Const Type Parameters in Action
function defineRoutes<const T extends Record<string, string>>(routes: T): T {
  return routes;
}

const API_ROUTES = defineRoutes({
  users: '/api/v1/users',
  posts: '/api/v1/posts',
});

// Type is inferred as exact literal strings rather than string!
type UserRoute = typeof API_ROUTES['users']; // '/api/v1/users'
\`\`\`

This pattern completely replaces verbose \`as const\` assertions across complex configuration objects.`,
    category: "Frontend",
    tags: ["typescript", "javascript", "react"],
    readTime: "4 min read",
    author: "Elena Rostova",
    authorHandle: "@elena_ts",
    authorTitle: "Senior Frontend Architect",
    authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    publishedAt: "3 days ago",
    claps: 87,
    unicorns: 29,
    commentsCount: 8,
    isLiked: false,
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
  },
];

const CATEGORIES = [
  "Relevant",
  "#javascript",
  "#react",
  "#nodejs",
  "#python",
  "#ai",
  "#devops",
  "#architecture",
  "#css",
  "#showdev",
];

export function NewsHome({
  userEmail = "admin@company.io",
  currentUser,
  myNotesOnly = false,
  bookmarksOnly = false,
  exploreMode = false,
  onSignOut,
  hideSidebar = false,
  isDarkMode: controlledIsDarkMode,
  externalCreateOpen,
  onCloseExternalCreate,
  customNotes = [],
}) {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const activeUser = currentUser || authUser;

  const [articles, setArticles] = useState(INITIAL_DEV_ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState("Relevant");
  const [feedSort, setFeedSort] = useState("relevant"); // "relevant" | "latest" | "top"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState(() => {
    try {
      const saved = localStorage.getItem("news_portal_bookmarks");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [internalIsDarkMode, setInternalIsDarkMode] = useState(false);
  const isDarkMode =
    controlledIsDarkMode !== undefined ? controlledIsDarkMode : internalIsDarkMode;
  const setIsDarkMode = (val) =>
    setInternalIsDarkMode(typeof val === "function" ? val(isDarkMode) : val);
  const [followedWriters, setFollowedWriters] = useState({});
  const [openMenuId, setOpenMenuId] = useState(null);

  // Comments state for currently selected article
  const [comments, setComments] = useState([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentError, setCommentError] = useState("");

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
        let savedBookmarks = [];
        try {
          savedBookmarks = JSON.parse(localStorage.getItem('news_portal_bookmarks') || '[]');
        } catch {
          savedBookmarks = [];
        }
        const formatted = apiArticles.map((art) => ({
          id: art._id,
          title: art.title,
          excerpt: art.summary || art.content?.substring(0, 150) || '',
          content: art.content,
          category: art.category?.name || 'General',
          tags: art.tags || [art.category?.name?.toLowerCase() || 'dev'],
          readTime: `${Math.max(2, Math.ceil((art.content || '').split(' ').length / 160))} min read`,
          isPrivate: Boolean(art.isPrivate),
          author: art.author?.name || 'Community Developer',
          authorHandle: `@${(art.author?.name || 'dev').toLowerCase().replace(/\s+/g, '_')}`,
          authorTitle: 'Community Engineer',
          authorEmail: art.author?.email || '',
          authorId: art.author?._id || art.author?.id || art.author,
          authorAvatar: art.author?.avatar || '',
          publishedAt: art.createdAt ? new Date(art.createdAt).toLocaleDateString() : 'Recently',
          claps: art.likesCount ?? 0,
          unicorns: (art.likesCount ?? 0) + 5,
          commentsCount: art.commentsCount ?? 0,
          isLiked: Boolean(art.isLiked),
          isBookmarked: savedBookmarks.includes(art._id),
        }));
        if (myNotesOnly) {
          setArticles(formatted);
        } else {
          // Combine MongoDB articles with rich developer community articles
          setArticles([...formatted, ...INITIAL_DEV_ARTICLES]);
        }
      } catch (err) {
        console.error('Failed to fetch articles from database:', err.message);
      }
    };
    loadBackendArticles();
  }, [myNotesOnly]);

  const [copiedCodeSnippet, setCopiedCodeSnippet] = useState(null);
  const [copiedShareLink, setCopiedShareLink] = useState(false);

  const renderInlineMarkdown = (text) => {
    if (typeof text !== 'string') return text;
    // 1. Split code ticks: `code`
    const codeParts = text.split(/(`[^`]+`)/g);
    return codeParts.map((part, pIdx) => {
      if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
        return (
          <code
            key={pIdx}
            className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 font-mono text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-semibold border border-slate-200/60 dark:border-zinc-700/60"
          >
            {part.slice(1, -1)}
          </code>
        );
      }
      // 2. Split bold: **bold**
      const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
      return boldParts.map((bPart, bIdx) => {
        if (bPart.startsWith('**') && bPart.endsWith('**') && bPart.length > 4) {
          return (
            <strong key={`${pIdx}-${bIdx}`} className="font-bold text-slate-900 dark:text-white">
              {bPart.slice(2, -2)}
            </strong>
          );
        }
        // 3. Split italic: *italic*
        const italicParts = bPart.split(/(\*[^*]+\*)/g);
        return italicParts.map((iPart, iIdx) => {
          if (iPart.startsWith('*') && iPart.endsWith('*') && iPart.length > 2) {
            return (
              <em key={`${pIdx}-${bIdx}-${iIdx}`} className="italic">
                {iPart.slice(1, -1)}
              </em>
            );
          }
          return iPart;
        });
      });
    });
  };

  const renderDevContent = (content) => {
    if (!content) return null;

    // Split code fences
    const segments = content.split(/(```[\s\S]*?```)/g);

    return (
      <div className="space-y-4 text-base sm:text-lg leading-relaxed font-normal text-slate-700 dark:text-zinc-300">
        {segments.map((seg, sIdx) => {
          if (seg.startsWith('```') && seg.endsWith('```')) {
            const raw = seg.slice(3, -3);
            const lines = raw.split('\n');
            let lang = 'code';
            let codeBody = raw.trim();
            if (lines[0] && !lines[0].includes(' ') && lines[0].length < 15) {
              lang = lines[0].trim();
              codeBody = lines.slice(1).join('\n').trim();
            }
            return (
              <div
                key={`code-${sIdx}`}
                className="my-6 rounded-2xl overflow-hidden border border-zinc-800 bg-[#0d1117] font-mono text-xs sm:text-sm text-zinc-200 shadow-md"
              >
                <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 font-bold text-emerald-400 tracking-wide uppercase text-[11px]">{lang || 'Code'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(codeBody);
                      setCopiedCodeSnippet(sIdx);
                      setTimeout(() => setCopiedCodeSnippet(null), 2000);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-semibold cursor-pointer transition-colors"
                  >
                    {copiedCodeSnippet === sIdx ? (
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Check className="w-3.5 h-3.5" /> Copied
                      </span>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 sm:p-5 overflow-x-auto text-emerald-300/90 whitespace-pre scrollbar-thin">
                  <code>{codeBody}</code>
                </pre>
              </div>
            );
          }

          // Non-code segment: parse lines into structured blocks
          const rawLines = seg.split('\n');
          const structuredElements = [];
          let currentList = null; // { type: 'bullet' | 'number', items: [] }

          const flushList = () => {
            if (!currentList) return;
            if (currentList.type === 'bullet') {
              structuredElements.push(
                <ul key={`ul-${structuredElements.length}`} className="my-3 space-y-2 pl-1">
                  {currentList.items.map((it, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-700 dark:text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2.5 shrink-0" />
                      <span>{renderInlineMarkdown(it)}</span>
                    </li>
                  ))}
                </ul>
              );
            } else if (currentList.type === 'number') {
              structuredElements.push(
                <ol key={`ol-${structuredElements.length}`} className="my-3 space-y-2 pl-1">
                  {currentList.items.map((it, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-700 dark:text-zinc-300">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{renderInlineMarkdown(it)}</span>
                    </li>
                  ))}
                </ol>
              );
            }
            currentList = null;
          };

          for (let i = 0; i < rawLines.length; i++) {
            const line = rawLines[i].trim();

            if (!line) {
              flushList();
              continue;
            }

            // Headings
            if (line.startsWith('### ')) {
              flushList();
              structuredElements.push(
                <h3
                  key={`h3-${structuredElements.length}`}
                  className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-6 mb-2 tracking-tight"
                >
                  {renderInlineMarkdown(line.slice(4))}
                </h3>
              );
              continue;
            }

            if (line.startsWith('## ')) {
              flushList();
              structuredElements.push(
                <h2
                  key={`h2-${structuredElements.length}`}
                  className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-8 mb-3 tracking-tight"
                >
                  {renderInlineMarkdown(line.slice(3))}
                </h2>
              );
              continue;
            }

            if (line.startsWith('# ')) {
              flushList();
              structuredElements.push(
                <h1
                  key={`h1-${structuredElements.length}`}
                  className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-10 mb-4 pb-2 border-b border-slate-200/80 dark:border-zinc-800 tracking-tight"
                >
                  {renderInlineMarkdown(line.slice(2))}
                </h1>
              );
              continue;
            }

            // Horizontal Rule
            if (line === '---' || line === '***' || line === '___') {
              flushList();
              structuredElements.push(
                <hr key={`hr-${structuredElements.length}`} className="my-8 border-slate-200 dark:border-zinc-800" />
              );
              continue;
            }

            // Callouts & Quotes
            if (line.startsWith('>')) {
              flushList();
              let quoteText = line.replace(/^>\s*/, '');
              let isCallout = false;
              let calloutLabel = '';
              if (quoteText.startsWith('[NOTE]') || quoteText.startsWith('[TIP]') || quoteText.startsWith('[IMPORTANT]')) {
                isCallout = true;
                const match = quoteText.match(/^\[(NOTE|TIP|IMPORTANT)\]\s*(.*)/);
                if (match) {
                  calloutLabel = match[1];
                  quoteText = match[2];
                }
              }
              structuredElements.push(
                <div
                  key={`quote-${structuredElements.length}`}
                  className="my-4 border-l-4 border-emerald-500 bg-emerald-500/10 dark:bg-emerald-950/20 rounded-r-2xl p-4 sm:p-5 text-slate-700 dark:text-zinc-200"
                >
                  {isCallout && (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1 uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{calloutLabel}</span>
                    </div>
                  )}
                  <div className="italic text-sm sm:text-base">
                    {renderInlineMarkdown(quoteText)}
                  </div>
                </div>
              );
              continue;
            }

            // Bullet Lists
            if (line.startsWith('• ') || line.startsWith('- ') || line.startsWith('* ')) {
              const itemText = line.replace(/^[•\-*]\s*/, '');
              if (!currentList || currentList.type !== 'bullet') {
                flushList();
                currentList = { type: 'bullet', items: [itemText] };
              } else {
                currentList.items.push(itemText);
              }
              continue;
            }

            // Numbered Lists
            const numMatch = line.match(/^(\d+)\.\s+(.*)/);
            if (numMatch) {
              const itemText = numMatch[2];
              if (!currentList || currentList.type !== 'number') {
                flushList();
                currentList = { type: 'number', items: [itemText] };
              } else {
                currentList.items.push(itemText);
              }
              continue;
            }

            // Regular paragraph line
            flushList();
            structuredElements.push(
              <p
                key={`p-${structuredElements.length}`}
                className="text-base sm:text-lg leading-relaxed text-slate-700 dark:text-zinc-300 font-normal my-2"
              >
                {renderInlineMarkdown(line)}
              </p>
            );
          }

          flushList();

          return (
            <div key={`seg-${sIdx}`} className="space-y-2">
              {structuredElements}
            </div>
          );
        })}
      </div>
    );
  };

  const handleOpenArticle = (art) => {
    setComments([]);
    setCommentError("");
    setSelectedArticle(art);
  };

  const handleBackToFeed = () => {
    setComments([]);
    setCommentError("");
    setSelectedArticle(null);
  };

  // Fetch comments whenever a MongoDB article is opened
  useEffect(() => {
    const articleId = selectedArticle?.id;
    if (!articleId || !/^[0-9a-fA-F]{24}$/.test(articleId)) {
      return;
    }

    let isMounted = true;
    const loadComments = async () => {
      setIsLoadingComments(true);
      try {
        const response = await fetchArticleCommentsApi(articleId);
        const commentList = response.data || [];
        if (isMounted) {
          setComments(Array.isArray(commentList) ? commentList : []);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to load article comments:", err.message);
          setCommentError("Could not load comments.");
        }
      } finally {
        if (isMounted) {
          setIsLoadingComments(false);
        }
      }
    };

    loadComments();
    return () => {
      isMounted = false;
    };
  }, [selectedArticle?.id]);

  // Add new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmittingComment || !selectedArticle) return;

    if (!activeUser) {
      alert("Please sign in to join the discussion.");
      navigate("/login");
      return;
    }

    if (!/^[0-9a-fA-F]{24}$/.test(selectedArticle.id)) {
      const localComment = {
        _id: String(Date.now()),
        content: newComment.trim(),
        createdAt: new Date().toISOString(),
        user: {
          _id: activeUser?._id || "guest",
          name: activeUser?.name || "Anonymous",
          avatar: activeUser?.avatar || "",
        },
      };
      setComments((prev) => [localComment, ...prev]);
      setNewComment("");
      setSelectedArticle((prev) => ({
        ...prev,
        commentsCount: (prev.commentsCount || 0) + 1,
      }));
      setArticles((prev) =>
        prev.map((art) =>
          art.id === selectedArticle.id
            ? { ...art, commentsCount: (art.commentsCount || 0) + 1 }
            : art
        )
      );
      return;
    }

    setIsSubmittingComment(true);
    setCommentError("");
    try {
      const response = await createCommentApi(selectedArticle.id, newComment.trim());
      const createdComment = response.data;
      setComments((prev) => [createdComment, ...prev]);
      setNewComment("");
      setSelectedArticle((prev) => ({
        ...prev,
        commentsCount: (prev.commentsCount || 0) + 1,
      }));
      setArticles((prev) =>
        prev.map((art) =>
          art.id === selectedArticle.id
            ? { ...art, commentsCount: (art.commentsCount || 0) + 1 }
            : art
        )
      );
    } catch (err) {
      console.error("Failed to post comment:", err.message);
      setCommentError(err.message || "Failed to post comment");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  // Delete comment
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await deleteCommentApi(commentId);
      setComments((prev) => prev.filter((c) => (c._id || c.id) !== commentId));
      setSelectedArticle((prev) => ({
        ...prev,
        commentsCount: Math.max(0, (prev.commentsCount || 1) - 1),
      }));
      setArticles((prev) =>
        prev.map((art) =>
          art.id === selectedArticle.id
            ? { ...art, commentsCount: Math.max(0, (art.commentsCount || 1) - 1) }
            : art
        )
      );
    } catch (err) {
      console.error("Failed to delete comment:", err.message);
      alert(err.message || "Could not delete comment");
    }
  };

  // Real MongoDB Like handler with optimistic UI updates
  const toggleLike = async (id, e) => {
    if (e) e.stopPropagation();

    if (!activeUser) {
      alert("Please sign in to like articles.");
      navigate("/login");
      return;
    }

    // Optimistic toggle
    setArticles((prev) =>
      prev.map((art) =>
        art.id === id
          ? {
              ...art,
              claps: art.isLiked ? Math.max(0, art.claps - 1) : art.claps + 1,
              isLiked: !art.isLiked,
            }
          : art
      )
    );
    if (selectedArticle && selectedArticle.id === id) {
      setSelectedArticle((prev) => ({
        ...prev,
        claps: prev.isLiked ? Math.max(0, prev.claps - 1) : prev.claps + 1,
        isLiked: !prev.isLiked,
      }));
    }

    if (/^[0-9a-fA-F]{24}$/.test(id)) {
      try {
        const response = await toggleArticleLikeApi(id);
        const result = response.data;
        if (result && typeof result.likesCount === "number") {
          setArticles((prev) =>
            prev.map((art) =>
              art.id === id
                ? {
                    ...art,
                    claps: result.likesCount,
                    isLiked: result.isLiked,
                  }
                : art
            )
          );
          if (selectedArticle && selectedArticle.id === id) {
            setSelectedArticle((prev) => ({
              ...prev,
              claps: result.likesCount,
              isLiked: result.isLiked,
            }));
          }
        }
      } catch (err) {
        console.error("Failed to sync like with backend:", err.message);
        // Rollback optimistic update
        setArticles((prev) =>
          prev.map((art) =>
            art.id === id
              ? {
                  ...art,
                  claps: art.isLiked ? Math.max(0, art.claps - 1) : art.claps + 1,
                  isLiked: !art.isLiked,
                }
              : art
          )
        );
        if (selectedArticle && selectedArticle.id === id) {
          setSelectedArticle((prev) => ({
            ...prev,
            claps: prev.isLiked ? Math.max(0, prev.claps - 1) : prev.claps + 1,
            isLiked: !prev.isLiked,
          }));
        }
      }
    }
  };

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
      isPrivate: false,
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
  };


  // Bookmark handler
  const toggleBookmark = (id, e) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      try {
        localStorage.setItem("news_portal_bookmarks", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

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

  // Filter articles based on Bookmarks, Category, Search query & Public/Private visibility rules
  let filteredArticles = allArticles.filter((art) => {
    // 0. Bookmarks filter
    if (bookmarksOnly && !bookmarkedIds.includes(art.id)) {
      return false;
    }



    // 2. Category / Tag filter
    if (selectedCategory && selectedCategory !== "For You" && selectedCategory !== "All" && selectedCategory !== "Relevant") {
      const tagQuery = selectedCategory.replace(/^#/, "").toLowerCase().trim();
      const artCat = (art.category || "").toLowerCase().trim();
      const artTags = Array.isArray(art.tags) ? art.tags.map((t) => t.toLowerCase()) : [];
      const matchesCategory = artCat.includes(tagQuery);
      const matchesTags = artTags.some((t) => t.includes(tagQuery));
      const matchesTitle = (art.title || "").toLowerCase().includes(tagQuery);
      if (!matchesCategory && !matchesTags && !matchesTitle) {
        return false;
      }
    }

    // 3. Search query filter
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      art.title?.toLowerCase().includes(query) ||
      art.excerpt?.toLowerCase().includes(query) ||
      art.author?.toLowerCase().includes(query)
    );
  });

  if (exploreMode || feedSort === "top") {
    filteredArticles = [...filteredArticles].sort(
      (a, b) => ((b.claps || 0) + (b.viewsCount || 0) + (b.unicorns || 0)) - ((a.claps || 0) + (a.viewsCount || 0) + (a.unicorns || 0))
    );
  } else if (feedSort === "latest") {
    filteredArticles = [...filteredArticles].reverse();
  }

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
        } px-4 py-6 sm:px-6 max-w-7xl mx-auto w-full`}
      >
        {selectedArticle ? (
          /* Dedicated Article Page View */
          <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
            {/* Navigation & Actions Top Bar */}
            <div className="flex items-center justify-between pb-2">
              <button
                type="button"
                onClick={handleBackToFeed}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                  isDarkMode
                    ? "bg-zinc-800 hover:bg-zinc-700 text-zinc-200"
                    : "bg-white hover:bg-slate-100 text-slate-800 border border-slate-200"
                }`}
              >
                <FaArrowLeft className="h-3.5 w-3.5" />
                <span>Back to feed</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopiedShareLink(true);
                    setTimeout(() => setCopiedShareLink(false), 2000);
                  }}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                    isDarkMode
                      ? "border-zinc-800 bg-[#18181b] hover:bg-zinc-800 text-zinc-300"
                      : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700 shadow-xs"
                  }`}
                  title="Share article link"
                >
                  {copiedShareLink ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-emerald-500 font-bold">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="h-3.5 w-3.5" />
                      <span>Share</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={(e) => toggleLike(selectedArticle.id, e)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                    selectedArticle.isLiked
                      ? "bg-red-500/10 text-red-500 border-red-500/30 shadow-xs"
                      : isDarkMode
                      ? "border-zinc-800 bg-[#18181b] hover:text-red-500 text-zinc-300"
                      : "border-slate-200 bg-white hover:text-red-500 text-slate-700 shadow-xs"
                  }`}
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
                  className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                    selectedArticle.isBookmarked
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                      : isDarkMode
                      ? "border-zinc-800 bg-[#18181b] text-zinc-400 hover:text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:text-slate-900 shadow-xs"
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

            {/* Dedicated Article Card Container with Background */}
            <article
              className={`rounded-3xl border transition-all p-6 sm:p-10 md:p-12 space-y-8 shadow-sm ${
                isDarkMode
                  ? "bg-[#18181b] border-zinc-800 text-white"
                  : "bg-white border-slate-200/90 text-slate-900"
              }`}
            >
              {/* Category & Tags Header */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <FaHashtag className="w-2.5 h-2.5" />
                  {selectedArticle.category || 'Developer Note'}
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-800/60">
                  <Clock className="w-3 h-3" />
                  {selectedArticle.readTime || '3 min read'}
                </span>
                {Array.isArray(selectedArticle.tags) && selectedArticle.tags.map((t, tidx) => (
                  <span
                    key={tidx}
                    className="text-xs font-medium text-slate-500 dark:text-zinc-400 hover:text-emerald-500 transition-colors"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
                {selectedArticle.title}
              </h1>

              {/* Author Metadata Bar */}
              <div className="flex items-center justify-between py-4 border-y border-slate-100 dark:border-zinc-800/80">
                <div className="flex items-center gap-3.5">
                  {selectedArticle.authorAvatar && typeof selectedArticle.authorAvatar === 'string' && selectedArticle.authorAvatar.startsWith('http') ? (
                    <img
                      src={selectedArticle.authorAvatar}
                      alt={selectedArticle.author || 'Author'}
                      className="h-11 w-11 rounded-full object-cover shrink-0 border-2 border-emerald-500/30"
                    />
                  ) : (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-bold bg-emerald-500 text-white shadow-sm ring-2 ring-emerald-500/20">
                      {(selectedArticle.author || 'Author').substring(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      {selectedArticle.author || 'Community Member'}
                    </h4>
                    <p
                      className={`text-xs ${
                        isDarkMode ? "text-zinc-400" : "text-slate-500"
                      }`}
                    >
                      {selectedArticle.authorHandle || '@developer'} • {selectedArticle.publishedAt || 'Recently'}
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Community Note
                  </span>
                </div>
              </div>

              {/* Cover Image */}
              {selectedArticle.coverImage && (
                <div className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-zinc-800 shadow-xs">
                  <img
                    src={selectedArticle.coverImage}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Structured Note Content */}
              <div className="py-2">
                {renderDevContent(selectedArticle.content)}
              </div>

              {/* Engagement Reaction Bar inside card */}
              <div
                className={`flex items-center justify-between pt-6 border-t ${
                  isDarkMode
                    ? "border-zinc-800/80 text-zinc-300"
                    : "border-slate-100 text-slate-700"
                }`}
              >
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={(e) => toggleLike(selectedArticle.id, e)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      selectedArticle.isLiked
                        ? "bg-red-500/10 text-red-500 border border-red-500/30 shadow-xs"
                        : isDarkMode
                        ? "bg-zinc-800/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/60"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-xs"
                    }`}
                  >
                    {selectedArticle.isLiked ? (
                      <FaHeart className="h-4 w-4 text-red-500 animate-pulse" />
                    ) : (
                      <FaRegHeart className="h-4 w-4" />
                    )}
                    <span>
                      {selectedArticle.claps} {selectedArticle.claps === 1 ? "like" : "likes"}
                    </span>
                  </button>

                  <a
                    href="#comments-section"
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-colors ${
                      isDarkMode
                        ? "bg-zinc-800/80 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-700/60"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border border-slate-200"
                    }`}
                  >
                    <FaRegComment className="h-4 w-4" />
                    <span>
                      {comments.length} {comments.length === 1 ? "comment" : "comments"}
                    </span>
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => toggleBookmark(selectedArticle.id, e)}
                    className={`p-2.5 rounded-2xl border transition-colors cursor-pointer ${
                      selectedArticle.isBookmarked
                        ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-500"
                        : isDarkMode
                        ? "border-zinc-800 text-zinc-400 hover:text-white bg-zinc-800/50"
                        : "border-slate-200 text-slate-600 hover:text-slate-900 bg-slate-50"
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
            </article>

            {/* Discussion & Comments Thread */}
            <section id="comments-section" className="space-y-6 pt-2">
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-5 h-5 text-emerald-500" />
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Responses ({comments.length})
                </h3>
              </div>

                {/* Comment Input Form */}
                {activeUser ? (
                  <form
                    onSubmit={handleAddComment}
                    className={`rounded-3xl border p-5 transition-all space-y-3 ${
                      isDarkMode
                        ? "bg-[#18181b] border-zinc-800 focus-within:border-emerald-500/60 shadow-lg"
                        : "bg-white border-slate-200 focus-within:border-emerald-500/60 shadow-xs"
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold bg-emerald-500 text-white shadow-xs">
                        {(activeUser?.name || "You").substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 space-y-3">
                        <textarea
                          rows={3}
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="What are your thoughts? Join the conversation..."
                          className={`w-full bg-transparent resize-none text-sm outline-none placeholder:text-xs sm:placeholder:text-sm ${
                            isDarkMode
                              ? "text-white placeholder-zinc-500"
                              : "text-slate-900 placeholder-slate-400"
                          }`}
                        />
                        {commentError && (
                          <p className="text-xs text-red-500 font-medium">{commentError}</p>
                        )}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-zinc-800/80">
                          <span
                            className={`text-[11px] ${
                              isDarkMode ? "text-zinc-500" : "text-slate-400"
                            }`}
                          >
                            Sharing as{" "}
                            <span className="font-semibold text-emerald-500">
                              {activeUser?.name || activeUser?.email}
                            </span>
                          </span>
                          <button
                            type="submit"
                            disabled={!newComment.trim() || isSubmittingComment}
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm active:scale-95"
                          >
                            <FaPaperPlane className="h-3 w-3" />
                            <span>{isSubmittingComment ? "Posting..." : "Respond"}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div
                    className={`rounded-3xl border p-6 text-center space-y-3 ${
                      isDarkMode
                        ? "bg-[#18181b] border-zinc-800 text-zinc-400"
                        : "bg-white border-slate-200 text-slate-600 shadow-xs"
                    }`}
                  >
                    <p className="text-sm font-medium">
                      Sign in to join the discussion and share your thoughts.
                    </p>
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all cursor-pointer shadow-xs"
                    >
                      Sign In to Comment
                    </button>
                  </div>
                )}

                {/* Comments List */}
                <div className="space-y-3 pt-2">
                  {isLoadingComments ? (
                    <div
                      className={`p-8 text-center text-xs font-medium ${
                        isDarkMode ? "text-zinc-500" : "text-slate-400"
                      }`}
                    >
                      Loading responses...
                    </div>
                  ) : comments.length === 0 ? (
                    <div
                      className={`p-8 rounded-3xl border text-center text-xs sm:text-sm font-medium ${
                        isDarkMode
                          ? "bg-[#18181b]/50 border-zinc-800/60 text-zinc-500"
                          : "bg-slate-50 border-slate-200/60 text-slate-400"
                      }`}
                    >
                      There are no responses yet. Be the first to share your thoughts!
                    </div>
                  ) : (
                    comments.map((c) => {
                      const commentAuthorId =
                        c.user?._id?.toString() ||
                        c.user?.id?.toString() ||
                        c.user?.toString();
                      const currentUserId =
                        activeUser?._id?.toString() ||
                        activeUser?.id?.toString();
                      const isCommentAuthor =
                        activeUser &&
                        (commentAuthorId === currentUserId ||
                          activeUser.role === "admin");

                      return (
                        <div
                          key={c._id || c.id}
                          className={`rounded-2xl border p-4 sm:p-5 space-y-3 transition-colors ${
                            isDarkMode
                              ? "bg-[#18181b] border-zinc-800/80"
                              : "bg-white border-slate-200/80 shadow-2xs"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {c.user?.avatar &&
                              typeof c.user.avatar === "string" &&
                              c.user.avatar.startsWith("http") ? (
                                <img
                                  src={c.user.avatar}
                                  alt={c.user?.name || "User"}
                                  className="h-8 w-8 rounded-full object-cover shrink-0 border border-slate-200 dark:border-zinc-700"
                                />
                              ) : (
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold bg-emerald-500 text-white shadow-xs">
                                  {(c.user?.name || "User").substring(0, 2).toUpperCase()}
                                </div>
                              )}
                              <div>
                                <h5 className="font-semibold text-xs sm:text-sm">
                                  {c.user?.name || "Anonymous User"}
                                </h5>
                                <span
                                  className={`text-[11px] ${
                                    isDarkMode ? "text-zinc-500" : "text-slate-400"
                                  }`}
                                >
                                  {c.createdAt
                                    ? new Date(c.createdAt).toLocaleDateString(undefined, {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric",
                                      })
                                    : "Recently"}
                                </span>
                              </div>
                            </div>

                            {isCommentAuthor && (
                              <button
                                type="button"
                                onClick={() => handleDeleteComment(c._id || c.id)}
                                title="Delete response"
                                className={`p-2 rounded-lg text-xs transition-colors cursor-pointer ${
                                  isDarkMode
                                    ? "text-zinc-500 hover:text-red-400 hover:bg-zinc-800"
                                    : "text-slate-400 hover:text-red-500 hover:bg-slate-100"
                                }`}
                              >
                                <FaTrash className="h-3 w-3" />
                              </button>
                            )}
                          </div>

                          <p
                            className={`text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                              isDarkMode ? "text-zinc-300" : "text-slate-700"
                            }`}
                          >
                            {c.content}
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>
              </section>
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
                  placeholder="Search articles, code architectures, dev tags (#react, #ai)..."
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
                      <X className="w-3.5 h-3.5" />
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

              {/* Write Post Button on Right Side of Search Bar */}
              <button
                type="button"
                onClick={() => navigate('/create')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
              >
                <FaPen className="h-3.5 w-3.5" />
                <span>Write Post</span>
              </button>
            </div>

            {/* Split Grid: Feed Stream on Left + Dev Community Widgets on Right */}
            <div className="flex gap-8 items-start w-full">
              <div className="flex-1 min-w-0 space-y-4">
                <div className="pb-1 flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <h2
                      className={`text-xl font-extrabold tracking-tight ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {bookmarksOnly
                        ? `Reading List (${filteredArticles.length})`
                        : myNotesOnly
                        ? `My Posts & Drafts (${filteredArticles.length})`
                        : exploreMode
                        ? `Trending Stories (${filteredArticles.length})`
                        : `Developer Community Feed (${filteredArticles.length})`}
                    </h2>

                    {/* Sub-Sort Tabs (Relevant / Latest / Top) */}
                    <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-200/60 dark:bg-zinc-800/60 border border-slate-300/40 dark:border-zinc-700/40 self-start sm:self-auto">
                      <button
                        type="button"
                        onClick={() => setFeedSort("relevant")}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          feedSort === "relevant"
                            ? "bg-white dark:bg-zinc-900 text-emerald-500 shadow-xs font-extrabold"
                            : isDarkMode ? "text-zinc-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Relevant</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFeedSort("latest")}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          feedSort === "latest"
                            ? "bg-white dark:bg-zinc-900 text-emerald-500 shadow-xs font-extrabold"
                            : isDarkMode ? "text-zinc-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5 text-cyan-500" />
                        <span>Latest</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFeedSort("top")}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          feedSort === "top"
                            ? "bg-white dark:bg-zinc-900 text-emerald-500 shadow-xs font-extrabold"
                            : isDarkMode ? "text-zinc-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
                        }`}
                      >
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        <span>Top</span>
                      </button>
                    </div>
                  </div>

                  {/* Dev Tag Pills Bar */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1 rounded-full text-xs font-mono font-semibold whitespace-nowrap transition-all cursor-pointer ${
                          selectedCategory === cat
                            ? "bg-emerald-500 text-white shadow-xs font-bold"
                            : isDarkMode
                            ? "bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700"
                            : "bg-slate-200/80 text-slate-700 hover:bg-slate-300"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
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
                    {bookmarksOnly
                      ? "You haven't bookmarked any notes yet. Click the bookmark icon on any article to save it for later!"
                      : myNotesOnly
                      ? "You haven't written any notes yet. Create your first note now!"
                      : "No articles found matching your criteria."}
                  </p>
                  <button
                    type="button"
                    onClick={() => (bookmarksOnly ? setSelectedCategory("For You") : navigate('/create'))}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all cursor-pointer"
                  >
                    {bookmarksOnly ? (
                      <span>Browse Feed</span>
                    ) : (
                      <>
                        <FaPlus className="h-3.5 w-3.5" />
                        <span>Create Your First Note</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                filteredArticles.map((art) => (
                  <article
                    key={art.id}
                    onClick={() => handleOpenArticle(art)}
                    className={`rounded-3xl border p-6 space-y-4 cursor-pointer ${
                      isDarkMode
                        ? "bg-[#18181b] border-zinc-800/80 text-zinc-200 shadow-md"
                        : "bg-white border-slate-200/80 text-slate-800 shadow-xs"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 sm:gap-6">
                      {/* Left Column: Author, Title & Excerpt */}
                      <div className="flex-1 min-w-0 space-y-3">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
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
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span
                              className={`font-bold ${
                                isDarkMode ? "text-zinc-200" : "text-slate-800"
                              }`}
                            >
                              {art.author}
                            </span>
                            {art.authorHandle && (
                              <span className="font-mono text-zinc-500 text-[11px]">
                                {art.authorHandle}
                              </span>
                            )}
                            {art.authorTitle && (
                              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] bg-slate-200/60 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-medium">
                                {art.authorTitle}
                              </span>
                            )}
                          </div>
                          <span className={isDarkMode ? "text-zinc-600" : "text-slate-300"}>
                            •
                          </span>
                          <span className={isDarkMode ? "text-zinc-400" : "text-slate-500"}>
                            {art.publishedAt}
                          </span>
                          {art.readTime && (
                            <>
                              <span className={isDarkMode ? "text-zinc-600" : "text-slate-300"}>
                                •
                              </span>
                              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-400">
                                <Clock className="w-3 h-3" />
                                {art.readTime}
                              </span>
                            </>
                          )}
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

                        {/* Tech Tag Pills */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-1">
                          {(art.tags || [art.category || 'dev']).map((tag) => (
                            <span
                              key={tag}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCategory(`#${tag.replace(/^#/, '')}`);
                              }}
                              className="px-2 py-0.5 rounded-md font-mono text-[11px] font-semibold bg-slate-100 hover:bg-emerald-500/10 hover:text-emerald-500 dark:bg-zinc-800/80 dark:hover:bg-emerald-500/20 text-slate-600 dark:text-zinc-400 transition-colors cursor-pointer"
                            >
                              #{tag.replace(/^#/, '')}
                            </span>
                          ))}
                        </div>
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
                      <div className="flex items-center gap-4 sm:gap-6">
                        <button
                          type="button"
                          onClick={(e) => toggleLike(art.id, e)}
                          className="flex items-center gap-1.5 hover:text-red-500 transition-colors cursor-pointer group"
                          title="Like post"
                        >
                          {art.isLiked ? (
                            <FaHeart className="h-3.5 w-3.5 text-red-500 group-hover:scale-110 transition-transform" />
                          ) : (
                            <FaRegHeart className="h-3.5 w-3.5 group-hover:scale-110 transition-transform" />
                          )}
                          <span>{art.claps}</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setArticles((prev) =>
                              prev.map((a) =>
                                a.id === art.id
                                  ? {
                                      ...a,
                                      unicorns: a.isUnicorned ? (a.unicorns || 1) - 1 : (a.unicorns || 0) + 1,
                                      isUnicorned: !a.isUnicorned,
                                    }
                                  : a
                              )
                            );
                          }}
                          className="flex items-center gap-1 hover:scale-110 transition-transform cursor-pointer"
                          title="Unicorn reaction"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                          <span>{art.unicorns || 0}</span>
                        </button>

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

                              {(currentUser && (
                                (art.authorId && (art.authorId === currentUser._id || art.authorId === currentUser.id || String(art.authorId) === String(currentUser._id))) ||
                                (art.authorEmail && currentUser.email && art.authorEmail.toLowerCase() === currentUser.email.toLowerCase()) ||
                                (art.author && currentUser.name && art.author.trim().toLowerCase() === currentUser.name.trim().toLowerCase())
                              )) ? (
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

            {/* Dev Community Right Rail */}
            <aside className="hidden xl:flex flex-col gap-5 w-80 shrink-0 sticky top-6">
              {/* Widget 1: Watercooler Discussions */}
              <div
                className={`rounded-3xl border p-5 space-y-3.5 shadow-xs ${
                  isDarkMode
                    ? "bg-[#18181b] border-zinc-800 text-zinc-200"
                    : "bg-white border-slate-200 text-slate-800"
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-xl bg-purple-500/10 text-purple-500">
                      <FaComments className="h-3.5 w-3.5" />
                    </span>
                    <h3 className="font-bold text-sm">#discuss</h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 font-bold">
                    Watercooler
                  </span>
                </div>
                <div className="space-y-3 text-xs">
                  <div
                    onClick={() => navigate("/discussions")}
                    className="group cursor-pointer space-y-1 hover:text-emerald-500 transition-colors"
                  >
                    <p className="font-medium line-clamp-2">
                      What's your go-to state management pattern in React 19?
                    </p>
                    <span className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-mono">
                      <MessageSquare className="w-3 h-3 text-emerald-500" /> 42 comments • 3h ago
                    </span>
                  </div>
                  <div
                    onClick={() => navigate("/discussions")}
                    className="group cursor-pointer space-y-1 hover:text-emerald-500 transition-colors"
                  >
                    <p className="font-medium line-clamp-2">
                      Are you using Docker Desktop or Podman on Windows in 2026?
                    </p>
                    <span className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-mono">
                      <MessageSquare className="w-3 h-3 text-emerald-500" /> 28 comments • 5h ago
                    </span>
                  </div>
                  <div
                    onClick={() => navigate("/discussions")}
                    className="group cursor-pointer space-y-1 hover:text-emerald-500 transition-colors"
                  >
                    <p className="font-medium line-clamp-2">
                      Rank your favorite AI coding assistants: Cursor, Copilot, or Agy?
                    </p>
                    <span className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-mono">
                      <MessageSquare className="w-3 h-3 text-emerald-500" /> 65 comments • 8h ago
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/discussions")}
                  className="w-full mt-1 py-2 text-center text-xs font-bold text-emerald-500 hover:text-emerald-400 hover:bg-emerald-500/5 rounded-xl transition-colors cursor-pointer"
                >
                  View All Discussions →
                </button>
              </div>

              {/* Widget 2: Trending Developer Tags */}
              <div
                className={`rounded-3xl border p-5 space-y-3.5 shadow-xs ${
                  isDarkMode
                    ? "bg-[#18181b] border-zinc-800 text-zinc-200"
                    : "bg-white border-slate-200 text-slate-800"
                }`}
              >
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-zinc-800">
                  <span className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-500">
                    <FaHashtag className="h-3.5 w-3.5" />
                  </span>
                  <h3 className="font-bold text-sm">Trending Tags</h3>
                </div>
                <div className="flex flex-col gap-2 text-xs">
                  {[
                    { tag: "#javascript", count: "4.2k posts" },
                    { tag: "#react", count: "3.8k posts" },
                    { tag: "#typescript", count: "2.9k posts" },
                    { tag: "#python", count: "2.4k posts" },
                    { tag: "#ai", count: "1.9k posts" },
                    { tag: "#devops", count: "1.2k posts" },
                  ].map((item) => (
                    <button
                      key={item.tag}
                      type="button"
                      onClick={() => setSelectedCategory(item.tag)}
                      className="flex items-center justify-between py-1 px-2 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800/80 transition-colors text-left cursor-pointer group"
                    >
                      <span className="font-mono font-bold text-slate-700 dark:text-zinc-300 group-hover:text-emerald-500">
                        {item.tag}
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-zinc-500 font-mono">
                        {item.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Widget 3: Top Contributors Leaderboard */}
              <div
                className={`rounded-3xl border p-5 space-y-3.5 shadow-xs ${
                  isDarkMode
                    ? "bg-[#18181b] border-zinc-800 text-zinc-200"
                    : "bg-white border-slate-200 text-slate-800"
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-xl bg-amber-500/10 text-amber-500">
                      <FaTrophy className="h-3.5 w-3.5" />
                    </span>
                    <h3 className="font-bold text-sm">Top Contributors</h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-bold">
                    This Week
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      name: "Alex Rivers",
                      handle: "@alex_rivers",
                      rep: "2,480",
                      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
                    },
                    {
                      name: "Sarah Chen",
                      handle: "@schen_dev",
                      rep: "1,940",
                      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
                    },
                    {
                      name: "David Kim",
                      handle: "@david_ai",
                      rep: "1,520",
                      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
                    },
                  ].map((c) => (
                    <div key={c.handle} className="flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img
                          src={c.avatar}
                          alt={c.name}
                          className="h-8 w-8 rounded-full object-cover shrink-0 border border-slate-200 dark:border-zinc-700"
                        />
                        <div className="min-w-0">
                          <p className="font-bold truncate text-slate-800 dark:text-zinc-200">
                            {c.name}
                          </p>
                          <p className="flex items-center gap-1 text-[11px] text-zinc-500 font-mono">
                            <Zap className="w-3 h-3 text-amber-400" /> {c.rep} Rep
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => toggleFollow(c.handle, e)}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition-colors cursor-pointer shrink-0 ${
                          followedWriters[c.handle]
                            ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-500"
                            : isDarkMode
                            ? "bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white hover:bg-zinc-700"
                            : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {followedWriters[c.handle] ? "Following" : "Follow"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Widget 4: Global Hackathon 2026 Card */}
              <div className="rounded-3xl p-5 bg-gradient-to-br from-emerald-600 via-teal-700 to-zinc-900 text-white shadow-xl space-y-3 relative overflow-hidden border border-emerald-500/30">
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-emerald-400/20 rounded-full blur-2xl" />
                <div className="flex items-center gap-2">
                  <FaRocket className="h-4 w-4 text-emerald-300" />
                  <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-emerald-300">
                    OVERSTACK Hackathon
                  </span>
                </div>
                <h4 className="font-extrabold text-base leading-tight">
                  Global Dev Challenge 2026
                </h4>
                <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">
                  $50,000 in prizes. Build open-source AI tooling & edge dev frameworks.
                </p>
                <button
                  type="button"
                  onClick={() => navigate("/showdev")}
                  className="w-full py-2 px-3 rounded-xl bg-white text-zinc-900 font-extrabold text-xs shadow-md hover:bg-emerald-50 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Register Squad</span>
                  <FaExternalLinkAlt className="h-2.5 w-2.5 text-zinc-700" />
                </button>
              </div>
            </aside>
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
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
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
