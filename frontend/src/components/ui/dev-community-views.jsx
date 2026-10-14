import { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import {
  Code2,
  Terminal,
  MessagesSquare,
  Rocket,
  Search,
  Plus,
  Heart,
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  CheckCircle2,
  Flame,
  Layers,
  Cpu,
  Server,
  Cloud,
  ArrowUp,
  X,
  Package,
  Code,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                       1. CODE SNIPPETS & GISTS VIEW                        */
/* -------------------------------------------------------------------------- */
const INITIAL_SNIPPETS = [
  {
    id: 'snip-1',
    title: 'useDebounce React Hook with Immediate Execution',
    description: 'Clean TypeScript debounce hook with cleanup, delay cancellation, and optional immediate invocation.',
    language: 'TypeScript',
    author: 'dan_engineer',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    likes: 42,
    code: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number, immediate = false): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    if (immediate && debouncedValue === value) return;
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay, immediate]);

  return debouncedValue;
}`,
  },
  {
    id: 'snip-2',
    title: 'High-Performance Node.js Async Worker Pool',
    description: 'Offload CPU-intensive tasks (image processing, hashing) to worker threads without blocking the event loop.',
    language: 'JavaScript',
    author: 'backend_guru',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    likes: 67,
    code: `import { Worker } from 'worker_threads';
import { cpus } from 'os';

export class WorkerPool {
  private workers: Worker[] = [];
  private maxWorkers = cpus().length;

  executeTask(scriptPath: string, workerData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const worker = new Worker(scriptPath, { workerData });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) reject(new Error(\`Worker stopped with code \${code}\`));
      });
    });
  }
}`,
  },
  {
    id: 'snip-3',
    title: 'Production Multi-Stage Dockerfile for Vite / React',
    description: 'Ultra-lightweight Alpine container (~18MB) with non-root security and Nginx caching headers.',
    language: 'Docker',
    author: 'devops_ninja',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    likes: 53,
    code: `# --- Build Stage ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --prefer-offline
COPY . .
RUN npm run build

# --- Production Runtime ---
FROM nginx:alpine-slim
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
USER nginx
CMD ["nginx", "-g", "daemon off;"]`,
  },
  {
    id: 'snip-4',
    title: 'FastAPI Stream Async SSE (Server-Sent Events) for LLM Outputs',
    description: 'Stream tokens chunk-by-chunk in real time from OpenAI / Anthropic models with token rate limits.',
    language: 'Python',
    author: 'ai_researcher',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    likes: 89,
    code: `from fastapi import FastAPI
from fastapi.responses import StreamingResponse
import asyncio

app = FastAPI()

async def token_generator(prompt: str):
    tokens = ["Building", " ", "autonomous", " ", "agents", " ", "with", " ", "FastAPI", "!"]
    for token in tokens:
        yield f"data: {token}\\n\\n"
        await asyncio.sleep(0.06)

@app.get("/stream-chat")
async def stream_chat(prompt: str = "hello"):
    return StreamingResponse(token_generator(prompt), media_type="text/event-stream")`,
  },
];

export function CodeSnippetsView({ isDarkMode = false }) {
  const [snippets, setSnippets] = useState(() => {
    try {
      const saved = localStorage.getItem('overstack_snippets');
      return saved ? JSON.parse(saved) : INITIAL_SNIPPETS;
    } catch {
      return INITIAL_SNIPPETS;
    }
  });
  const [selectedLang, setSelectedLang] = useState('All');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newLang, setNewLang] = useState('TypeScript');
  const [newCode, setNewCode] = useState('');

  const languages = ['All', 'TypeScript', 'JavaScript', 'Python', 'Docker', 'React'];

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleLike = (id) => {
    setSnippets((prev) => {
      const updated = prev.map((s) => (s.id === id ? { ...s, likes: s.likes + 1 } : s));
      try {
        localStorage.setItem('overstack_snippets', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCode.trim()) return;

    const newSnippet = {
      id: `snip-${Date.now()}`,
      title: newTitle,
      description: newDesc,
      language: newLang,
      author: 'you (dev)',
      likes: 1,
      code: newCode,
    };

    const updated = [newSnippet, ...snippets];
    setSnippets(updated);
    try {
      localStorage.setItem('overstack_snippets', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setIsModalOpen(false);
    setNewTitle('');
    setNewDesc('');
    setNewCode('');
  };

  const filtered = snippets.filter((s) => {
    if (selectedLang !== 'All' && s.language !== selectedLang) return false;
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.code.toLowerCase().includes(q);
  });

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 dark:border-zinc-800 border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              &lt;snippets /&gt;
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Community Code Repository</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Code Snippets &amp; Gists</h1>
          <p className="text-sm mt-1 text-slate-500 dark:text-zinc-400">
            Copy-paste production utilities, custom hooks, and battle-tested configurations.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-500 hover:bg-emerald-600 shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Share Snippet</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search snippets by keywords, functions, hooks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:border-emerald-500 ${
              isDarkMode ? 'bg-[#18181b] border-zinc-800 text-white placeholder-zinc-500' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
            }`}
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLang(lang)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedLang === lang
                  ? 'bg-emerald-500 text-white font-bold shadow-xs'
                  : isDarkMode
                  ? 'bg-zinc-800/80 text-zinc-400 hover:text-white'
                  : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Snippet Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filtered.map((snip) => (
          <div
            key={snip.id}
            className={`rounded-2xl border p-5 space-y-4 transition-all ${
              isDarkMode ? 'bg-[#18181b] border-zinc-800/80 shadow-md' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-zinc-800 text-emerald-400 border border-zinc-700">
                    {snip.language}
                  </span>
                  <h3 className="font-bold text-base tracking-tight">{snip.title}</h3>
                </div>
                {snip.description && (
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">{snip.description}</p>
                )}
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={() => handleLike(snip.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold hover:text-red-500 transition-colors border-slate-200 dark:border-zinc-800 cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 text-red-500" />
                  <span>{snip.likes}</span>
                </button>
                <button
                  onClick={() => copyCode(snip.code, snip.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 font-bold text-xs transition-colors cursor-pointer"
                >
                  {copiedId === snip.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Code Block Container */}
            <div className="rounded-xl overflow-hidden border border-zinc-800 bg-[#0d1117] font-mono text-xs text-zinc-200">
              <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/90 border-b border-zinc-800/80 text-[11px] text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                  <span className="ml-2 font-semibold text-zinc-300">{snip.language.toLowerCase()}</span>
                </div>
                <span>{snip.code.split('\n').length} lines</span>
              </div>
              <pre className="p-4 overflow-x-auto leading-relaxed scrollbar-thin text-emerald-300/90 whitespace-pre">
                <code>{snip.code}</code>
              </pre>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={`w-full max-w-lg rounded-2xl p-6 border shadow-2xl space-y-4 ${
              isDarkMode ? 'bg-[#18181b] border-zinc-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3 dark:border-zinc-800 border-slate-100">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-500" />
                <span>Share a Code Snippet</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-zinc-400">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Robust JWT Refresh Hook in React"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-emerald-500 ${
                    isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-400">Language</label>
                  <select
                    value={newLang}
                    onChange={(e) => setNewLang(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-emerald-500 ${
                      isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="TypeScript">TypeScript</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Docker">Docker</option>
                    <option value="Rust">Rust</option>
                    <option value="SQL">SQL</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-400">Brief Note</label>
                  <input
                    type="text"
                    placeholder="Quick explanation..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-emerald-500 ${
                      isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-400">Code *</label>
                <textarea
                  rows={6}
                  required
                  placeholder="// Paste your code here..."
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className={`w-full p-3 font-mono text-xs rounded-xl border focus:outline-none focus:border-emerald-500 ${
                    isDarkMode ? 'bg-[#0d1117] border-zinc-800 text-emerald-300' : 'bg-slate-900 border-slate-700 text-emerald-300'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 text-zinc-300 hover:bg-zinc-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-white hover:bg-emerald-600 shadow-md cursor-pointer"
                >
                  Post Snippet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                          2. #SHOWDEV SHOWCASE VIEW                         */
/* -------------------------------------------------------------------------- */
const INITIAL_PROJECTS = [
  {
    id: 'proj-1',
    title: 'PulseDB: In-Memory Time Series Engine in Rust',
    tagline: 'High throughput metrics collector that processes 1M samples/sec with sub-millisecond query latencies.',
    author: 'rustacean_max',
    authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
    tags: ['Rust', 'WebAssembly', 'Distributed Systems'],
    github: 'https://github.com/example/pulsedb',
    demo: 'https://pulsedb.example.dev',
    upvotes: 148,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'proj-2',
    title: 'AgentCanvas: Visual AI Agent Workflow Builder',
    tagline: 'Connect LLM nodes, tool calls, and human-in-the-loop validation steps in an infinite canvas UI.',
    author: 'sarah_ai',
    authorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80',
    tags: ['React 19', 'FastAPI', 'LangChain', 'TailwindCSS'],
    github: 'https://github.com/example/agentcanvas',
    demo: 'https://agentcanvas.example.dev',
    upvotes: 215,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
  },
  {
    id: 'proj-3',
    title: 'HyperLog: Zero-Config Cloud Logging for Next.js',
    tagline: 'Instant structured telemetry, log tailing, and OpenTelemetry tracing without running heavy agents.',
    author: 'frontend_dan',
    authorAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80',
    tags: ['Next.js 15', 'OpenTelemetry', 'Go', 'ClickHouse'],
    github: 'https://github.com/example/hyperlog',
    demo: 'https://hyperlog.example.dev',
    upvotes: 94,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
  },
];

export function ShowDevView({ isDarkMode = false }) {
  const [projects, setProjects] = useState(() => {
    try {
      const saved = localStorage.getItem('overstack_showdev');
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newTags, setNewTags] = useState('React, Node.js');
  const [newGithub, setNewGithub] = useState('');
  const [newDemo, setNewDemo] = useState('');

  const handleUpvote = (id) => {
    setProjects((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p));
      try {
        localStorage.setItem('overstack_showdev', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProject = {
      id: `proj-${Date.now()}`,
      title: newTitle,
      tagline: newTagline,
      author: 'you (dev)',
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      github: newGithub || 'https://github.com',
      demo: newDemo || 'https://example.com',
      upvotes: 1,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    };

    const updated = [newProject, ...projects];
    setProjects(updated);
    try {
      localStorage.setItem('overstack_showdev', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setIsModalOpen(false);
    setNewTitle('');
    setNewTagline('');
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 dark:border-zinc-800 border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
              #showdev
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Community Project Showcase</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Showcase Your Creations</h1>
          <p className="text-sm mt-1 text-slate-500 dark:text-zinc-400">
            Discover what fellow developers are building, star their repositories, and try their live demos.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-500 hover:bg-emerald-600 shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <Rocket className="w-4 h-4" />
          <span>Submit Project</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all ${
              isDarkMode ? 'bg-[#18181b] border-zinc-800/80 shadow-md hover:border-zinc-700' : 'bg-white border-slate-200 shadow-xs hover:border-slate-300'
            }`}
          >
            <div>
              <div className="h-44 w-full overflow-hidden relative">
                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => handleUpvote(proj.id)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/70 backdrop-blur-md text-white font-bold text-xs hover:bg-black transition-colors cursor-pointer"
                  >
                    <ArrowUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{proj.upvotes}</span>
                  </button>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-zinc-800/80 text-zinc-300 border border-zinc-700/60"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <h3 className="font-bold text-lg leading-snug tracking-tight">{proj.title}</h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                  {proj.tagline}
                </p>
              </div>
            </div>

            <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-slate-100 dark:border-zinc-800/80 text-xs">
              <span className="text-[11px] font-medium text-slate-400 dark:text-zinc-500">
                by @{proj.author}
              </span>
              <div className="flex items-center gap-2">
                {proj.github && (
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg border border-slate-200 dark:border-zinc-800 hover:text-emerald-500 transition-colors"
                    title="View GitHub"
                  >
                    <FaGithub className="w-3.5 h-3.5" />
                  </a>
                )}
                {proj.demo && (
                  <a
                    href={proj.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-white font-bold text-[11px] hover:bg-emerald-600 transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Submit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={`w-full max-w-lg rounded-2xl p-6 border shadow-2xl space-y-4 ${
              isDarkMode ? 'bg-[#18181b] border-zinc-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3 dark:border-zinc-800 border-slate-100">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Rocket className="w-5 h-5 text-emerald-500" />
                <span>Submit Your Side Project</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-zinc-400">Project Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SupaORM: Next-gen type-safe ORM"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-emerald-500 ${
                    isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-400">Elevator Pitch *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="What problem does it solve and who is it for?"
                  value={newTagline}
                  onChange={(e) => setNewTagline(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-emerald-500 ${
                    isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-400">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Next.js 15, TypeScript, Tailwind, Supabase"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-emerald-500 ${
                    isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-zinc-400">GitHub URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={newGithub}
                    onChange={(e) => setNewGithub(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-emerald-500 ${
                      isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-zinc-400">Live Demo URL</label>
                  <input
                    type="url"
                    placeholder="https://myproject.com"
                    value={newDemo}
                    onChange={(e) => setNewDemo(e.target.value)}
                    className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-emerald-500 ${
                      isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 text-zinc-300 hover:bg-zinc-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-white hover:bg-emerald-600 shadow-md cursor-pointer"
                >
                  Publish Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                     3. DEV DISCUSSIONS & Q&A FORUM                         */
/* -------------------------------------------------------------------------- */
const INITIAL_DISCUSSIONS = [
  {
    id: 'disc-1',
    title: 'Tabs vs Spaces in 2026: Does it actually impact accessibility with screen readers?',
    author: 'a11y_advocate',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    tags: ['accessibility', 'code-style', 'watercooler'],
    votes: 82,
    answers: 31,
    isSolved: false,
    content: 'Recent studies on developer accessibility indicate that tabs allow each team member to adjust tab-width to their visual ergonomics. What is your team policy?',
    timeAgo: '2h ago',
  },
  {
    id: 'disc-2',
    title: 'How are you handling Server Components authentication tokens refresh in Next.js 15?',
    author: 'nextjs_fan',
    authorAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80',
    tags: ['nextjs', 'react', 'security', 'auth'],
    votes: 114,
    answers: 19,
    isSolved: true,
    content: 'Since RSC cannot mutate cookies directly during render, what pattern did you land on? Middleware proxying, route handler refresh, or optimistic cookies?',
    timeAgo: '5h ago',
  },
  {
    id: 'disc-3',
    title: 'What developer tool or CLI saved you the most hours this month?',
    author: 'terminal_king',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
    tags: ['tooling', 'productivity', 'cli'],
    votes: 95,
    answers: 44,
    isSolved: false,
    content: 'Looking for hidden gems in your daily workflow. For me it was lazygit and zoxide. Share your favorite CLI utilities!',
    timeAgo: '1d ago',
  },
];

export function DevDiscussionsView({ isDarkMode = false }) {
  const [discussions, setDiscussions] = useState(() => {
    try {
      const saved = localStorage.getItem('overstack_discussions');
      return saved ? JSON.parse(saved) : INITIAL_DISCUSSIONS;
    } catch {
      return INITIAL_DISCUSSIONS;
    }
  });
  const [filter, setFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTags, setNewTags] = useState('react, nextjs');

  const handleVote = (id) => {
    setDiscussions((prev) => {
      const updated = prev.map((d) => (d.id === id ? { ...d, votes: d.votes + 1 } : d));
      try {
        localStorage.setItem('overstack_discussions', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newDisc = {
      id: `disc-${Date.now()}`,
      title: newTitle,
      content: newContent,
      author: 'you (dev)',
      authorAvatar: '',
      tags: newTags.split(',').map((t) => t.trim()).filter(Boolean),
      votes: 1,
      answers: 0,
      isSolved: false,
      timeAgo: 'Just now',
    };

    const updated = [newDisc, ...discussions];
    setDiscussions(updated);
    try {
      localStorage.setItem('overstack_discussions', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setIsModalOpen(false);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 dark:border-zinc-800 border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
              #discussions
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Dev Watercooler &amp; Q&amp;A</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Developer Discussions</h1>
          <p className="text-sm mt-1 text-slate-500 dark:text-zinc-400">
            Ask technical questions, debate architectural patterns, and share experiences.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-emerald-500 hover:bg-emerald-600 shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <MessagesSquare className="w-4 h-4" />
          <span>Start Discussion</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {['All', 'Trending', 'Solved', 'Unanswered'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              filter === tab
                ? 'bg-emerald-500 text-white font-bold shadow-xs'
                : isDarkMode
                ? 'bg-zinc-800/80 text-zinc-400 hover:text-white'
                : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Discussions Feed */}
      <div className="space-y-4">
        {discussions.map((d) => (
          <div
            key={d.id}
            className={`rounded-2xl border p-5 flex items-start gap-4 transition-all ${
              isDarkMode ? 'bg-[#18181b] border-zinc-800/80 shadow-md' : 'bg-white border-slate-200 shadow-xs'
            }`}
          >
            {/* Vote Box */}
            <button
              onClick={() => handleVote(d.id)}
              className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200 dark:border-zinc-800 hover:border-emerald-500 transition-colors shrink-0 cursor-pointer min-w-12 text-center"
            >
              <ArrowUp className="w-4 h-4 text-emerald-500" />
              <span className="font-extrabold text-xs mt-0.5">{d.votes}</span>
            </button>

            {/* Content Body */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                {d.isSolved && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Solved</span>
                  </span>
                )}
                {d.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono text-zinc-400 bg-zinc-800/60 border border-zinc-700/60"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <h3 className="font-bold text-base hover:text-emerald-500 cursor-pointer transition-colors leading-snug">
                {d.title}
              </h3>

              <p className="text-xs text-slate-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {d.content}
              </p>

              <div className="flex items-center justify-between pt-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                <span>
                  by <span className="font-semibold text-emerald-500">@{d.author}</span> • {d.timeAgo}
                </span>
                <span className="flex items-center gap-1 font-semibold">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{d.answers} responses</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Start Discussion Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={`w-full max-w-lg rounded-2xl p-6 border shadow-2xl space-y-4 ${
              isDarkMode ? 'bg-[#18181b] border-zinc-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b pb-3 dark:border-zinc-800 border-slate-100">
              <h3 className="font-bold text-base flex items-center gap-2">
                <MessagesSquare className="w-5 h-5 text-emerald-500" />
                <span>Start a Developer Discussion</span>
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-zinc-400">Discussion Title / Question *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Best practices for Redis caching in distributed microservices"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-emerald-500 ${
                    isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-400">Tags (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. redis, nodejs, backend"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none focus:border-emerald-500 ${
                    isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-400">Context &amp; Details *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide context, snippets, or the scenario you are wrestling with..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className={`w-full p-3 text-xs rounded-xl border focus:outline-none focus:border-emerald-500 ${
                    isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 text-zinc-300 hover:bg-zinc-700 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-white hover:bg-emerald-600 shadow-md cursor-pointer"
                >
                  Post Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                        4. SPECIALIZED DEV HUB VIEW                         */
/* -------------------------------------------------------------------------- */
export function DevHubView({ hubName = 'Frontend & React', isDarkMode = false, onNavigateSection }) {
  const HUB_DATA = {
    'Frontend & React': {
      icon: <Layers className="w-6 h-6 text-cyan-400" />,
      accent: 'text-cyan-400',
      description: 'Component architecture, React 19 compiler, Next.js, state libraries, and CSS superpowers.',
      featuredPackages: ['React 19 RC', 'Tailwind v4', 'Zustand 5', 'TanStack Query'],
      topics: ['React Server Components patterns', 'Zero-runtime CSS benchmarks', 'Vite 6 build optimizers'],
    },
    'Backend & APIs': {
      icon: <Server className="w-6 h-6 text-emerald-400" />,
      accent: 'text-emerald-400',
      description: 'Microservices, distributed databases, Go/Node/Rust pipelines, and gRPC architectures.',
      featuredPackages: ['Fastify v5', 'Prisma ORM', 'Redis 7.4', 'Kafka Streams'],
      topics: ['Idempotency in payment webhooks', 'Postgres connection pooling at scale', 'Building low-latency GraphQL'],
    },
    'AI & LLM Hub': {
      icon: <Cpu className="w-6 h-6 text-purple-400" />,
      accent: 'text-purple-400',
      description: 'Agentic workflows, RAG pipelines, fine-tuning, embeddings, and prompt orchestration.',
      featuredPackages: ['LangChain 0.3', 'Ollama', 'ChromaDB', 'Vercel AI SDK'],
      topics: ['Multi-agent consensus protocols', 'Local LLM inference in WebAssembly', 'Hybrid vector search'],
    },
    'DevOps & Cloud': {
      icon: <Cloud className="w-6 h-6 text-amber-400" />,
      accent: 'text-amber-400',
      description: 'CI/CD automation, Kubernetes clusters, Docker containers, Terraform, and edge compute.',
      featuredPackages: ['Docker Compose v2', 'Kubernetes 1.30', 'Terraform 1.9', 'GitHub Actions'],
      topics: ['Zero-downtime Blue/Green deployments', 'Kube-cost reduction strategies', 'Secrets rotation best practices'],
    },
  };

  const currentHub = HUB_DATA[hubName] || HUB_DATA['Frontend & React'];

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="rounded-3xl border p-6 sm:p-8 bg-gradient-to-r from-zinc-900 to-zinc-800 text-white border-zinc-700/60 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md">
            {currentHub.icon}
          </div>
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold">
              Specialized Hub
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight">{hubName}</h1>
          </div>
        </div>
        <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
          {currentHub.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {currentHub.featuredPackages.map((pkg) => (
            <span
              key={pkg}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-mono font-bold bg-white/10 border border-white/15"
            >
              <Package className="w-3 h-3 text-emerald-400" />
              <span>{pkg}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Hub Discussions & Learning Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className={`rounded-2xl border p-6 space-y-4 ${
            isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-slate-200'
          }`}
        >
          <h3 className="font-bold text-base flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Trending Technical Threads in {hubName}</span>
          </h3>
          <div className="space-y-3">
            {currentHub.topics.map((t, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-slate-100 dark:border-zinc-800/80 hover:border-emerald-500 transition-colors cursor-pointer text-xs font-medium space-y-1"
              >
                <div className="font-semibold text-sm hover:text-emerald-500 transition-colors">{t}</div>
                <div className="text-zinc-500 text-[11px]">Active discussion with 24+ engineer responses</div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`rounded-2xl border p-6 space-y-4 ${
            isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-slate-200'
          }`}
        >
          <h3 className="font-bold text-base flex items-center gap-2">
            <Terminal className="w-4 h-4 text-emerald-500" />
            <span>Hub Quick Actions</span>
          </h3>
          <div className="space-y-2.5">
            <button
              onClick={() => onNavigateSection && onNavigateSection('Discussions')}
              className="w-full text-left p-3 rounded-xl border border-slate-100 dark:border-zinc-800 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all cursor-pointer text-xs font-medium"
            >
              <span className="flex items-center gap-2 font-bold text-sm">
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                Browse All Community Questions
              </span>
              <span className="text-zinc-500 text-[11px]">Ask questions or vote on architectural patterns</span>
            </button>
            <button
              onClick={() => onNavigateSection && onNavigateSection('Code Snippets')}
              className="w-full text-left p-3 rounded-xl border border-slate-100 dark:border-zinc-800 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all cursor-pointer text-xs font-medium"
            >
              <span className="flex items-center gap-2 font-bold text-sm">
                <Code className="w-4 h-4 text-cyan-500" />
                Explore Tested Code Snippets
              </span>
              <span className="text-zinc-500 text-[11px]">Production hooks, gists, and configurations</span>
            </button>
            <button
              onClick={() => onNavigateSection && onNavigateSection('#showdev')}
              className="w-full text-left p-3 rounded-xl border border-slate-100 dark:border-zinc-800 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all cursor-pointer text-xs font-medium"
            >
              <span className="flex items-center gap-2 font-bold text-sm">
                <Rocket className="w-4 h-4 text-purple-500" />
                Check Community #showdev Projects
              </span>
              <span className="text-zinc-500 text-[11px]">Inspect real codebases and live demos</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
