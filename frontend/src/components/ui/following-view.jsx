import { useState } from 'react';
import {
  Users,
  UserCheck,
  UserPlus,
  Clock,
  Sparkles,
  MessageSquare,
  Heart,
  Bookmark,
  Copy,
  Check,
  Search,
  X,
  Terminal,
  BookOpen,
} from 'lucide-react';

const DEFAULT_FOLLOWED_DEVS = [
  {
    id: 'dev-sarah',
    name: 'Sarah Chen',
    handle: 'sarah_frontend',
    role: 'Staff UI Architect',
    company: 'CloudScale',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    bio: 'Specializing in React internals, micro-frontends, and sub-millisecond web performance.',
    tags: ['react', 'typescript', 'web-perf', 'nextjs'],
    followersCount: 1420,
    followingCount: 184,
    notesCount: 28,
    repScore: 4820,
    isFollowing: true,
    notes: [
      {
        id: 'note-sarah-1',
        title: 'Deep-dive: Fine-grained React 19 Actions & Optimistic UI Patterns',
        excerpt: 'How the new useActionState and useOptimistic hooks simplify high-concurrency state transitions without tearing.',
        readTime: '6 min read',
        publishedAt: '2h ago',
        tags: ['react', 'typescript', 'frontend'],
        likes: 142,
        bookmarks: 56,
        commentsCount: 19,
        isLiked: false,
        isBookmarked: false,
        codeSnippet: `// Optimistic state updates with React 19
import { useOptimistic, useTransition } from 'react';

export function CommentThread({ initialComments, addCommentAction }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticComments, setOptimistic] = useOptimistic(
    initialComments,
    (state, newText) => [...state, { id: 'temp', text: newText, pending: true }]
  );

  const handleSubmit = async (formData) => {
    const text = formData.get('comment');
    startTransition(async () => {
      setOptimistic(text);
      await addCommentAction(text);
    });
  };

  return <form action={handleSubmit}>...</form>;
}`,
        content: `React 19 introduces formal primitives for managing asynchronous transitions and optimistic state. Instead of juggling manual pending flags and rollback effects, useActionState and useOptimistic provide an atomic contract.\n\n### Core Invariants\n1. Optimistic updates automatically revert if the server action rejects.\n2. Async transitions prioritize urgent user typing events while keeping UI responsive.\n3. Form actions integrate seamlessly with server components.`,
      },
      {
        id: 'note-sarah-2',
        title: 'Building High-Frame-Rate Virtualized Grids with Canvas & WebGL',
        excerpt: 'Techniques for rendering 500,000 tabular cells with smooth 120fps scrolling and instant filtering.',
        readTime: '9 min read',
        publishedAt: '1d ago',
        tags: ['canvas', 'performance', 'webgl'],
        likes: 98,
        bookmarks: 41,
        commentsCount: 12,
        isLiked: false,
        isBookmarked: false,
        content: `Standard DOM-based virtualization tables hit rendering bottlenecks beyond 10,000 active rows due to excessive layout recalculations. By offloading rendering to an offscreen Canvas with WebGL shaders, we achieve constant-time 120fps scrolling.`,
      },
    ],
  },
  {
    id: 'dev-marcus',
    name: 'Marcus Vance',
    handle: 'marcus_dist',
    role: 'Principal Distributed Systems Engineer',
    company: 'NexusDB',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Distributed consensus enthusiast. Raft, Paxos, distributed transactions, and low-latency RPC.',
    tags: ['go', 'kubernetes', 'grpc', 'distributed-systems'],
    followersCount: 2890,
    followingCount: 310,
    notesCount: 34,
    repScore: 6190,
    isFollowing: true,
    notes: [
      {
        id: 'note-marcus-1',
        title: 'Implementing Raft Consensus in Go: Handling Leader Leases & Log Compaction',
        excerpt: 'Practical engineering lessons learned when running a production Raft implementation across 3 geo-distributed regions.',
        readTime: '12 min read',
        publishedAt: '4h ago',
        tags: ['go', 'distributed-systems', 'consensus'],
        likes: 215,
        bookmarks: 88,
        commentsCount: 34,
        isLiked: false,
        isBookmarked: false,
        codeSnippet: `// Raft Leader Lease Verification in Go
func (r *RaftNode) processHeartbeat(ctx context.Context, term uint64) error {
    r.mu.Lock()
    defer r.mu.Unlock()

    if term < r.currentTerm {
        return ErrStaleTerm
    }

    // Extend lease window based on monotonic clock
    r.leaseExpiry = time.Now().Add(r.leaseDuration)
    r.state = StateFollower
    return nil
}`,
        content: `When deploying Raft consensus across geo-distributed nodes, split-brain mitigation and read-index verification are critical to prevent stale reads. Leader leases reduce RPC overhead by granting a timed read window.`,
      },
      {
        id: 'note-marcus-2',
        title: 'Zero-Downtime Schema Migrations in Distributed Multi-Master Databases',
        excerpt: 'A multi-phase protocol for renaming columns and altering indexes without holding table locks.',
        readTime: '7 min read',
        publishedAt: '2d ago',
        tags: ['database', 'distributed-systems', 'architecture'],
        likes: 167,
        bookmarks: 72,
        commentsCount: 22,
        isLiked: false,
        isBookmarked: false,
        content: `Traditional ALTER TABLE statements can cause deadlocks on high-throughput OLTP systems. Using the expand/contract design pattern ensures that backwards-compatible clients continue executing writes concurrently.`,
      },
    ],
  },
  {
    id: 'dev-elena',
    name: 'Elena Rostova',
    handle: 'elena_ai',
    role: 'Senior AI Systems Researcher',
    company: 'Autonomous Labs',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Agentic workflows, model alignment, speculative decoding, and scalable inference infrastructure.',
    tags: ['python', 'ai-agents', 'llm', 'machine-learning'],
    followersCount: 3120,
    followingCount: 245,
    notesCount: 42,
    repScore: 5430,
    isFollowing: true,
    notes: [
      {
        id: 'note-elena-1',
        title: 'Building Deterministic Autonomous Agent Swarms with Structured Schema Outputs',
        excerpt: 'How to constrain LLM tool execution using JSON schema validation to guarantee 99.9% tool invocation reliability.',
        readTime: '8 min read',
        publishedAt: '6h ago',
        tags: ['python', 'ai-agents', 'llm'],
        likes: 189,
        bookmarks: 94,
        commentsCount: 27,
        isLiked: false,
        isBookmarked: false,
        codeSnippet: `from pydantic import BaseModel, Field
from typing import List

class AgentExecutionPlan(BaseModel):
    step_id: int = Field(..., description="Chronological sequence index")
    tool_name: str = Field(..., description="Whitelisted deterministic tool identifier")
    arguments: dict = Field(default_factory=dict)
    fallback_strategy: str = Field("retry_exponential_backoff")

# Guaranteed syntax conformance via schema enforcement`,
        content: `Unconstrained generative agents suffer from hallucinated tool schemas and invalid JSON arguments. By enforcing grammar-based logits masking and strict Pydantic validation, agent pipelines achieve industrial reliability.`,
      },
    ],
  },
];

const DISCOVER_DEVS = [
  {
    id: 'dev-david',
    name: 'David Kim',
    handle: 'david_cloud',
    role: 'Platform Engineering Lead',
    company: 'Skyline Cloud',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    bio: 'Kubernetes operator patterns, Terraform CDKTF, eBPF network observability, and multi-cloud infra.',
    tags: ['devops', 'kubernetes', 'terraform', 'ebpf'],
    followersCount: 1890,
    followingCount: 195,
    notesCount: 19,
    repScore: 3940,
    isFollowing: false,
    notes: [
      {
        id: 'note-david-1',
        title: 'CDKTF Infrastructure as Code: Type-Safe Cloud Architecture at Scale',
        excerpt: 'Migrating 400 HCL modules to TypeScript CDKTF for verified CI/CD validation before plan execution.',
        readTime: '6 min read',
        publishedAt: '3d ago',
        tags: ['terraform', 'devops', 'typescript'],
        likes: 88,
        bookmarks: 35,
        commentsCount: 11,
        isLiked: false,
        isBookmarked: false,
      },
    ],
  },
  {
    id: 'dev-maya',
    name: 'Maya Patel',
    handle: 'maya_rust',
    role: 'Systems & Kernel Engineer',
    company: 'VectorOS',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    bio: 'Writing blazingly fast systems software. Rust, WebAssembly, zero-copy networking, and Tokio runtimes.',
    tags: ['rust', 'wasm', 'performance', 'systems'],
    followersCount: 4210,
    followingCount: 180,
    notesCount: 31,
    repScore: 7210,
    isFollowing: false,
    notes: [
      {
        id: 'note-maya-1',
        title: 'High-Throughput Asynchronous HTTP Proxies with Rust & Tokio',
        excerpt: 'Achieving 1.2M req/sec with zero memory allocations using custom ring buffers and io_uring.',
        readTime: '10 min read',
        publishedAt: '1d ago',
        tags: ['rust', 'systems', 'networking'],
        likes: 278,
        bookmarks: 140,
        commentsCount: 45,
        isLiked: false,
        isBookmarked: false,
      },
    ],
  },
];

export function FollowingView({
  isDarkMode = false,
  initialDevHandle = null,
}) {
  const [developers, setDevelopers] = useState(() => {
    try {
      const saved = localStorage.getItem('overstack_followed_users');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [...DEFAULT_FOLLOWED_DEVS, ...DISCOVER_DEVS];
  });

  const [activeTab, setActiveTab] = useState('feed'); // 'feed' | 'following' | 'discover'
  const [selectedAuthorFilter, setSelectedAuthorFilter] = useState(initialDevHandle || 'all');
  const [prevInitialDevHandle, setPrevInitialDevHandle] = useState(initialDevHandle);
  if (prevInitialDevHandle !== initialDevHandle) {
    setPrevInitialDevHandle(initialDevHandle);
    setSelectedAuthorFilter(initialDevHandle || 'all');
    setActiveTab('feed');
  }
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedNoteId, setCopiedNoteId] = useState(null);
  const [selectedNoteForModal, setSelectedNoteForModal] = useState(null);

  // Sync state to localStorage
  const saveDevelopers = (updated) => {
    setDevelopers(updated);
    try {
      localStorage.setItem('overstack_followed_users', JSON.stringify(updated));
      window.dispatchEvent(new Event('following_updated'));
    } catch {
      // storage error handling
    }
  };

  const followedDevs = developers.filter((d) => d.isFollowing);
  const discoverDevs = developers.filter((d) => !d.isFollowing);

  // Toggle follow/unfollow
  const handleToggleFollow = (devId) => {
    const updated = developers.map((d) => {
      if (d.id === devId) {
        const nextState = !d.isFollowing;
        return {
          ...d,
          isFollowing: nextState,
          followersCount: nextState ? d.followersCount + 1 : Math.max(0, d.followersCount - 1),
        };
      }
      return d;
    });
    saveDevelopers(updated);
  };

  // Aggregate all notes from followed devs
  const followedNotes = followedDevs.flatMap((dev) =>
    (dev.notes || []).map((note) => ({
      ...note,
      authorId: dev.id,
      authorName: dev.name,
      authorHandle: dev.handle,
      authorAvatar: dev.avatar,
      authorRole: dev.role,
      authorCompany: dev.company,
      authorRep: dev.repScore,
    }))
  );

  // Filter notes by search query and author filter
  const filteredNotes = followedNotes.filter((note) => {
    if (selectedAuthorFilter !== 'all' && note.authorHandle !== selectedAuthorFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = note.title.toLowerCase().includes(q);
      const matchExcerpt = (note.excerpt || '').toLowerCase().includes(q);
      const matchTags = (note.tags || []).some((t) => t.toLowerCase().includes(q));
      const matchAuthor = note.authorName.toLowerCase().includes(q) || note.authorHandle.toLowerCase().includes(q);
      if (!matchTitle && !matchExcerpt && !matchTags && !matchAuthor) return false;
    }
    return true;
  });

  // Toggle like on note
  const handleToggleLike = (noteId) => {
    const updated = developers.map((dev) => ({
      ...dev,
      notes: (dev.notes || []).map((note) => {
        if (note.id === noteId) {
          const isLiked = !note.isLiked;
          return {
            ...note,
            isLiked,
            likes: isLiked ? (note.likes || 0) + 1 : Math.max(0, (note.likes || 0) - 1),
          };
        }
        return note;
      }),
    }));
    saveDevelopers(updated);
  };

  // Toggle bookmark on note
  const handleToggleBookmark = (noteId) => {
    const updated = developers.map((dev) => ({
      ...dev,
      notes: (dev.notes || []).map((note) => {
        if (note.id === noteId) {
          const isBookmarked = !note.isBookmarked;
          return {
            ...note,
            isBookmarked,
            bookmarks: isBookmarked ? (note.bookmarks || 0) + 1 : Math.max(0, (note.bookmarks || 0) - 1),
          };
        }
        return note;
      }),
    }));
    saveDevelopers(updated);
  };

  // Copy code snippet
  const handleCopyCode = (code, noteId) => {
    navigator.clipboard.writeText(code);
    setCopiedNoteId(noteId);
    setTimeout(() => setCopiedNoteId(null), 2000);
  };

  const currentFilteredAuthor = selectedAuthorFilter !== 'all'
    ? developers.find((d) => d.handle === selectedAuthorFilter)
    : null;

  return (
    <div className={`p-4 sm:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-200 ${
      isDarkMode ? 'text-zinc-200' : 'text-slate-800'
    }`}>
      {/* Top Banner */}
      <div className={`rounded-3xl border p-6 sm:p-8 relative overflow-hidden transition-all ${
        isDarkMode
          ? 'bg-gradient-to-br from-zinc-900 via-[#18181b] to-zinc-950 border-zinc-800'
          : 'bg-gradient-to-br from-white via-slate-50 to-emerald-50/20 border-slate-200 shadow-xs'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <UserCheck className="w-3.5 h-3.5" />
              <span>{currentFilteredAuthor ? `@${currentFilteredAuthor.handle.toUpperCase()}` : 'FOLLOWING NETWORK'}</span>
            </div>
            <h1 className={`text-2xl sm:text-4xl font-black tracking-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}>
              {currentFilteredAuthor ? `${currentFilteredAuthor.name}'s Notes` : 'Following Feed'}
            </h1>
            <p className={`text-xs sm:text-sm leading-relaxed ${
              isDarkMode ? 'text-zinc-400' : 'text-slate-600'
            }`}>
              {currentFilteredAuthor
                ? `${currentFilteredAuthor.role} • ${currentFilteredAuthor.company}. Showing notes and code published by @${currentFilteredAuthor.handle}.`
                : 'Live stream of technical notes, architectural writeups, and reproducible code snippets published exclusively by developers you follow.'}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className={`p-4 rounded-2xl border text-center min-w-[90px] ${
              isDarkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="text-xl sm:text-2xl font-black text-emerald-500">
                {followedDevs.length}
              </div>
              <div className={`text-[10px] font-bold uppercase tracking-wider font-mono mt-0.5 ${
                isDarkMode ? 'text-zinc-400' : 'text-slate-500'
              }`}>
                Following
              </div>
            </div>

            <div className={`p-4 rounded-2xl border text-center min-w-[90px] ${
              isDarkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="text-xl sm:text-2xl font-black text-cyan-500">
                {followedNotes.length}
              </div>
              <div className={`text-[10px] font-bold uppercase tracking-wider font-mono mt-0.5 ${
                isDarkMode ? 'text-zinc-400' : 'text-slate-500'
              }`}>
                Notes
              </div>
            </div>

            <div className={`p-4 rounded-2xl border text-center min-w-[90px] ${
              isDarkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="text-xl sm:text-2xl font-black text-amber-500">
                {followedDevs.reduce((acc, d) => acc + (d.repScore || 0), 0).toLocaleString()}
              </div>
              <div className={`text-[10px] font-bold uppercase tracking-wider font-mono mt-0.5 ${
                isDarkMode ? 'text-zinc-400' : 'text-slate-500'
              }`}>
                Dev Rep
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs & Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* View Tabs */}
        <div className={`inline-flex items-center gap-1.5 p-1 rounded-2xl border ${
          isDarkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-slate-100 border-slate-200'
        }`}>
          <button
            type="button"
            onClick={() => setActiveTab('feed')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'feed'
                ? 'bg-emerald-500 text-white shadow-xs'
                : isDarkMode
                ? 'text-zinc-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Following Feed ({followedNotes.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('following')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'following'
                ? 'bg-emerald-500 text-white shadow-xs'
                : isDarkMode
                ? 'text-zinc-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Followed Developers ({followedDevs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('discover')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'discover'
                ? 'bg-emerald-500 text-white shadow-xs'
                : isDarkMode
                ? 'text-zinc-400 hover:text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Discover Developers ({discoverDevs.length})</span>
          </button>
        </div>

        {/* Search input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search notes, tags, or devs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs font-medium border focus:outline-none focus:border-emerald-500 transition-colors ${
              isDarkMode
                ? 'bg-zinc-900/90 border-zinc-800 text-white placeholder-zinc-500'
                : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 shadow-xs'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* TAB 1: Following Notes Feed */}
      {activeTab === 'feed' && (
        <div className="space-y-6">
          {/* Authors quick filter bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <span className={`text-[11px] font-mono font-bold uppercase tracking-wider shrink-0 ${
              isDarkMode ? 'text-zinc-500' : 'text-slate-400'
            }`}>
              Filter Author:
            </span>
            <button
              type="button"
              onClick={() => setSelectedAuthorFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                selectedAuthorFilter === 'all'
                  ? 'bg-emerald-500 text-white shadow-xs font-bold'
                  : isDarkMode
                  ? 'bg-zinc-900 text-zinc-400 hover:text-white'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
            >
              All Followed
            </button>
            {followedDevs.map((dev) => (
              <button
                key={dev.id}
                type="button"
                onClick={() => setSelectedAuthorFilter(dev.handle)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                  selectedAuthorFilter === dev.handle
                    ? 'bg-emerald-500 text-white shadow-xs font-bold'
                    : isDarkMode
                    ? 'bg-zinc-900 text-zinc-400 hover:text-white'
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                }`}
              >
                <img src={dev.avatar} alt={dev.name} className="w-3.5 h-3.5 rounded-full object-cover" />
                <span>@{dev.handle}</span>
              </button>
            ))}
          </div>

          {/* Notes list */}
          {filteredNotes.length === 0 ? (
            <div className={`p-12 text-center rounded-3xl border border-dashed space-y-4 ${
              isDarkMode ? 'bg-[#18181b]/50 border-zinc-800 text-zinc-400' : 'bg-slate-50 border-slate-300 text-slate-500'
            }`}>
              <BookOpen className="w-10 h-10 mx-auto text-zinc-500" />
              <div className="space-y-1">
                <h3 className="text-base font-bold">No notes found from followed developers</h3>
                <p className="text-xs max-w-md mx-auto">
                  {followedDevs.length === 0
                    ? 'You are not following any developers yet. Discover engineers in our network to start seeing their notes here!'
                    : 'Try clearing your search query or follow more developers to expand your network feed.'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('discover')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Discover Developers to Follow</span>
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {filteredNotes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => setSelectedNoteForModal(note)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer hover:shadow-lg space-y-4 ${
                    isDarkMode
                      ? 'bg-[#18181b] border-zinc-800 hover:border-zinc-700'
                      : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
                  }`}
                >
                  {/* Author meta row */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={note.authorAvatar}
                        alt={note.authorName}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-zinc-700"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {note.authorName}
                          </span>
                          <span className="text-xs font-mono text-emerald-500">
                            @{note.authorHandle}
                          </span>
                        </div>
                        <p className={`text-[11px] ${isDarkMode ? 'text-zinc-500' : 'text-slate-500'}`}>
                          {note.authorRole} • {note.authorCompany}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{note.publishedAt}</span>
                      <span>•</span>
                      <span>{note.readTime}</span>
                    </div>
                  </div>

                  {/* Note Title & Excerpt */}
                  <div className="space-y-1.5">
                    <h2 className={`text-lg sm:text-xl font-bold tracking-tight hover:text-emerald-500 transition-colors ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}>
                      {note.title}
                    </h2>
                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      isDarkMode ? 'text-zinc-400' : 'text-slate-600'
                    }`}>
                      {note.excerpt}
                    </p>
                  </div>

                  {/* Optional Code Snippet Preview */}
                  {note.codeSnippet && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="rounded-2xl overflow-hidden border border-zinc-800 bg-[#0d1117] text-zinc-200 text-xs font-mono"
                    >
                      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/80 bg-zinc-900/60">
                        <div className="flex items-center gap-2 text-[11px] text-zinc-400">
                          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Code Preview</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(note.codeSnippet, note.id)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors cursor-pointer"
                        >
                          {copiedNoteId === note.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-4 overflow-x-auto text-[11.5px] leading-relaxed text-zinc-300">
                        <code>{note.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  {/* Tags and Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-zinc-800/60 text-xs">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {(note.tags || []).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md font-mono text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-4 text-zinc-400 font-mono text-xs"
                    >
                      <button
                        type="button"
                        onClick={() => handleToggleLike(note.id)}
                        className={`flex items-center gap-1.5 hover:text-red-500 transition-colors cursor-pointer ${
                          note.isLiked ? 'text-red-500 font-bold' : ''
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${note.isLiked ? 'fill-current' : ''}`} />
                        <span>{note.likes || 0}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleBookmark(note.id)}
                        className={`flex items-center gap-1.5 hover:text-emerald-500 transition-colors cursor-pointer ${
                          note.isBookmarked ? 'text-emerald-500 font-bold' : ''
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${note.isBookmarked ? 'fill-current' : ''}`} />
                        <span>{note.bookmarks || 0}</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{note.commentsCount || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: Followed Developers Directory */}
      {activeTab === 'following' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Developers You Follow ({followedDevs.length})
            </h2>
            <span className={`text-xs font-mono ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
              Live updates active
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {followedDevs.map((dev) => (
              <div
                key={dev.id}
                className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-5 ${
                  isDarkMode
                    ? 'bg-[#18181b] border-zinc-800 hover:border-zinc-700'
                    : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <img
                      src={dev.avatar}
                      alt={dev.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-zinc-700 shadow-xs"
                    />
                    <button
                      type="button"
                      onClick={() => handleToggleFollow(dev.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer bg-zinc-800 hover:bg-red-500/20 hover:text-red-400 text-zinc-300 border border-zinc-700 hover:border-red-500/40"
                    >
                      <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Following</span>
                    </button>
                  </div>

                  <div>
                    <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {dev.name}
                    </h3>
                    <div className="text-xs font-mono text-emerald-500">@{dev.handle}</div>
                    <p className={`text-xs font-medium mt-0.5 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                      {dev.role} • {dev.company}
                    </p>
                  </div>

                  <p className={`text-xs leading-relaxed line-clamp-2 ${
                    isDarkMode ? 'text-zinc-400' : 'text-slate-600'
                  }`}>
                    {dev.bio}
                  </p>

                  {/* Skills/Tags */}
                  <div className="flex flex-wrap gap-1">
                    {(dev.tags || []).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Stats & Filter Action */}
                <div className="pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-3 text-zinc-400">
                    <span>{dev.notesCount} Notes</span>
                    <span>•</span>
                    <span className="text-amber-400">{dev.repScore} Rep</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedAuthorFilter(dev.handle);
                      setActiveTab('feed');
                    }}
                    className="text-emerald-500 hover:underline font-semibold cursor-pointer"
                  >
                    View Notes →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Discover Developers Directory */}
      {activeTab === 'discover' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Recommended Engineers to Follow ({discoverDevs.length})
            </h2>
            <span className={`text-xs font-mono ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>
              Curated by platform reputation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {discoverDevs.map((dev) => (
              <div
                key={dev.id}
                className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-5 ${
                  isDarkMode
                    ? 'bg-[#18181b] border-zinc-800 hover:border-zinc-700'
                    : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <img
                      src={dev.avatar}
                      alt={dev.name}
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-zinc-700 shadow-xs"
                    />
                    <button
                      type="button"
                      onClick={() => handleToggleFollow(dev.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white shadow-xs"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>+ Follow</span>
                    </button>
                  </div>

                  <div>
                    <h3 className={`text-base font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                      {dev.name}
                    </h3>
                    <div className="text-xs font-mono text-emerald-500">@{dev.handle}</div>
                    <p className={`text-xs font-medium mt-0.5 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                      {dev.role} • {dev.company}
                    </p>
                  </div>

                  <p className={`text-xs leading-relaxed line-clamp-2 ${
                    isDarkMode ? 'text-zinc-400' : 'text-slate-600'
                  }`}>
                    {dev.bio}
                  </p>

                  {/* Skills/Tags */}
                  <div className="flex flex-wrap gap-1">
                    {(dev.tags || []).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Stats */}
                <div className="pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>{dev.followersCount} Followers</span>
                  <span className="text-amber-400">{dev.repScore} Rep</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Note Reader Modal */}
      {selectedNoteForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
          <div
            className={`w-full max-w-3xl max-h-[88vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden ${
              isDarkMode ? 'bg-[#18181b] border-zinc-800 text-zinc-200' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-zinc-800 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedNoteForModal.authorAvatar}
                  alt={selectedNoteForModal.authorName}
                  className="w-12 h-12 rounded-full object-cover border border-slate-200 dark:border-zinc-700"
                />
                <div>
                  <h3 className="font-bold text-base leading-tight">
                    {selectedNoteForModal.authorName}
                  </h3>
                  <div className="text-xs font-mono text-emerald-500">
                    @{selectedNoteForModal.authorHandle}
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    {selectedNoteForModal.authorRole} • {selectedNoteForModal.publishedAt}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedNoteForModal(null)}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              <h1 className="text-xl sm:text-2xl font-black leading-snug">
                {selectedNoteForModal.title}
              </h1>

              <div className="flex flex-wrap gap-1.5">
                {(selectedNoteForModal.tags || []).map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-md font-mono text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="text-sm leading-relaxed whitespace-pre-wrap space-y-4">
                {selectedNoteForModal.content}
              </div>

              {selectedNoteForModal.codeSnippet && (
                <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-[#0d1117] text-zinc-200 text-xs font-mono">
                  <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-zinc-900/60">
                    <span className="text-zinc-400 text-xs">Code Implementation</span>
                    <button
                      type="button"
                      onClick={() => handleCopyCode(selectedNoteForModal.codeSnippet, selectedNoteForModal.id)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-colors cursor-pointer"
                    >
                      {copiedNoteId === selectedNoteForModal.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied to Clipboard</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-4 overflow-x-auto text-xs leading-relaxed text-zinc-300">
                    <code>{selectedNoteForModal.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between text-xs font-mono text-zinc-400 bg-slate-50/50 dark:bg-zinc-900/40">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-red-500" />
                  <span>{selectedNoteForModal.likes || 0} Likes</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{selectedNoteForModal.bookmarks || 0} Bookmarks</span>
                </span>
              </div>

              <button
                type="button"
                onClick={() => setSelectedNoteForModal(null)}
                className="px-4 py-2 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer"
              >
                Close Note
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FollowingView;
