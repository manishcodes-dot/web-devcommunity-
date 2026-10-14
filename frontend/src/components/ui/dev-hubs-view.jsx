import { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Layers,
  Server,
  Cpu,
  Cloud,
  Terminal,
  Code2,
  ArrowLeft,
  Heart,
  MessageSquare,
  PenLine,
  Zap,
} from 'lucide-react';

const generateId = (prefix) => `${prefix}-${Math.random().toString(36).substring(2, 9)}`;

/**
 * INITIAL_DEV_HUBS
 * Rich developer groups dataset featuring specialized engineering tracks,
 * member profiles, and real technical notes published by members.
 */
const INITIAL_DEV_HUBS = [
  {
    id: 'hub-frontend',
    name: 'Frontend & React Guild',
    slug: 'frontend-react',
    category: 'Frontend',
    description: 'Component architecture, React 19 compiler, Next.js App Router, state machines, and zero-runtime CSS.',
    tags: ['react', 'typescript', 'nextjs', 'tailwind', 'vite'],
    gradient: 'from-cyan-600 via-blue-600 to-indigo-900',
    iconType: 'Layers',
    visibility: 'public',
    createdAt: '2 months ago',
    members: [
      {
        id: 'mem-1',
        name: 'Sarah Chen',
        handle: '@schen_dev',
        role: 'Founder & Staff Architect',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
        rep: '2,480',
        email: 'sarah.chen@dev.io',
      },
      {
        id: 'mem-2',
        name: 'Alex Rivers',
        handle: '@alex_rivers',
        role: 'Senior Frontend Dev',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        rep: '1,940',
        email: 'alex.rivers@dev.io',
      },
      {
        id: 'mem-3',
        name: 'Elena Rostova',
        handle: '@elena_ts',
        role: 'TypeScript Specialist',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        rep: '1,520',
        email: 'elena.rostova@dev.io',
      },
    ],
    notes: [
      {
        id: 'note-fe-1',
        title: 'React 19 Server Actions: Form State & Optimistic UI Patterns',
        excerpt: 'How we removed 400 lines of manual pending states by pairing useActionState with useOptimistic in production forms.',
        content: `React 19 radically simplifies server-driven interactions. In this pattern, we bind actions directly to the form lifecycle while providing instant UI feedback:

\`\`\`tsx
import { useActionState, useOptimistic } from 'react';

export function CommentForm({ postId, onAddComment }) {
  const [state, formAction, isPending] = useActionState(async (prev, formData) => {
    const text = formData.get('comment');
    return await api.submitComment(postId, text);
  }, null);

  const [optimisticComments, setOptimisticComments] = useOptimistic(
    [],
    (state, newComment) => [...state, { text: newComment, pending: true }]
  );

  return (
    <form action={async (formData) => {
      setOptimisticComments(formData.get('comment'));
      await formAction(formData);
    }}>
      <input name="comment" required placeholder="Share your insight..." />
      <button type="submit" disabled={isPending}>
        {isPending ? 'Syncing...' : 'Post'}
      </button>
    </form>
  );
}
\`\`\`

This eliminates the need for separate tracking states and handles automatic rollback on network failures.`,
        author: 'Sarah Chen',
        authorHandle: '@schen_dev',
        authorRole: 'Founder',
        authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
        publishedAt: 'Yesterday',
        readTime: '4 min read',
        tags: ['react', 'nextjs', 'typescript'],
        claps: 84,
        unicorns: 32,
        commentsCount: 14,
      },
      {
        id: 'note-fe-2',
        title: 'Query Prefetching with Hydration Boundaries in TanStack v5',
        excerpt: 'Zero-flash page transitions by prefetching query states on the server and hydrating inside Next.js layout trees.',
        content: `SSR prefetching eliminates the loading spinner flash when navigating between dashboards.

\`\`\`tsx
// server-component.tsx
import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function DashboardPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectListView />
    </HydrationBoundary>
  );
}
\`\`\`

This approach ensures zero client waterfall while preserving TanStack's background revalidation features.`,
        author: 'Alex Rivers',
        authorHandle: '@alex_rivers',
        authorRole: 'Senior Frontend Dev',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        publishedAt: '3 days ago',
        readTime: '5 min read',
        tags: ['react-query', 'nextjs', 'ssr'],
        claps: 61,
        unicorns: 19,
        commentsCount: 9,
      },
      {
        id: 'note-fe-3',
        title: 'CSS Container Queries vs Subgrid: Practical Layout Rules',
        excerpt: 'When to break free from media queries and how container queries enable truly modular UI component libraries.',
        content: `Media queries respond to the global viewport; container queries respond to the parent container's dimensions.

\`\`\`css
/* Define container boundary */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

/* Adapt component dynamically when parent is wider than 450px */
@container card (min-width: 450px) {
  .dev-card {
    display: grid;
    grid-template-columns: 120px 1fr;
    gap: 1.5rem;
  }
}
\`\`\`

With container queries, the same card component looks stunning whether placed in a full-width hero or a 250px sidebar.`,
        author: 'Elena Rostova',
        authorHandle: '@elena_ts',
        authorRole: 'TypeScript Specialist',
        authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        publishedAt: '5 days ago',
        readTime: '3 min read',
        tags: ['css', 'frontend', 'architecture'],
        claps: 47,
        unicorns: 14,
        commentsCount: 6,
      },
    ],
  },
  {
    id: 'hub-backend',
    name: 'Backend & Distributed Systems',
    slug: 'backend-apis',
    category: 'Backend',
    description: 'High-throughput microservices, distributed caching, Go & Node pipelines, gRPC, and database sharding.',
    tags: ['nodejs', 'go', 'redis', 'postgres', 'microservices'],
    gradient: 'from-emerald-600 via-teal-700 to-zinc-900',
    iconType: 'Server',
    visibility: 'public',
    createdAt: '3 months ago',
    members: [
      {
        id: 'mem-b1',
        name: 'Marcus Vance',
        handle: '@marcus_v',
        role: 'Founder & Principal Backend',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        rep: '2,810',
        email: 'marcus.v@dev.io',
      },
      {
        id: 'mem-b2',
        name: 'David Kim',
        handle: '@david_ai',
        role: 'Data Infrastructure Lead',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        rep: '1,830',
        email: 'david.kim@dev.io',
      },
    ],
    notes: [
      {
        id: 'note-be-1',
        title: 'Distributed Locking Patterns in Node.js using Redis Redlock',
        excerpt: 'Preventing double-spends and race conditions in asynchronous worker queues using quorum-based distributed locks.',
        content: `When background queues scale across 8 clustered replicas, atomic execution requires a distributed lock:

\`\`\`javascript
const Redlock = require('redlock');
const redisClient = require('./redis');

const redlock = new Redlock([redisClient], {
  driftFactor: 0.01,
  retryCount: 3,
  retryDelay: 200,
});

async function processPayment(orderId, amount) {
  const resource = \`locks:order:\${orderId}\`;
  const lock = await redlock.acquire([resource], 5000); // 5s TTL
  
  try {
    await executeBankTransfer(orderId, amount);
  } finally {
    await lock.release();
  }
}
\`\`\`

Always wrap locks in a finally block to avoid deadlocks in case of unexpected errors.`,
        author: 'Marcus Vance',
        authorHandle: '@marcus_v',
        authorRole: 'Founder',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
        publishedAt: '2 days ago',
        readTime: '5 min read',
        tags: ['redis', 'nodejs', 'distributed-systems'],
        claps: 92,
        unicorns: 44,
        commentsCount: 18,
      },
    ],
  },
  {
    id: 'hub-ai',
    name: 'AI & Autonomous Agents Lab',
    slug: 'ai-llm-hub',
    category: 'AI & ML',
    description: 'Production tool-calling agents, local SLMs, RAG embeddings, vector databases, and deterministic evaluations.',
    tags: ['ai', 'python', 'agents', 'langchain', 'vector-db'],
    gradient: 'from-purple-600 via-fuchsia-700 to-zinc-900',
    iconType: 'Cpu',
    visibility: 'public',
    createdAt: '1 month ago',
    members: [
      {
        id: 'mem-ai1',
        name: 'Dr. Aris Thorne',
        handle: '@aris_ai',
        role: 'Founder & AI Lead',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        rep: '3,150',
        email: 'aris.thorne@dev.io',
      },
      {
        id: 'mem-ai2',
        name: 'Maya Lin',
        handle: '@maya_l',
        role: 'ML Engineer',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
        rep: '1,620',
        email: 'maya.lin@dev.io',
      },
    ],
    notes: [
      {
        id: 'note-ai-1',
        title: 'Deterministic Tool Calling with Strict Pydantic Schemas',
        excerpt: 'How to eliminate hallucinated function arguments by enforcing JSON Schema validation on LLM output streams.',
        content: `When orchestrating agents that interact with databases, strict schema validation is non-negotiable:

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

This guarantees predictable execution even when users provide ambiguous prompts.`,
        author: 'Dr. Aris Thorne',
        authorHandle: '@aris_ai',
        authorRole: 'Founder',
        authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
        publishedAt: '4 days ago',
        readTime: '6 min read',
        tags: ['ai', 'python', 'agents'],
        claps: 110,
        unicorns: 58,
        commentsCount: 22,
      },
    ],
  },
  {
    id: 'hub-devops',
    name: 'Cloud Native & DevOps Squad',
    slug: 'devops-cloud',
    category: 'DevOps',
    description: 'Kubernetes orchestration, Terraform infrastructure as code, automated GitHub Actions, and edge deployments.',
    tags: ['docker', 'kubernetes', 'terraform', 'aws', 'cicd'],
    gradient: 'from-amber-600 via-orange-700 to-zinc-900',
    iconType: 'Cloud',
    visibility: 'public',
    createdAt: '2 months ago',
    members: [
      {
        id: 'mem-d1',
        name: "Liam O'Connor",
        handle: '@liam_ops',
        role: 'Founder & SRE Lead',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
        rep: '2,240',
        email: 'liam.oconnor@dev.io',
      },
    ],
    notes: [
      {
        id: 'note-d-1',
        title: 'Hardening Multi-Stage Dockerfiles for Production Node.js',
        excerpt: 'Shrinking image sizes from 1.2GB down to 85MB while dropping root privileges and CVE vulnerabilities.',
        content: `A secure, hardened multi-stage container configuration:

\`\`\`dockerfile
# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Production Minimal Runner
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --omit=dev
USER appuser
EXPOSE 3000
CMD ["node", "dist/index.js"]
\`\`\`

Never run container processes as the default root user in production environments.`,
        author: "Liam O'Connor",
        authorHandle: '@liam_ops',
        authorRole: 'Founder',
        authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80',
        publishedAt: '5 days ago',
        readTime: '4 min read',
        tags: ['docker', 'devops', 'security'],
        claps: 78,
        unicorns: 35,
        commentsCount: 12,
      },
    ],
  },
];

export function DevHubsManagerView({
  currentUser,
  userEmail = 'dev@company.io',
  isDarkMode = false,
  initialHubName = null,
  initialCreateOpen = false,
}) {
  // Load hubs from localStorage or fallback
  const [hubs, setHubs] = useState(() => {
    try {
      const saved = localStorage.getItem('overstack_dev_hubs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_DEV_HUBS;
  });

  // Track previous prop values to adjust state during render (standard React pattern)
  const [prevInitialHub, setPrevInitialHub] = useState(initialHubName);
  const [prevCreateOpen, setPrevCreateOpen] = useState(initialCreateOpen);

  // Active selected hub ID (null means directory view)
  const [selectedHubId, setSelectedHubId] = useState(() => {
    if (initialHubName) {
      const matched = INITIAL_DEV_HUBS.find(
        (h) => h.name.toLowerCase() === initialHubName.toLowerCase() || h.slug === initialHubName.toLowerCase()
      );
      if (matched) return matched.id;
    }
    return null;
  });

  if (initialHubName !== prevInitialHub) {
    setPrevInitialHub(initialHubName);
    if (initialHubName) {
      const matched = hubs.find(
        (h) =>
          h.name.toLowerCase() === initialHubName.toLowerCase() ||
          h.slug === initialHubName.toLowerCase() ||
          h.id === initialHubName
      );
      setSelectedHubId(matched ? matched.id : null);
    } else {
      setSelectedHubId(null);
    }
  }

  // Modals
  const [isCreateHubModalOpen, setIsCreateHubModalOpen] = useState(initialCreateOpen);

  if (initialCreateOpen !== prevCreateOpen) {
    setPrevCreateOpen(initialCreateOpen);
    if (initialCreateOpen) {
      setIsCreateHubModalOpen(true);
    }
  }

  // Track active hub tab ('notes' | 'members' | 'about')
  const [hubTab, setHubTab] = useState('notes');

  // Search & filter state in directory
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const [isPostNoteModalOpen, setIsPostNoteModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [readingNote, setReadingNote] = useState(null);
  const [copiedCodeIdx, setCopiedCodeIdx] = useState(null);

  // Create Hub Form State
  const [newHubName, setNewHubName] = useState('');
  const [newHubDescription, setNewHubDescription] = useState('');
  const [newHubCategory, setNewHubCategory] = useState('Frontend');
  const [newHubTags, setNewHubTags] = useState('react, typescript');
  const [newHubVisibility, setNewHubVisibility] = useState('public');
  const [newHubGradient, setNewHubGradient] = useState('from-cyan-600 via-blue-600 to-indigo-900');
  const [newHubIcon, setNewHubIcon] = useState('Layers');

  // Post Note Form State
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteExcerpt, setNewNoteExcerpt] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [newNoteTags, setNewNoteTags] = useState('javascript, architecture');
  const [newNoteReadTime, setNewNoteReadTime] = useState('4 min read');

  // Invite Member Form State
  const [inviteName, setInviteName] = useState('');
  const [inviteHandle, setInviteHandle] = useState('');
  const [inviteRole, setInviteRole] = useState('Contributor');

  // Sync to localStorage
  const saveHubs = (updated) => {
    setHubs(updated);
    try {
      localStorage.setItem('overstack_dev_hubs', JSON.stringify(updated));
      window.dispatchEvent(new Event('dev_hubs_updated'));
    } catch {
      // ignore
    }
  };

  // Current active hub
  const activeHub = hubs.find((h) => h.id === selectedHubId) || null;

  // Check if current user is a member of a hub
  const isUserMember = (hub) => {
    if (!hub || !hub.members) return false;
    const userEmailNorm = (currentUser?.email || userEmail || '').toLowerCase();
    const userNameNorm = (currentUser?.name || userEmail?.split('@')[0] || '').toLowerCase();
    return hub.members.some(
      (m) =>
        (m.email && m.email.toLowerCase() === userEmailNorm) ||
        (m.name && m.name.toLowerCase() === userNameNorm) ||
        m.id === 'user-current'
    );
  };

  // Join or leave hub
  const toggleJoinHub = (hubId, e) => {
    if (e) e.stopPropagation();
    const currentMemberObj = {
      id: 'user-current',
      name: currentUser?.name || userEmail.split('@')[0] || 'Junior Garcia',
      handle: `@${(currentUser?.name || userEmail.split('@')[0] || 'dev').toLowerCase().replace(/\s+/g, '_')}`,
      role: 'Member',
      avatar: currentUser?.avatar || '',
      rep: '1,420',
      email: currentUser?.email || userEmail,
    };

    const updated = hubs.map((h) => {
      if (h.id !== hubId) return h;
      const alreadyMember = isUserMember(h);
      if (alreadyMember) {
        // Leave
        return {
          ...h,
          members: h.members.filter(
            (m) =>
              m.id !== 'user-current' &&
              m.email?.toLowerCase() !== (currentUser?.email || userEmail).toLowerCase()
          ),
        };
      } else {
        // Join
        return {
          ...h,
          members: [...h.members, currentMemberObj],
        };
      }
    });

    saveHubs(updated);
  };

  // Create new Hub
  const handleCreateHub = (e) => {
    e.preventDefault();
    if (!newHubName.trim()) return;

    const creatorMember = {
      id: 'user-current',
      name: currentUser?.name || userEmail.split('@')[0] || 'Junior Garcia',
      handle: `@${(currentUser?.name || userEmail.split('@')[0] || 'dev').toLowerCase().replace(/\s+/g, '_')}`,
      role: 'Founder & Admin',
      avatar: currentUser?.avatar || '',
      rep: '1,420',
      email: currentUser?.email || userEmail,
    };

    const newHub = {
      id: generateId('hub'),
      name: newHubName.trim(),
      slug: newHubName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category: newHubCategory,
      description: newHubDescription.trim() || 'A community space for developers to share architectural notes and collaborate.',
      tags: newHubTags.split(',').map((t) => t.trim().toLowerCase().replace(/^#/, '')).filter(Boolean),
      gradient: newHubGradient,
      iconType: newHubIcon,
      visibility: newHubVisibility,
      createdAt: 'Just now',
      members: [creatorMember],
      notes: [],
    };

    const updated = [newHub, ...hubs];
    saveHubs(updated);
    setSelectedHubId(newHub.id);
    setIsCreateHubModalOpen(false);
    setNewHubName('');
    setNewHubDescription('');
  };

  // Post Note directly to active Hub
  const handlePostNote = (e) => {
    e.preventDefault();
    if (!newNoteTitle.trim() || !activeHub) return;

    const newNote = {
      id: generateId('note'),
      title: newNoteTitle.trim(),
      excerpt: newNoteExcerpt.trim() || newNoteTitle.trim(),
      content: newNoteContent.trim() || newNoteExcerpt.trim() || newNoteTitle.trim(),
      author: currentUser?.name || userEmail.split('@')[0] || 'Junior Garcia',
      authorHandle: `@${(currentUser?.name || userEmail.split('@')[0] || 'dev').toLowerCase().replace(/\s+/g, '_')}`,
      authorRole: isUserMember(activeHub) ? 'Member' : 'Contributor',
      authorAvatar: currentUser?.avatar || '',
      publishedAt: 'Just now',
      readTime: newNoteReadTime || '3 min read',
      tags: newNoteTags.split(',').map((t) => t.trim().toLowerCase().replace(/^#/, '')).filter(Boolean),
      claps: 1,
      unicorns: 1,
      commentsCount: 0,
    };

    const updated = hubs.map((h) => {
      if (h.id !== activeHub.id) return h;
      return {
        ...h,
        notes: [newNote, ...(h.notes || [])],
      };
    });

    saveHubs(updated);
    setIsPostNoteModalOpen(false);
    setNewNoteTitle('');
    setNewNoteExcerpt('');
    setNewNoteContent('');
  };

  // Invite member to Hub
  const handleInviteMember = (e) => {
    e.preventDefault();
    if (!inviteName.trim() || !activeHub) return;

    const newMember = {
      id: generateId('mem'),
      name: inviteName.trim(),
      handle: inviteHandle.trim().startsWith('@') ? inviteHandle.trim() : `@${inviteHandle.trim().toLowerCase().replace(/\s+/g, '_') || 'dev'}`,
      role: inviteRole,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      rep: '1,200',
      email: `${inviteName.toLowerCase().replace(/\s+/g, '.')}@dev.io`,
    };

    const updated = hubs.map((h) => {
      if (h.id !== activeHub.id) return h;
      return {
        ...h,
        members: [...(h.members || []), newMember],
      };
    });

    saveHubs(updated);
    setIsInviteModalOpen(false);
    setInviteName('');
    setInviteHandle('');
  };

  // Toggle Like on group note
  const toggleNoteLike = (noteId, e) => {
    if (e) e.stopPropagation();
    if (!activeHub) return;

    const updated = hubs.map((h) => {
      if (h.id !== activeHub.id) return h;
      return {
        ...h,
        notes: h.notes.map((n) =>
          n.id === noteId ? { ...n, claps: n.isLiked ? n.claps - 1 : n.claps + 1, isLiked: !n.isLiked } : n
        ),
      };
    });
    saveHubs(updated);
  };

  // Toggle Unicorn on group note
  const toggleNoteUnicorn = (noteId, e) => {
    if (e) e.stopPropagation();
    if (!activeHub) return;

    const updated = hubs.map((h) => {
      if (h.id !== activeHub.id) return h;
      return {
        ...h,
        notes: h.notes.map((n) =>
          n.id === noteId
            ? {
                ...n,
                unicorns: n.isUnicorned ? (n.unicorns || 1) - 1 : (n.unicorns || 0) + 1,
                isUnicorned: !n.isUnicorned,
              }
            : n
        ),
      };
    });
    saveHubs(updated);
  };

  // Render Hub Icon
  const renderIcon = (type, className = 'w-5 h-5') => {
    switch (type) {
      case 'Server':
        return <Server className={className} />;
      case 'Cpu':
        return <Cpu className={className} />;
      case 'Cloud':
        return <Cloud className={className} />;
      case 'Terminal':
        return <Terminal className={className} />;
      case 'Code2':
        return <Code2 className={className} />;
      case 'Users':
        return <Users className={className} />;
      case 'Layers':
      default:
        return <Layers className={className} />;
    }
  };

  // Render Note Content with syntax code block support
  const renderNoteBody = (content) => {
    if (!content) return null;
    if (!content.includes('```')) {
      return (
        <div className="pt-2 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal text-slate-700 dark:text-zinc-300">
          {content}
        </div>
      );
    }

    const segments = content.split(/(```[\s\S]*?```)/g);
    return (
      <div className="pt-2 space-y-4 text-sm sm:text-base leading-relaxed font-normal text-slate-700 dark:text-zinc-300">
        {segments.map((seg, idx) => {
          if (seg.startsWith('```') && seg.endsWith('```')) {
            const lines = seg.slice(3, -3).trim().split('\n');
            let lang = 'code';
            let codeBody = seg.slice(3, -3).trim();
            if (lines[0] && !lines[0].includes(' ') && lines[0].length < 15) {
              lang = lines[0].trim();
              codeBody = lines.slice(1).join('\n');
            }
            return (
              <div
                key={idx}
                className="my-3 rounded-2xl overflow-hidden border border-zinc-800 bg-[#0d1117] font-mono text-xs sm:text-sm text-zinc-200 shadow-md"
              >
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                    <span className="ml-2 font-bold text-emerald-400">{lang}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(codeBody);
                      setCopiedCodeIdx(idx);
                      setTimeout(() => setCopiedCodeIdx(null), 2000);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-semibold cursor-pointer transition-colors"
                  >
                    {copiedCodeIdx === idx ? '✓ Copied' : 'Copy Code'}
                  </button>
                </div>
                <pre className="p-4 overflow-x-auto text-emerald-300/90 whitespace-pre scrollbar-thin">
                  <code>{codeBody}</code>
                </pre>
              </div>
            );
          }
          return (
            <div key={idx} className="whitespace-pre-line">
              {seg}
            </div>
          );
        })}
      </div>
    );
  };

  // Filtered Hubs in directory
  const filteredHubs = hubs.filter((hub) => {
    if (categoryFilter === 'My Squads') {
      if (!isUserMember(hub)) return false;
    } else if (categoryFilter !== 'All') {
      if (hub.category?.toLowerCase() !== categoryFilter.toLowerCase()) return false;
    }

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      hub.name.toLowerCase().includes(q) ||
      hub.description.toLowerCase().includes(q) ||
      hub.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div
      className={`min-h-screen p-4 sm:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-200 ${
        isDarkMode ? 'text-zinc-200' : 'text-slate-800'
      }`}
    >
      {/* -------------------------------------------------------------------------- */}
      {/* VIEW A: SPECIFIC DEV HUB & MEMBER NOTES WORKSPACE                           */}
      {/* -------------------------------------------------------------------------- */}
      {activeHub ? (
        <div className="space-y-6">
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => setSelectedHubId(null)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer hover:border-emerald-500 hover:text-emerald-500 bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← All Dev Hubs &amp; Squads</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPostNoteModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <PenLine className="w-3.5 h-3.5" />
                <span>Post Note to Group</span>
              </button>
            </div>
          </div>

          {/* Group Header Hero Banner */}
          <div
            className={`rounded-3xl border p-6 sm:p-8 bg-gradient-to-r ${activeHub.gradient} text-white shadow-xl relative overflow-hidden space-y-5`}
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-3.5">
                <div className="p-3.5 rounded-2xl bg-white/15 backdrop-blur-md shadow-md border border-white/20">
                  {renderIcon(activeHub.iconType, 'w-7 h-7 text-white')}
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase tracking-wider bg-white/20 text-white border border-white/30">
                      {activeHub.category}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                      {activeHub.visibility === 'public' ? '🌐 Public Open Hub' : '🔒 Members Only'}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{activeHub.name}</h1>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  type="button"
                  onClick={(e) => toggleJoinHub(activeHub.id, e)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-sm ${
                    isUserMember(activeHub)
                      ? 'bg-white/20 hover:bg-red-500/80 text-white border border-white/30'
                      : 'bg-white text-zinc-900 hover:bg-emerald-50'
                  }`}
                >
                  {isUserMember(activeHub) ? '✓ Joined (Leave)' : '+ Join Group'}
                </button>

                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl text-xs font-bold bg-black/30 hover:bg-black/50 text-white border border-white/20 transition-all cursor-pointer"
                >
                  + Invite Member
                </button>
              </div>
            </div>

            <p className="text-sm sm:text-base text-white/90 max-w-3xl leading-relaxed relative z-10">
              {activeHub.description}
            </p>

            {/* Tags & Quick Stats Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/20 relative z-10 text-xs font-medium">
              <div className="flex flex-wrap gap-1.5">
                {activeHub.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-bold bg-black/30 text-white/90 border border-white/20"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-5 text-white/90 font-mono text-xs">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <strong>{activeHub.members?.length || 0}</strong> Members
                </span>
                <span className="flex items-center gap-1.5">
                  <PenLine className="w-3.5 h-3.5" />
                  <strong>{activeHub.notes?.length || 0}</strong> Published Notes
                </span>
              </div>
            </div>
          </div>

          {/* Hub Tab Switcher */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-zinc-800 pb-3">
            <button
              type="button"
              onClick={() => setHubTab('notes')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                hubTab === 'notes'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : isDarkMode
                  ? 'bg-zinc-800/80 text-zinc-400 hover:text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <PenLine className="w-3.5 h-3.5" />
              <span>Group Notes ({activeHub.notes?.length || 0})</span>
            </button>

            <button
              type="button"
              onClick={() => setHubTab('members')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                hubTab === 'members'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : isDarkMode
                  ? 'bg-zinc-800/80 text-zinc-400 hover:text-white'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Group Members ({activeHub.members?.length || 0})</span>
            </button>
          </div>

          {/* TAB 1: GROUP NOTES FEED */}
          {hubTab === 'notes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Notes from Group Members</h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    Engineering solutions, architectural patterns, and updates shared by members of this group.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPostNoteModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-emerald-500 hover:bg-emerald-500/10 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Write Note to Group</span>
                </button>
              </div>

              {activeHub.notes?.length === 0 ? (
                <div
                  className={`p-12 text-center rounded-3xl border space-y-4 ${
                    isDarkMode ? 'bg-[#18181b] border-zinc-800 text-zinc-400' : 'bg-white border-slate-200 text-slate-500'
                  }`}
                >
                  <PenLine className="w-10 h-10 mx-auto text-emerald-500/60" />
                  <p className="text-sm font-medium">
                    No notes published to this group yet. Be the first group member to publish an engineering note!
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsPostNoteModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all cursor-pointer shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Publish First Group Note</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeHub.notes.map((note) => (
                    <article
                      key={note.id}
                      onClick={() => setReadingNote(note)}
                      className={`rounded-3xl border p-6 space-y-4 transition-all hover:border-emerald-500/50 cursor-pointer shadow-xs ${
                        isDarkMode
                          ? 'bg-[#18181b] border-zinc-800/80 text-zinc-200'
                          : 'bg-white border-slate-200/80 text-slate-800'
                      }`}
                    >
                      {/* Author Header */}
                      <div className="flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5">
                          {note.authorAvatar ? (
                            <img
                              src={note.authorAvatar}
                              alt={note.author}
                              className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-zinc-700"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs">
                              {note.author.substring(0, 2).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-bold text-slate-900 dark:text-white">{note.author}</span>
                              <span className="text-zinc-500 font-mono text-[11px]">{note.authorHandle}</span>
                              {note.authorRole && (
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                                  {note.authorRole}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-zinc-400 font-mono flex items-center gap-2">
                              <span>{note.publishedAt}</span>
                              <span>•</span>
                              <span>⏱️ {note.readTime}</span>
                            </div>
                          </div>
                        </div>

                        <span className="px-2.5 py-1 rounded-xl text-[11px] font-mono font-bold bg-slate-100 dark:bg-zinc-800 text-emerald-500">
                          {activeHub.name}
                        </span>
                      </div>

                      {/* Note Title & Excerpt */}
                      <div className="space-y-1.5">
                        <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white hover:text-emerald-500 transition-colors">
                          {note.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 line-clamp-3 leading-relaxed">
                          {note.excerpt}
                        </p>
                      </div>

                      {/* Code preview banner if note contains code block */}
                      {note.content?.includes('```') && (
                        <div className="p-3 rounded-xl bg-[#0d1117] border border-zinc-800 font-mono text-[11px] text-emerald-400 flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Includes production code snippet</span>
                          </span>
                          <span className="text-zinc-500 text-[10px]">Click note to inspect &amp; copy →</span>
                        </div>
                      )}

                      {/* Tags & Reactions Bar */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-zinc-800/80 text-xs">
                        <div className="flex flex-wrap gap-1.5">
                          {note.tags?.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md font-mono text-[10px] bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400"
                            >
                              #{t}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center gap-4">
                          <button
                            type="button"
                            onClick={(e) => toggleNoteLike(note.id, e)}
                            className="flex items-center gap-1.5 hover:text-red-500 transition-colors cursor-pointer group"
                            title="Appreciate note"
                          >
                            <Heart
                              className={`w-3.5 h-3.5 group-hover:scale-110 transition-transform ${
                                note.isLiked ? 'text-red-500 fill-red-500' : ''
                              }`}
                            />
                            <span>{note.claps || 0}</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => toggleNoteUnicorn(note.id, e)}
                            className="flex items-center gap-1 hover:scale-110 transition-transform cursor-pointer"
                            title="Unicorn reaction"
                          >
                            <span>🦄</span>
                            <span>{note.unicorns || 0}</span>
                          </button>

                          <span className="flex items-center gap-1.5 text-zinc-400">
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>{note.commentsCount || 0}</span>
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: GROUP MEMBERS */}
          {hubTab === 'members' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">Group Members &amp; Collaborators</h3>
                  <p className="text-xs text-slate-500 dark:text-zinc-400">
                    Developers who belong to this hub and publish engineering notes.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Invite Developer</span>
                </button>
              </div>

              <div
                className={`rounded-3xl border divide-y overflow-hidden shadow-xs ${
                  isDarkMode
                    ? 'bg-[#18181b] border-zinc-800 divide-zinc-800'
                    : 'bg-white border-slate-200 divide-slate-100'
                }`}
              >
                {activeHub.members.map((member) => (
                  <div key={member.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      {member.avatar ? (
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-zinc-700"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs">
                          {member.name.substring(0, 2).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">{member.name}</h4>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            {member.role}
                          </span>
                        </div>
                        <div className="text-xs text-zinc-500 font-mono flex items-center gap-2 mt-0.5">
                          <span>{member.handle}</span>
                          <span>•</span>
                          <span className="text-amber-500 font-bold flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            {member.rep} Rep
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="text-xs font-mono text-zinc-400 hidden sm:inline-block">
                      {member.email}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* -------------------------------------------------------------------------- */
        /* VIEW B: ALL DEV HUBS & GROUPS DIRECTORY                                     */
        /* -------------------------------------------------------------------------- */
        <div className="space-y-6">
          {/* Directory Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6 dark:border-zinc-800 border-slate-200">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  Dev Hubs &amp; Squads
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Engineering Workspaces</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Developer Community Hubs</h1>
              <p className="text-sm mt-1 text-slate-500 dark:text-zinc-400 max-w-2xl">
                Create or join specialized developer groups. Collaborate with squad members and read exclusive technical notes published within each hub.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsCreateHubModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm text-white bg-emerald-500 hover:bg-emerald-600 shadow-md transition-all active:scale-95 cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Create Dev Hub</span>
            </button>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search hubs by name, tech stack (#react, #kafka)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs outline-none focus:border-emerald-500 transition-colors ${
                  isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-slate-200 text-slate-900'
                }`}
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {['All', 'Frontend', 'Backend', 'AI & ML', 'DevOps', 'My Squads'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-emerald-500 text-white shadow-xs font-extrabold'
                      : isDarkMode
                      ? 'bg-zinc-800/80 text-zinc-400 hover:text-white'
                      : 'bg-slate-200/80 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Hubs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredHubs.map((hub) => (
              <div
                key={hub.id}
                onClick={() => setSelectedHubId(hub.id)}
                className={`rounded-3xl border overflow-hidden flex flex-col justify-between transition-all hover:scale-[1.01] hover:shadow-xl hover:border-emerald-500/60 cursor-pointer ${
                  isDarkMode
                    ? 'bg-[#18181b] border-zinc-800 text-zinc-200 shadow-md'
                    : 'bg-white border-slate-200 text-slate-800 shadow-xs'
                }`}
              >
                <div>
                  {/* Top Gradient Banner */}
                  <div className={`p-6 bg-gradient-to-r ${hub.gradient} text-white relative space-y-3`}>
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-white/20 backdrop-blur-md">
                        {renderIcon(hub.iconType, 'w-5 h-5 text-white')}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-white/20 border border-white/30 text-white">
                          {hub.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-black/30 border border-white/20 text-white">
                          {hub.visibility === 'public' ? 'Public' : 'Private'}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-xl font-extrabold tracking-tight">{hub.name}</h3>
                    <p className="text-xs text-white/90 line-clamp-2 leading-relaxed">
                      {hub.description}
                    </p>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {hub.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md font-mono text-[10px] bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 font-semibold"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    {/* Member Avatars Preview */}
                    <div className="pt-2 flex items-center justify-between text-xs text-zinc-500">
                      <div className="flex items-center -space-x-2">
                        {hub.members?.slice(0, 4).map((m, i) => (
                          <img
                            key={i}
                            src={m.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                            alt={m.name}
                            className="w-7 h-7 rounded-full object-cover border-2 border-white dark:border-zinc-900"
                          />
                        ))}
                        {hub.members?.length > 4 && (
                          <div className="w-7 h-7 rounded-full bg-zinc-700 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-zinc-900">
                            +{hub.members.length - 4}
                          </div>
                        )}
                      </div>

                      <div className="font-mono text-xs text-slate-600 dark:text-zinc-400">
                        <span>📝 {hub.notes?.length || 0} Member Notes</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="px-5 py-3.5 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-500 hover:underline">
                    Enter Hub Workspace →
                  </span>
                  <button
                    type="button"
                    onClick={(e) => toggleJoinHub(hub.id, e)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                      isUserMember(hub)
                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                        : isDarkMode
                        ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isUserMember(hub) ? '✓ Member' : '+ Join Hub'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* MODAL 1: CREATE DEV HUB / GROUP                                            */}
      {/* -------------------------------------------------------------------------- */}
      {isCreateHubModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 cursor-pointer"
          onClick={() => setIsCreateHubModalOpen(false)}
        >
          <div
            className={`relative w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border cursor-default space-y-5 ${
              isDarkMode ? 'bg-[#18181b] border-zinc-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-zinc-800/60">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Plus className="h-4 w-4" />
                </div>
                <h3 className="text-lg font-bold">Create New Dev Hub / Group</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateHubModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateHub} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                  Group / Hub Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js 15 & Server Actions Squad"
                  value={newHubName}
                  onChange={(e) => setNewHubName(e.target.value)}
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-xs focus:outline-none focus:border-emerald-500 ${
                    isDarkMode
                      ? 'bg-zinc-900/90 border-zinc-800 text-white placeholder-zinc-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                    Category Track
                  </label>
                  <select
                    value={newHubCategory}
                    onChange={(e) => setNewHubCategory(e.target.value)}
                    className={`w-full rounded-xl border px-3 py-2.5 text-xs focus:outline-none focus:border-emerald-500 ${
                      isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="Frontend">Frontend &amp; UI</option>
                    <option value="Backend">Backend &amp; Distributed</option>
                    <option value="AI & ML">AI &amp; Autonomous Agents</option>
                    <option value="DevOps">DevOps &amp; Cloud</option>
                    <option value="Mobile">Mobile &amp; Cross-Platform</option>
                    <option value="Security">Security &amp; Web3</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                    Visibility
                  </label>
                  <select
                    value={newHubVisibility}
                    onChange={(e) => setNewHubVisibility(e.target.value)}
                    className={`w-full rounded-xl border px-3 py-2.5 text-xs focus:outline-none focus:border-emerald-500 ${
                      isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="public">🌐 Public (Anyone can join)</option>
                    <option value="members_only">🔒 Members Only (Invite required)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                  Tech Stack Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. react, nextjs, typescript, tailwind"
                  value={newHubTags}
                  onChange={(e) => setNewHubTags(e.target.value)}
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-xs focus:outline-none focus:border-emerald-500 ${
                    isDarkMode
                      ? 'bg-zinc-900/90 border-zinc-800 text-white placeholder-zinc-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                  Purpose &amp; Mission Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Explain the goals of this hub and what kind of notes members will publish..."
                  value={newHubDescription}
                  onChange={(e) => setNewHubDescription(e.target.value)}
                  className={`w-full rounded-xl border p-3 text-xs focus:outline-none focus:border-emerald-500 resize-none ${
                    isDarkMode
                      ? 'bg-zinc-900/90 border-zinc-800 text-white placeholder-zinc-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              {/* Hub Icon Selector */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                  Hub Icon Symbol
                </label>
                <div className="flex items-center gap-2 flex-wrap">
                  {['Layers', 'Server', 'Cpu', 'Cloud', 'Terminal', 'Code2', 'Users'].map((ic) => (
                    <button
                      key={ic}
                      type="button"
                      onClick={() => setNewHubIcon(ic)}
                      className={`p-2 rounded-xl border transition-all cursor-pointer ${
                        newHubIcon === ic
                          ? 'bg-emerald-500 text-white border-emerald-500 shadow-xs'
                          : 'bg-slate-100 dark:bg-zinc-850 text-slate-600 dark:text-zinc-400 border-transparent hover:bg-slate-200 dark:hover:bg-zinc-800'
                      }`}
                      title={ic}
                    >
                      {renderIcon(ic, 'w-4 h-4')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme Gradient Picker */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                  Cover Theme Gradient
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { label: 'Cyan', val: 'from-cyan-600 via-blue-600 to-indigo-900' },
                    { label: 'Emerald', val: 'from-emerald-600 via-teal-700 to-zinc-900' },
                    { label: 'Purple', val: 'from-purple-600 via-fuchsia-700 to-zinc-900' },
                    { label: 'Amber', val: 'from-amber-600 via-orange-700 to-zinc-900' },
                    { label: 'Rose', val: 'from-rose-600 via-pink-700 to-zinc-900' },
                  ].map((grad) => (
                    <button
                      key={grad.label}
                      type="button"
                      onClick={() => setNewHubGradient(grad.val)}
                      className={`h-8 rounded-xl bg-gradient-to-r ${grad.val} border-2 transition-all cursor-pointer ${
                        newHubGradient === grad.val ? 'border-white scale-105 shadow-md' : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                      title={grad.label}
                    />
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200/60 dark:border-zinc-800/60">
                <button
                  type="button"
                  onClick={() => setIsCreateHubModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  Create &amp; Launch Hub
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* MODAL 2: POST NOTE TO GROUP                                                */}
      {/* -------------------------------------------------------------------------- */}
      {isPostNoteModalOpen && activeHub && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 cursor-pointer"
          onClick={() => setIsPostNoteModalOpen(false)}
        >
          <div
            className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border cursor-default space-y-5 max-h-[90vh] overflow-y-auto ${
              isDarkMode ? 'bg-[#18181b] border-zinc-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-zinc-800/60">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <PenLine className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Publish Note to {activeHub.name}</h3>
                  <p className="text-xs text-slate-400">All members of this group will be able to read and interact with your note.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsPostNoteModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePostNote} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                  Note Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Solving Memory Leaks in Node.js Streams"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-xs focus:outline-none focus:border-emerald-500 ${
                    isDarkMode
                      ? 'bg-zinc-900/90 border-zinc-800 text-white placeholder-zinc-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                  Short Excerpt / Summary *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Quick summary of the pattern or takeaway..."
                  value={newNoteExcerpt}
                  onChange={(e) => setNewNoteExcerpt(e.target.value)}
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-xs focus:outline-none focus:border-emerald-500 ${
                    isDarkMode
                      ? 'bg-zinc-900/90 border-zinc-800 text-white placeholder-zinc-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. nodejs, streams, memory"
                    value={newNoteTags}
                    onChange={(e) => setNewNoteTags(e.target.value)}
                    className={`w-full rounded-xl border px-3.5 py-2.5 text-xs focus:outline-none focus:border-emerald-500 ${
                      isDarkMode
                        ? 'bg-zinc-900/90 border-zinc-800 text-white placeholder-zinc-500'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 4 min read"
                    value={newNoteReadTime}
                    onChange={(e) => setNewNoteReadTime(e.target.value)}
                    className={`w-full rounded-xl border px-3.5 py-2.5 text-xs focus:outline-none focus:border-emerald-500 ${
                      isDarkMode
                        ? 'bg-zinc-900/90 border-zinc-800 text-white placeholder-zinc-500'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                    Technical Content &amp; Code Blocks *
                  </label>
                  <span className="text-[11px] font-mono text-emerald-500">
                    Supports ```javascript / ```python
                  </span>
                </div>
                <textarea
                  rows={8}
                  required
                  placeholder={`Write your note details here...\n\n\`\`\`javascript\n// Put code snippets here\nfunction example() {\n  return "Works seamlessly";\n}\n\`\`\``}
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  className={`w-full rounded-xl border p-3 font-mono text-xs focus:outline-none focus:border-emerald-500 resize-none ${
                    isDarkMode
                      ? 'bg-zinc-900/90 border-zinc-800 text-white placeholder-zinc-500'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200/60 dark:border-zinc-800/60">
                <button
                  type="button"
                  onClick={() => setIsPostNoteModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-sm active:scale-95 transition-all cursor-pointer"
                >
                  Publish Note to Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* MODAL 3: INVITE MEMBER TO GROUP                                            */}
      {/* -------------------------------------------------------------------------- */}
      {isInviteModalOpen && activeHub && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 cursor-pointer"
          onClick={() => setIsInviteModalOpen(false)}
        >
          <div
            className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 shadow-2xl border cursor-default space-y-5 ${
              isDarkMode ? 'bg-[#18181b] border-zinc-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-zinc-800/60">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                  <Users className="h-4 w-4" />
                </div>
                <h3 className="text-lg font-bold">Invite Member to {activeHub.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleInviteMember} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                  Developer Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jason Myers"
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-xs focus:outline-none focus:border-emerald-500 ${
                    isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                  Dev Handle
                </label>
                <input
                  type="text"
                  placeholder="@jason_dev"
                  value={inviteHandle}
                  onChange={(e) => setInviteHandle(e.target.value)}
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-xs focus:outline-none focus:border-emerald-500 ${
                    isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                  Member Role
                </label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className={`w-full rounded-xl border px-3 py-2.5 text-xs focus:outline-none focus:border-emerald-500 ${
                    isDarkMode ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                >
                  <option value="Contributor">Contributor (Can post engineering notes)</option>
                  <option value="Maintainer">Maintainer (Manage notes &amp; members)</option>
                  <option value="Member">Member (Read &amp; react to notes)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200/60 dark:border-zinc-800/60">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-sm transition-all cursor-pointer"
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------------------- */}
      {/* MODAL 4: NOTE READER MODAL (WITH SYNTAX CODE BLOCKS & COPY BUTTON)         */}
      {/* -------------------------------------------------------------------------- */}
      {readingNote && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150 cursor-pointer"
          onClick={() => setReadingNote(null)}
        >
          <div
            className={`relative w-full max-w-3xl rounded-3xl p-6 sm:p-8 shadow-2xl border cursor-default space-y-5 max-h-[90vh] overflow-y-auto ${
              isDarkMode ? 'bg-[#18181b] border-zinc-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-zinc-800/60">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                  📝
                </div>
                <div>
                  <span className="text-[11px] font-mono text-emerald-500 font-bold">
                    Group Member Note
                  </span>
                  <p className="text-xs text-zinc-400">Published in {activeHub?.name || 'Dev Hub'}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setReadingNote(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Note Header */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {readingNote.title}
              </h1>

              <div className="flex items-center gap-3 text-xs">
                {readingNote.authorAvatar ? (
                  <img
                    src={readingNote.authorAvatar}
                    alt={readingNote.author}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-zinc-700"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs">
                    {readingNote.author.substring(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{readingNote.author}</span>
                    <span className="text-zinc-500 font-mono text-[11px]">{readingNote.authorHandle}</span>
                    {readingNote.authorRole && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        {readingNote.authorRole}
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-zinc-400 font-mono flex items-center gap-2">
                    <span>{readingNote.publishedAt}</span>
                    <span>•</span>
                    <span>⏱️ {readingNote.readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Note Content */}
            <div className="border-t border-slate-100 dark:border-zinc-800/80 pt-4">
              {renderNoteBody(readingNote.content)}
            </div>

            {/* Tags & Action Footer */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200/60 dark:border-zinc-800/60 text-xs">
              <div className="flex flex-wrap gap-1.5">
                {readingNote.tags?.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-lg font-mono text-[11px] bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 font-semibold"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={(e) => toggleNoteLike(readingNote.id, e)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-red-500 transition-colors cursor-pointer"
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      readingNote.isLiked ? 'text-red-500 fill-red-500' : ''
                    }`}
                  />
                  <span>{readingNote.claps || 0} Likes</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => toggleNoteUnicorn(readingNote.id, e)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:scale-105 transition-transform cursor-pointer"
                >
                  <span>🦄</span>
                  <span>{readingNote.unicorns || 0} Unicorns</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default DevHubsManagerView;
