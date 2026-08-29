import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  ArrowLeft,
  Image as ImageIcon,
  Heading1,
  Heading2,
  Heading3,
  Type,
  List,
  ListOrdered,
  Quote,
  Code,
  Minus,
  AlertCircle,
  X,
  Sparkles,
  Send,
  Trash2,
  Save,
  Sun,
  Moon,
  UploadCloud,
  Globe,
  Lock,
} from 'lucide-react';
import { createArticleApi } from '@/services/articleService';

export function CreateNotePage({ isDarkMode = false, onToggleTheme, onSaveNote, userEmail = 'junior@heroui.com' }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [showImageInput, setShowImageInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draftSavedStatus, setDraftSavedStatus] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imageInputRef = useRef(null);

  // Close cover image input popover on click outside
  useEffect(() => {
    if (!showImageInput) return;
    const handleClickOutside = (e) => {
      if (imageInputRef.current && !imageInputRef.current.contains(e.target)) {
        setShowImageInput(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showImageInput]);

  // Content blocks array (Notion-like block editor)
  const [blocks, setBlocks] = useState([
    { id: '1', type: 'paragraph', content: '' },
  ]);
  const [activeBlockId, setActiveBlockId] = useState('1');
  const [formatMenuOpenId, setFormatMenuOpenId] = useState(null);

  // Close format menu popover on click outside
  useEffect(() => {
    if (formatMenuOpenId === null) return;
    const handleClickOutside = () => {
      setFormatMenuOpenId(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [formatMenuOpenId]);

  const handleAddBlock = (afterId, type = 'paragraph') => {
    const newBlock = { id: String(Date.now()), type, content: '' };
    const index = blocks.findIndex((b) => b.id === afterId);
    const newBlocks = [...blocks];
    if (index !== -1) {
      newBlocks.splice(index + 1, 0, newBlock);
    } else {
      newBlocks.push(newBlock);
    }
    setBlocks(newBlocks);
    setActiveBlockId(newBlock.id);
    setFormatMenuOpenId(null);
  };

  const handleUpdateBlockContent = (id, content) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, content } : b))
    );
  };

  const handleChangeBlockType = (id, newType) => {
    setBlocks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, type: newType } : b))
    );
    setFormatMenuOpenId(null);
  };

  const handleDeleteBlock = (id) => {
    if (blocks.length <= 1) return;
    setBlocks((prev) => prev.filter((b) => b.id !== id));
  };

  const handleKeyDown = (e, id, index) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddBlock(id, 'paragraph');
    } else if (
      e.key === 'Backspace' &&
      blocks[index].content === '' &&
      blocks.length > 1
    ) {
      e.preventDefault();
      handleDeleteBlock(id);
    }
  };

  const handleSaveDraft = () => {
    if (!title.trim()) {
      alert('Please enter a note title before saving draft');
      return;
    }
    const firstParagraph =
      blocks.find((b) => b.content.trim())?.content || title;
    const noteData = {
      id: String(Date.now()),
      title: title.trim(),
      excerpt:
        firstParagraph.length > 120
          ? firstParagraph.substring(0, 120) + '...'
          : firstParagraph,
      content: blocks.map((b) => b.content).join('\n\n') || title,
      status: 'draft',
      isPrivate,
      coverImage: coverImage || '',
      author: userEmail.split('@')[0] || 'Junior Garcia',
      authorEmail: userEmail,
      authorHandle: `@${(userEmail.split('@')[0] || 'junior').toLowerCase()}`,
      authorAvatar: (userEmail.substring(0, 2) || 'JG').toUpperCase(),
      publishedAt: 'Draft (Just now)',
      claps: 0,
      commentsCount: 0,
      isLiked: false,
      isBookmarked: false,
    };

    if (onSaveNote) {
      onSaveNote(noteData);
    }
    setDraftSavedStatus(true);
    setTimeout(() => setDraftSavedStatus(false), 3000);
  };

  const handlePublish = async () => {
    if (!title.trim()) {
      alert('Please enter a note title');
      return;
    }

    const fullContent = blocks
      .map((b) => {
        if (b.type === 'heading1') return `# ${b.content}`;
        if (b.type === 'heading2') return `## ${b.content}`;
        if (b.type === 'heading3') return `### ${b.content}`;
        if (b.type === 'quote') return `> ${b.content}`;
        if (b.type === 'code') return `\`\`\`\n${b.content}\n\`\`\``;
        if (b.type === 'bullet') return `• ${b.content}`;
        if (b.type === 'numbered') return `1. ${b.content}`;
        if (b.type === 'callout') return `💡 ${b.content}`;
        if (b.type === 'divider') return `---`;
        return b.content;
      })
      .filter(Boolean)
      .join('\n\n');

    const firstParagraph =
      blocks.find((b) => b.content.trim())?.content || title;
    const excerpt =
      firstParagraph.length > 150
        ? firstParagraph.substring(0, 150) + '...'
        : firstParagraph;

    const noteData = {
      id: String(Date.now()),
      title: title.trim(),
      excerpt,
      content: fullContent || title,
      isPrivate,
      coverImage: coverImage.trim() || '',
      author: userEmail.split('@')[0] || 'Junior Garcia',
      authorEmail: userEmail,
      authorHandle: `@${(userEmail.split('@')[0] || 'junior').toLowerCase()}`,
      authorAvatar: (userEmail.substring(0, 2) || 'JG').toUpperCase(),
      publishedAt: 'Just now',
      claps: 0,
      commentsCount: 0,
      isLiked: false,
      isBookmarked: false,
    };

    setIsSubmitting(true);

    try {
      await createArticleApi({
        title: noteData.title,
        summary: noteData.excerpt,
        content: noteData.content,
        coverImage: noteData.coverImage,
        isPrivate: noteData.isPrivate,
      });

      navigate('/app');
    } catch (err) {
      console.error('Failed to publish note to database:', err);
      alert(err.message || 'Failed to publish note. Please check your internet connection or login status.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const FORMAT_OPTIONS = [
    {
      label: 'Text',
      type: 'paragraph',
      icon: <Type className="w-4 h-4" />,
      desc: 'Just start writing with plain text.',
    },
    {
      label: 'Heading 1',
      type: 'heading1',
      icon: <Heading1 className="w-4 h-4" />,
      desc: 'Big section heading.',
    },
    {
      label: 'Heading 2',
      type: 'heading2',
      icon: <Heading2 className="w-4 h-4" />,
      desc: 'Medium section heading.',
    },
    {
      label: 'Heading 3',
      type: 'heading3',
      icon: <Heading3 className="w-4 h-4" />,
      desc: 'Small section heading.',
    },
    {
      label: 'Bulleted list',
      type: 'bullet',
      icon: <List className="w-4 h-4" />,
      desc: 'Create a simple bulleted list.',
    },
    {
      label: 'Numbered list',
      type: 'numbered',
      icon: <ListOrdered className="w-4 h-4" />,
      desc: 'Create a list with numbering.',
    },
    {
      label: 'Quote',
      type: 'quote',
      icon: <Quote className="w-4 h-4" />,
      desc: 'Capture a quote or highlight text.',
    },
    {
      label: 'Code',
      type: 'code',
      icon: <Code className="w-4 h-4" />,
      desc: 'Capture a code snippet.',
    },
    {
      label: 'Callout',
      type: 'callout',
      icon: <AlertCircle className="w-4 h-4" />,
      desc: 'Make text stand out in a box.',
    },
    {
      label: 'Divider',
      type: 'divider',
      icon: <Minus className="w-4 h-4" />,
      desc: 'Visually divide blocks.',
    },
  ];

  return (
    <div
      className={`min-h-screen w-full transition-colors duration-300 ${
        isDarkMode ? 'bg-[#222831] text-[#eeeeee]' : 'bg-[#eeeeee] text-[#222831]'
      }`}
    >
      {/* Top Header Navigation */}
      <header
        className={`sticky top-0 z-40 border-b backdrop-blur-md px-6 py-3.5 flex items-center justify-between transition-colors duration-300 ${
          isDarkMode
            ? 'bg-[#1c222a]/90 border-zinc-800/80 text-[#eeeeee]'
            : 'bg-white/90 border-slate-200 text-[#222831] shadow-xs'
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/app')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Feed</span>
          </button>
          <span
            className={`text-xs font-medium px-2.5 py-1 rounded-md border ${
              isDarkMode
                ? 'bg-zinc-800/60 border-zinc-700/60 text-zinc-400'
                : 'bg-slate-100 border-slate-200 text-slate-500'
            }`}
          >
            Draft Note
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Public / Private Visibility Toggle Button */}
          <button
            type="button"
            onClick={() => setIsPrivate(!isPrivate)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              isPrivate
                ? 'bg-amber-500/10 border-amber-500/40 text-amber-500 hover:bg-amber-500/20'
                : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
            }`}
            title={isPrivate ? "Private: Only you can see this note" : "Public: Everyone can see this note"}
          >
            {isPrivate ? <Lock className="w-3.5 h-3.5" /> : <Globe className="w-3.5 h-3.5" />}
            <span>{isPrivate ? 'Private' : 'Public'}</span>
          </button>

          {/* Save as Draft Button */}
          <button
            type="button"
            onClick={handleSaveDraft}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              draftSavedStatus
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold'
                : isDarkMode
                ? 'bg-zinc-800/90 border-zinc-700 text-zinc-200 hover:bg-zinc-700'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-xs'
            }`}
          >
            <Save className="w-3.5 h-3.5" />
            <span>{draftSavedStatus ? 'Draft Saved ✓' : 'Save as Draft'}</span>
          </button>

          {/* Add Cover Image Trigger */}
          <button
            type="button"
            onClick={() => setShowImageInput(!showImageInput)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
              coverImage
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
                : isDarkMode
                ? 'bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>{coverImage ? 'Change Cover' : 'Add Cover'}</span>
          </button>

          {/* Publish Note Button */}
          <button
            type="button"
            onClick={handlePublish}
            disabled={isSubmitting}
            className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 shadow-sm active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Publishing...' : 'Publish Note'}</span>
          </button>
        </div>
      </header>

      {/* Main Notion-Style Editor Canvas */}
      <main className="max-w-4xl mx-auto px-6 py-12 space-y-8 animate-in fade-in duration-200">
        {/* Optional Cover Image Preview / Input */}
        {showImageInput && (
          <div ref={imageInputRef}>
            <CoverImageDropzone
              coverImage={coverImage}
              setCoverImage={(val) => {
                setCoverImage(val);
                setImageError(false);
              }}
              isDarkMode={isDarkMode}
              onClose={() => setShowImageInput(false)}
              setImageError={setImageError}
            />
          </div>
        )}

        {coverImage && (
          <div className="relative w-full rounded-3xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-md group">
            {!imageError ? (
              <img
                src={coverImage}
                alt="Cover Preview"
                onError={() => setImageError(true)}
                className="w-full h-64 sm:h-80 object-cover"
              />
            ) : (
              <div className={`p-8 text-center space-y-2.5 ${isDarkMode ? 'bg-zinc-900 text-zinc-300' : 'bg-slate-100 text-slate-700'}`}>
                <AlertCircle className="w-8 h-8 text-amber-500 mx-auto" />
                <p className="text-xs font-bold">Unable to load image preview</p>
                <p className="text-[11px] text-zinc-500">The input is not a valid image file or URL. Please drop a valid image file or paste a working URL.</p>
              </div>
            )}
            <button
              type="button"
              onClick={() => {
                setCoverImage('');
                setImageError(false);
              }}
              className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 text-white opacity-90 group-hover:opacity-100 transition-opacity hover:bg-red-600 cursor-pointer"
              title="Remove Cover Image"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Title Input */}
        <div className="pt-4">
          <textarea
            rows={1}
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            className={`w-full text-4xl sm:text-5xl font-serif font-semibold bg-transparent border-none outline-none resize-none tracking-tight placeholder:text-zinc-400 dark:placeholder:text-zinc-600 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
            style={{ overflow: 'hidden' }}
          />
        </div>

        {/* Dynamic Block Editor Items */}
        <div className="space-y-3 min-h-[300px]">
          {blocks.map((block, index) => {
            const isFormatOpen = formatMenuOpenId === block.id;
            const isCurrentActive = activeBlockId === block.id;

            return (
              <div
                key={block.id}
                className="group relative flex items-start gap-3 py-1"
                onFocus={() => setActiveBlockId(block.id)}
                onClick={() => setActiveBlockId(block.id)}
              >
                {/* Left Floating (+) Add Format Button */}
                <div
                  className={`shrink-0 pt-1 flex items-center gap-1 ${
                    isCurrentActive || isFormatOpen
                      ? 'opacity-100 pointer-events-auto'
                      : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormatMenuOpenId(
                          isFormatOpen ? null : block.id
                        );
                      }}
                      className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
                        isFormatOpen
                          ? 'bg-emerald-500 border-emerald-500 text-white scale-110 shadow-sm'
                          : isDarkMode
                          ? 'border-zinc-700/80 text-zinc-400 hover:text-white hover:border-zinc-500 hover:bg-zinc-800'
                          : 'border-slate-300 text-slate-500 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-100'
                      }`}
                      title="Add content or change block format"
                    >
                      <Plus className="w-4 h-4" />
                    </button>

                    {/* Format Group Popover Menu */}
                    {isFormatOpen && (
                      <div
                        className={`absolute left-0 top-9 z-50 w-72 rounded-2xl border shadow-xl p-2 animate-in fade-in zoom-in-95 duration-150 ${
                          isDarkMode
                            ? 'bg-[#141417] border-zinc-800 text-zinc-200'
                            : 'bg-white border-slate-200 text-slate-800'
                        }`}
                      >
                        <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-500 border-b border-zinc-800/60 mb-1">
                          Format Group Blocks
                        </div>
                        <div className="max-h-64 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                          {FORMAT_OPTIONS.map((opt) => (
                            <button
                              key={opt.type}
                              type="button"
                              onClick={() =>
                                handleChangeBlockType(block.id, opt.type)
                              }
                              className={`w-full flex items-start gap-3 p-2 rounded-xl text-left transition-colors cursor-pointer ${
                                block.type === opt.type
                                  ? isDarkMode
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'bg-emerald-50 text-emerald-700 font-semibold'
                                  : isDarkMode
                                  ? 'hover:bg-zinc-800 text-zinc-300'
                                  : 'hover:bg-slate-100 text-slate-700'
                              }`}
                            >
                              <div className="p-1.5 rounded-lg bg-zinc-800/50 shrink-0 mt-0.5">
                                {opt.icon}
                              </div>
                              <div>
                                <div className="text-xs font-bold">
                                  {opt.label}
                                </div>
                                <div className="text-[10px] opacity-70">
                                  {opt.desc}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Block Content Inputs */}
                <div className="flex-1 min-w-0">
                  {block.type === 'paragraph' && (
                    <textarea
                      rows={1}
                      placeholder="Press '+' to choose a format or just start typing..."
                      value={block.content}
                      onChange={(e) => {
                        handleUpdateBlockContent(block.id, e.target.value);
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                      }}
                      onKeyDown={(e) => handleKeyDown(e, block.id, index)}
                      className={`w-full bg-transparent border-none outline-none resize-none text-base leading-relaxed placeholder:text-zinc-500 ${
                        isDarkMode ? 'text-zinc-200' : 'text-slate-800'
                      }`}
                    />
                  )}

                  {block.type === 'heading1' && (
                    <input
                      type="text"
                      placeholder="Heading 1"
                      value={block.content}
                      onChange={(e) =>
                        handleUpdateBlockContent(block.id, e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(e, block.id, index)}
                      className={`w-full bg-transparent border-none outline-none text-2xl font-bold tracking-tight ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}
                    />
                  )}

                  {block.type === 'heading2' && (
                    <input
                      type="text"
                      placeholder="Heading 2"
                      value={block.content}
                      onChange={(e) =>
                        handleUpdateBlockContent(block.id, e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(e, block.id, index)}
                      className={`w-full bg-transparent border-none outline-none text-xl font-semibold tracking-tight ${
                        isDarkMode ? 'text-white' : 'text-slate-900'
                      }`}
                    />
                  )}

                  {block.type === 'heading3' && (
                    <input
                      type="text"
                      placeholder="Heading 3"
                      value={block.content}
                      onChange={(e) =>
                        handleUpdateBlockContent(block.id, e.target.value)
                      }
                      onKeyDown={(e) => handleKeyDown(e, block.id, index)}
                      className={`w-full bg-transparent border-none outline-none text-lg font-medium ${
                        isDarkMode ? 'text-zinc-200' : 'text-slate-800'
                      }`}
                    />
                  )}

                  {block.type === 'bullet' && (
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <input
                        type="text"
                        placeholder="List item..."
                        value={block.content}
                        onChange={(e) =>
                          handleUpdateBlockContent(block.id, e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(e, block.id, index)}
                        className={`w-full bg-transparent border-none outline-none text-base ${
                          isDarkMode ? 'text-zinc-200' : 'text-slate-800'
                        }`}
                      />
                    </div>
                  )}

                  {block.type === 'numbered' && (
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-500 font-bold text-xs">
                        {index + 1}.
                      </span>
                      <input
                        type="text"
                        placeholder="Numbered item..."
                        value={block.content}
                        onChange={(e) =>
                          handleUpdateBlockContent(block.id, e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(e, block.id, index)}
                        className={`w-full bg-transparent border-none outline-none text-base ${
                          isDarkMode ? 'text-zinc-200' : 'text-slate-800'
                        }`}
                      />
                    </div>
                  )}

                  {block.type === 'quote' && (
                    <div className="pl-4 border-l-4 border-emerald-500 italic">
                      <input
                        type="text"
                        placeholder="Quote..."
                        value={block.content}
                        onChange={(e) =>
                          handleUpdateBlockContent(block.id, e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(e, block.id, index)}
                        className={`w-full bg-transparent border-none outline-none text-base ${
                          isDarkMode ? 'text-zinc-300' : 'text-slate-700'
                        }`}
                      />
                    </div>
                  )}

                  {block.type === 'code' && (
                    <div
                      className={`p-3 rounded-xl border font-mono text-xs ${
                        isDarkMode
                          ? 'bg-[#18181b] border-zinc-800 text-emerald-400'
                          : 'bg-slate-100 border-slate-200 text-emerald-700'
                      }`}
                    >
                      <textarea
                        rows={2}
                        placeholder="// Type code snippet..."
                        value={block.content}
                        onChange={(e) =>
                          handleUpdateBlockContent(block.id, e.target.value)
                        }
                        className="w-full bg-transparent border-none outline-none font-mono resize-none"
                      />
                    </div>
                  )}

                  {block.type === 'callout' && (
                    <div
                      className={`p-3.5 rounded-2xl border flex items-start gap-3 ${
                        isDarkMode
                          ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-200'
                          : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      }`}
                    >
                      <Sparkles className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <input
                        type="text"
                        placeholder="Callout note..."
                        value={block.content}
                        onChange={(e) =>
                          handleUpdateBlockContent(block.id, e.target.value)
                        }
                        onKeyDown={(e) => handleKeyDown(e, block.id, index)}
                        className="w-full bg-transparent border-none outline-none text-sm font-medium"
                      />
                    </div>
                  )}

                  {block.type === 'divider' && (
                    <div className="py-2">
                      <hr
                        className={`border-t ${
                          isDarkMode ? 'border-zinc-800' : 'border-slate-200'
                        }`}
                      />
                    </div>
                  )}
                </div>

                {/* Delete Block */}
                {blocks.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteBlock(block.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-zinc-500 hover:text-red-500 transition-opacity cursor-pointer"
                    title="Delete block"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export function CoverImageDropzone({ coverImage, setCoverImage, isDarkMode, onClose, setImageError }) {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'url'
  const [isDragging, setIsDragging] = useState(false);
  const [urlInput, setUrlInput] = useState(coverImage || '');
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (setImageError) setImageError(false);
      setCoverImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleUrlApply = () => {
    if (urlInput.trim()) {
      if (setImageError) setImageError(false);
      setCoverImage(urlInput.trim());
    }
  };

  return (
    <div className={`p-5 rounded-2xl border space-y-4 transition-all ${
      isDarkMode
        ? 'bg-[#141417] border-zinc-800 text-zinc-200'
        : 'bg-white border-slate-200 shadow-md text-slate-800'
    }`}>
      <div className="flex items-center justify-between gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-1.5">
          <ImageIcon className="w-4 h-4" />
          <span>Cover Image Dropzone</span>
        </label>
        
        {/* Tab Selector & Close */}
        <div className="flex items-center gap-2">
          <div className={`flex rounded-xl p-1 text-xs font-semibold ${
            isDarkMode ? 'bg-zinc-900' : 'bg-slate-100'
          }`}>
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Upload File
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                activeTab === 'url'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Image URL
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {activeTab === 'upload' ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center ${
            isDragging
              ? 'border-emerald-500 bg-emerald-500/10'
              : isDarkMode
              ? 'border-zinc-700/80 bg-zinc-900/60 hover:border-emerald-500/60 hover:bg-zinc-900'
              : 'border-slate-300 bg-slate-50/80 hover:border-emerald-500/60 hover:bg-slate-100/80'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileSelect(e.target.files[0]);
              }
            }}
          />
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-3">
            <UploadCloud className="w-6 h-6" />
          </div>
          <p className="text-xs sm:text-sm font-bold">
            {isDragging ? 'Drop image here' : 'Drag & drop your cover image here'}
          </p>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            Supports PNG, JPG, WebP, GIF (Click to browse files)
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="Paste Unsplash or image URL (e.g. https://images.unsplash.com/...)"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleUrlApply(); }}
              className={`flex-1 text-xs p-3 rounded-xl border focus:outline-none focus:border-emerald-500 ${
                isDarkMode
                  ? 'bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
              }`}
            />
            <button
              type="button"
              onClick={handleUrlApply}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateNotePage;
