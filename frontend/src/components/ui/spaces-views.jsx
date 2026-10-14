import { useState } from 'react';
import {
  Copy,
  Check,
  Palette,
  Type,
  Users,
  Plus,
  Trash2,
  Layers,
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                            1. DESIGN TOKENS VIEW                           */
/* -------------------------------------------------------------------------- */
export function DesignTokensView({ isDarkMode = false }) {
  const [copiedToken, setCopiedToken] = useState(null);

  const copyToken = (val, name) => {
    navigator.clipboard.writeText(val);
    setCopiedToken(name);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const TOKENS = [
    { name: '--color-primary', val: '#2FA084', desc: 'Primary Emerald Accent' },
    { name: '--color-canvas-dark', val: '#222831', desc: 'Dark Mode Background' },
    { name: '--color-surface-dark', val: '#18181b', desc: 'Dark Mode Card Surface' },
    { name: '--color-canvas-light', val: '#eeeeee', desc: 'Light Mode Background' },
    { name: '--color-surface-light', val: '#ffffff', desc: 'Light Mode Card Surface' },
    { name: '--radius-card', val: '1.5rem (24px)', desc: 'Rounded-3xl Component Corner' },
    { name: '--font-sans', val: 'Inter, system-ui, sans-serif', desc: 'Primary Font Stack' },
  ];

  const SPACING_SCALE = [
    { label: 'space-1', px: '4px', width: 'w-4' },
    { label: 'space-2', px: '8px', width: 'w-8' },
    { label: 'space-3', px: '12px', width: 'w-12' },
    { label: 'space-4', px: '16px', width: 'w-16' },
    { label: 'space-6', px: '24px', width: 'w-24' },
    { label: 'space-8', px: '32px', width: 'w-32' },
    { label: 'space-12', px: '48px', width: 'w-48' },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 space-y-8 animate-in fade-in duration-200">
      <div className="space-y-1 pb-4 border-b border-slate-200/80 dark:border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
            <Layers className="w-5 h-5" />
          </div>
          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Design Tokens
          </h1>
        </div>
        <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
          The atomic foundational design system variables powering the HeroUI publishing workspace.
        </p>
      </div>

      {/* Core Variables Table */}
      <div className={`rounded-3xl border p-6 space-y-4 ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-slate-200/80 shadow-xs'}`}>
        <h3 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          CSS Custom Properties
        </h3>
        <div className="divide-y divide-slate-100 dark:divide-zinc-800">
          {TOKENS.map((token) => (
            <div key={token.name} className="py-3 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <code className="text-xs font-mono font-bold text-emerald-500">{token.name}</code>
                <p className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>{token.desc}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-mono font-medium ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>
                  {token.val}
                </span>
                <button
                  type="button"
                  onClick={() => copyToken(token.val, token.name)}
                  className="p-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="Copy token value"
                >
                  {copiedToken === token.name ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spacing Scale Visualizer */}
      <div className={`rounded-3xl border p-6 space-y-4 ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-slate-200/80 shadow-xs'}`}>
        <h3 className={`font-bold text-base ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
          Spacing Scale
        </h3>
        <div className="space-y-3">
          {SPACING_SCALE.map((s) => (
            <div key={s.label} className="flex items-center gap-4 text-xs font-mono">
              <span className="w-20 text-slate-400">{s.label}</span>
              <span className="w-16 font-semibold">{s.px}</span>
              <div className={`h-4 rounded-md bg-emerald-500/30 border border-emerald-500/60 ${s.width}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            2. COLOR PALETTE VIEW                           */
/* -------------------------------------------------------------------------- */
export function ColorPaletteView({ isDarkMode = false }) {
  const [copiedHex, setCopiedHex] = useState(null);

  const copyHex = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const PALETTES = [
    { name: 'Primary Emerald', hex: '#2FA084', hsl: 'hsl(165, 55%, 41%)', category: 'Accent' },
    { name: 'Emerald Light', hex: '#34D399', hsl: 'hsl(156, 73%, 52%)', category: 'Accent' },
    { name: 'Dark Canvas', hex: '#222831', hsl: 'hsl(216, 18%, 16%)', category: 'Neutral' },
    { name: 'Dark Surface', hex: '#18181b', hsl: 'hsl(240, 6%, 10%)', category: 'Neutral' },
    { name: 'Light Canvas', hex: '#EEEEEE', hsl: 'hsl(0, 0%, 93%)', category: 'Neutral' },
    { name: 'Light Surface', hex: '#FFFFFF', hsl: 'hsl(0, 0%, 100%)', category: 'Neutral' },
    { name: 'Warning Amber', hex: '#F59E0B', hsl: 'hsl(38, 92%, 50%)', category: 'State' },
    { name: 'Danger Rose', hex: '#EF4444', hsl: 'hsl(0, 84%, 60%)', category: 'State' },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 space-y-8 animate-in fade-in duration-200">
      <div className="space-y-1 pb-4 border-b border-slate-200/80 dark:border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
            <Palette className="w-5 h-5" />
          </div>
          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Color Palette Studio
          </h1>
        </div>
        <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
          Click on any color tile to instantly copy its Hex color code.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {PALETTES.map((color) => (
          <div
            key={color.name}
            onClick={() => copyHex(color.hex)}
            className={`rounded-2xl border p-3 space-y-3 cursor-pointer group transition-all hover:scale-[1.02] ${
              isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-slate-200/80 shadow-xs'
            }`}
          >
            <div
              className="w-full h-24 rounded-xl border border-black/10 shadow-inner flex items-end justify-end p-2"
              style={{ backgroundColor: color.hex }}
            >
              {copiedHex === color.hex && (
                <span className="px-2 py-0.5 rounded-md bg-black/80 text-white text-[10px] font-bold">
                  Copied!
                </span>
              )}
            </div>
            <div>
              <h4 className={`font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {color.name}
              </h4>
              <p className="text-[11px] font-mono font-medium text-emerald-500">{color.hex}</p>
              <p className={`text-[10px] font-mono ${isDarkMode ? 'text-zinc-500' : 'text-slate-400'}`}>{color.hsl}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            3. TYPOGRAPHY VIEW                              */
/* -------------------------------------------------------------------------- */
export function TypographyView({ isDarkMode = false }) {
  const [testText, setTestText] = useState('Build stunning apps with HeroUI Labs.');

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 space-y-8 animate-in fade-in duration-200">
      <div className="space-y-1 pb-4 border-b border-slate-200/80 dark:border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
            <Type className="w-5 h-5" />
          </div>
          <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Typography Studio
          </h1>
        </div>
        <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
          Preview typography scale, font pairings, and responsive reading hierarchies.
        </p>
      </div>

      {/* Interactive text tester */}
      <div className={`rounded-2xl border p-4 space-y-2 ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-slate-200/80 shadow-xs'}`}>
        <label className={`text-xs font-semibold ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
          Live Text Playground
        </label>
        <input
          type="text"
          value={testText}
          onChange={(e) => setTestText(e.target.value)}
          placeholder="Type here to test typography..."
          className={`w-full rounded-xl border p-2.5 text-sm outline-none transition-colors ${
            isDarkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
          }`}
        />
      </div>

      <div className={`rounded-3xl border p-6 space-y-6 ${isDarkMode ? 'bg-[#18181b] border-zinc-800' : 'bg-white border-slate-200/80 shadow-xs'}`}>
        <div className="space-y-1 border-b pb-4 dark:border-zinc-800">
          <span className="text-[11px] font-mono text-emerald-500 uppercase font-bold">Heading 1 • 48px</span>
          <h1 className={`text-4xl sm:text-5xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {testText}
          </h1>
        </div>

        <div className="space-y-1 border-b pb-4 dark:border-zinc-800">
          <span className="text-[11px] font-mono text-emerald-500 uppercase font-bold">Heading 2 • 32px</span>
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {testText}
          </h2>
        </div>

        <div className="space-y-1 border-b pb-4 dark:border-zinc-800">
          <span className="text-[11px] font-mono text-emerald-500 uppercase font-bold">Heading 3 • 24px</span>
          <h3 className={`text-xl sm:text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {testText}
          </h3>
        </div>

        <div className="space-y-1 border-b pb-4 dark:border-zinc-800">
          <span className="text-[11px] font-mono text-emerald-500 uppercase font-bold">Body Reading Text • 16px</span>
          <p className={`text-base leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>
            {testText} Modern typography designed for long-form publishing, community articles, and documentation.
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-mono text-emerald-500 uppercase font-bold">Code Monospace • 14px</span>
          <pre className={`p-4 rounded-xl text-xs font-mono overflow-x-auto ${isDarkMode ? 'bg-zinc-900 text-emerald-400' : 'bg-slate-100 text-slate-800'}`}>
            const greeting = "{testText}";
          </pre>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            4. DESIGN TEAM VIEW                             */
/* -------------------------------------------------------------------------- */
export function TeamView({ currentUser, userEmail, isDarkMode = false }) {
  const [members, setMembers] = useState(() => {
    try {
      const saved = localStorage.getItem('workspace_team_members');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: '1',
        name: currentUser?.name || userEmail?.split('@')[0] || 'Junior Garcia',
        email: currentUser?.email || userEmail || 'junior@heroui.com',
        role: 'Admin / Owner',
        avatar: currentUser?.avatar || '',
      },
      {
        id: '2',
        name: 'Sarah Chen',
        email: 'sarah.design@heroui.com',
        role: 'Senior Product Designer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
      },
      {
        id: '3',
        name: 'Alex Rivera',
        email: 'alex.frontend@heroui.com',
        role: 'Staff Frontend Engineer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
      },
    ];
  });

  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteName, setInviteName] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('Editor');

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!inviteName.trim() || !inviteEmail.trim()) return;

    const newMember = {
      id: String(Date.now()),
      name: inviteName.trim(),
      email: inviteEmail.trim(),
      role: inviteRole,
      avatar: '',
    };

    const updated = [...members, newMember];
    setMembers(updated);
    try {
      localStorage.setItem('workspace_team_members', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setInviteName('');
    setInviteEmail('');
    setIsInviteOpen(false);
  };

  const handleRemoveMember = (id) => {
    if (id === '1') {
      alert('Cannot remove the primary workspace owner.');
      return;
    }
    const updated = members.filter((m) => m.id !== id);
    setMembers(updated);
    try {
      localStorage.setItem('workspace_team_members', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8 space-y-8 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-zinc-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
              <Users className="w-5 h-5" />
            </div>
            <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Design Team & Collaborators
            </h1>
          </div>
          <p className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            Manage your workspace authors, design system contributors, and reviewers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsInviteOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all cursor-pointer shadow-xs active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Invite Member Modal */}
      {isInviteOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-md rounded-3xl border p-6 space-y-5 animate-in fade-in duration-150 ${
            isDarkMode ? 'bg-[#18181b] border-zinc-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-xl'
          }`}>
            <h3 className="text-lg font-bold">Invite New Collaborator</h3>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Full Name</label>
                <input
                  type="text"
                  required
                  value={inviteName}
                  onChange={(e) => setInviteName(e.target.value)}
                  placeholder="e.g. Maya Lin"
                  className={`w-full rounded-xl border p-2.5 text-xs outline-none ${
                    isDarkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Email Address</label>
                <input
                  type="email"
                  required
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="maya@company.io"
                  className={`w-full rounded-xl border p-2.5 text-xs outline-none ${
                    isDarkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-400">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className={`w-full rounded-xl border p-2.5 text-xs outline-none ${
                    isDarkMode ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <option value="Editor">Editor (Can create & publish articles)</option>
                  <option value="Contributor">Contributor (Can submit drafts)</option>
                  <option value="Viewer">Viewer (Read-only)</option>
                  <option value="Admin">Admin (Full workspace access)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsInviteOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors shadow-xs"
                >
                  Send Invitation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Members List */}
      <div className={`rounded-3xl border divide-y ${
        isDarkMode ? 'bg-[#18181b] border-zinc-800 divide-zinc-800/80' : 'bg-white border-slate-200/80 divide-slate-100 shadow-xs'
      }`}>
        {members.map((member) => (
          <div key={member.id} className="p-4 sm:p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              {member.avatar ? (
                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200 dark:border-zinc-700" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {member.name.substring(0, 2).toUpperCase()}
                </div>
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className={`font-bold text-sm truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {member.name}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    {member.role}
                  </span>
                </div>
                <p className={`text-xs truncate ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                  {member.email}
                </p>
              </div>
            </div>

            {member.id !== '1' && (
              <button
                type="button"
                onClick={() => handleRemoveMember(member.id)}
                className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
                title="Remove collaborator"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
