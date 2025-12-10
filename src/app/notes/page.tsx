'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import {
    getNotes,
    createNote,
    updateNote,
    deleteNote,
    Note,
    NOTE_CATEGORIES
} from '@/lib/storage/notes';
import {
    Plus,
    Save,
    Trash2,
    FileText,
    Calendar,
    Tag,
    Search
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('General');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = () => {
        const loadedNotes = getNotes();
        setNotes(loadedNotes.sort((a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        ));
    };

    const handleCreateNew = () => {
        setSelectedNote(null);
        setIsEditing(true);
        setTitle('');
        setContent('');
        setCategory('General');
        setTags([]);
        setShowPreview(false);
    };

    const handleSave = () => {
        if (!title.trim()) return;

        if (selectedNote) {
            updateNote(selectedNote.id, { title, content, category, tags });
        } else {
            createNote({ title, content, category, tags });
        }

        loadNotes();
        setIsEditing(false);
    };

    const handleDelete = () => {
        if (!selectedNote || !confirm('Are you sure you want to delete this note?')) return;

        deleteNote(selectedNote.id);
        loadNotes();
        setSelectedNote(null);
        setIsEditing(false);
    };

    const handleSelectNote = (note: Note) => {
        setSelectedNote(note);
        setTitle(note.title);
        setContent(note.content);
        setCategory(note.category);
        setTags(note.tags);
        setIsEditing(false);
        setShowPreview(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
        setShowPreview(false);
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tag: string) => {
        setTags(tags.filter(t => t !== tag));
    };

    const filteredNotes = notes.filter(note => {
        const matchesSearch =
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || note.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <>
            <Sidebar />
            <main className="main-content">
                <Header title="Research Notes" subtitle="Organize your crypto research" />

                <div className="notes-container">
                    {/* Sidebar */}
                    <div className="notes-sidebar glass">
                        <div className="sidebar-header">
                            <button className="new-note-button" onClick={handleCreateNew}>
                                <Plus size={18} />
                                New Note
                            </button>

                            <div className="search-box">
                                <Search size={16} />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                            </div>

                            <div className="category-filter">
                                {NOTE_CATEGORIES.map(cat => (
                                    <button
                                        key={cat}
                                        className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                                        onClick={() => setSelectedCategory(cat)}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="notes-list">
                            {filteredNotes.length === 0 ? (
                                <div className="empty-state">
                                    <FileText size={48} />
                                    <p>No notes yet</p>
                                </div>
                            ) : (
                                filteredNotes.map(note => (
                                    <div
                                        key={note.id}
                                        className={`note-item ${selectedNote?.id === note.id ? 'active' : ''}`}
                                        onClick={() => handleSelectNote(note)}
                                    >
                                        <h4 className="note-title">{note.title}</h4>
                                        <div className="note-meta">
                                            <span className="note-category">{note.category}</span>
                                            <span className="note-date">
                                                {new Date(note.updatedAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Editor */}
                    <div className="notes-editor glass">
                        {!selectedNote && !isEditing ? (
                            <div className="empty-editor">
                                <FileText size={64} />
                                <h3>Select a note or create a new one</h3>
                                <button className="create-button" onClick={handleCreateNew}>
                                    <Plus size={20} />
                                    Create Note
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="editor-header">
                                    <div className="editor-controls">
                                        {isEditing ? (
                                            <>
                                                <button className="control-btn primary" onClick={handleSave}>
                                                    <Save size={18} />
                                                    Save
                                                </button>
                                                <button
                                                    className="control-btn"
                                                    onClick={() => setShowPreview(!showPreview)}
                                                >
                                                    {showPreview ? 'Edit' : 'Preview'}
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="control-btn primary" onClick={handleEdit}>
                                                    Edit
                                                </button>
                                                <button className="control-btn danger" onClick={handleDelete}>
                                                    <Trash2 size={18} />
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="editor-content">
                                    {isEditing && !showPreview ? (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="Note title..."
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                className="title-input"
                                            />

                                            <div className="metadata-row">
                                                <div className="meta-group">
                                                    <Tag size={16} />
                                                    <select
                                                        value={category}
                                                        onChange={(e) => setCategory(e.target.value)}
                                                        className="category-select"
                                                    >
                                                        {NOTE_CATEGORIES.filter(c => c !== 'All').map(cat => (
                                                            <option key={cat} value={cat}>{cat}</option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div className="tags-input-group">
                                                    <input
                                                        type="text"
                                                        placeholder="Add tag..."
                                                        value={tagInput}
                                                        onChange={(e) => setTagInput(e.target.value)}
                                                        onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                                                        className="tag-input"
                                                    />
                                                    <button onClick={handleAddTag} className="add-tag-btn">
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                            </div>

                                            {tags.length > 0 && (
                                                <div className="tags-list">
                                                    {tags.map(tag => (
                                                        <span key={tag} className="tag">
                                                            {tag}
                                                            <button onClick={() => handleRemoveTag(tag)}>×</button>
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            <textarea
                                                placeholder="Write your note in Markdown..."
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                                className="content-textarea"
                                            />
                                        </>
                                    ) : (
                                        <div className="preview-content">
                                            <h1 className="preview-title">{title || selectedNote?.title}</h1>

                                            <div className="preview-meta">
                                                <span className="preview-category">
                                                    <Tag size={14} />
                                                    {category || selectedNote?.category}
                                                </span>
                                                {selectedNote && (
                                                    <span className="preview-date">
                                                        <Calendar size={14} />
                                                        {new Date(selectedNote.updatedAt).toLocaleString()}
                                                    </span>
                                                )}
                                            </div>

                                            {(tags.length > 0 || (selectedNote?.tags && selectedNote.tags.length > 0)) && (
                                                <div className="preview-tags">
                                                    {(tags.length > 0 ? tags : selectedNote?.tags || []).map(tag => (
                                                        <span key={tag} className="preview-tag">{tag}</span>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="markdown-content">
                                                <ReactMarkdown>{content || selectedNote?.content || ''}</ReactMarkdown>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>

            <style jsx>{`
        .main-content {
          margin-left: 280px;
          min-height: 100vh;
        }

        .notes-container {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: var(--spacing-lg);
          padding: var(--spacing-xl);
          height: calc(100vh - 80px);
        }

        .notes-sidebar {
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .sidebar-header {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
        }

        .new-note-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-sm) var(--spacing-md);
          background: var(--accent-primary);
          color: var(--bg-primary);
          border-radius: var(--radius-sm);
          font-weight: 700;
          transition: var(--transition-normal);
        }

        .new-note-button:hover {
          background: var(--accent-secondary);
          transform: translateY(-2px);
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: 0.5rem var(--spacing-sm);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
        }

        .search-box :global(svg) {
          color: var(--text-muted);
        }

        .search-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-primary);
          font-size: 0.875rem;
        }

        .category-filter {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .category-btn {
          padding: 0.375rem 0.75rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .category-btn:hover {
          background: var(--glass-bg);
          color: var(--text-primary);
        }

        .category-btn.active {
          background: var(--accent-primary);
          color: var(--bg-primary);
          border-color: var(--accent-primary);
        }

        .notes-list {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .empty-state {
          padding: var(--spacing-xl);
          text-align: center;
          color: var(--text-muted);
        }

        .empty-state :global(svg) {
          margin-bottom: var(--spacing-md);
          opacity: 0.5;
        }

        .note-item {
          padding: var(--spacing-md);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .note-item:hover {
          background: var(--glass-bg);
          border-color: var(--glass-border);
        }

        .note-item.active {
          background: var(--glass-bg);
          border-color: var(--accent-primary);
        }

        .note-title {
          font-size: 0.9375rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
          color: var(--text-primary);
        }

        .note-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .note-category {
          padding: 0.25rem 0.5rem;
          background: var(--bg-primary);
          border-radius: 0.25rem;
        }

        .notes-editor {
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .empty-editor {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-md);
          color: var(--text-muted);
        }

        .empty-editor :global(svg) {
          opacity: 0.3;
        }

        .create-button {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-sm) var(--spacing-lg);
          background: var(--accent-primary);
          color: var(--bg-primary);
          border-radius: var(--radius-sm);
          font-weight: 600;
          transition: var(--transition-normal);
        }

        .create-button:hover {
          background: var(--accent-secondary);
          transform: translateY(-2px);
        }

        .editor-header {
          margin-bottom: var(--spacing-lg);
          padding-bottom: var(--spacing-md);
          border-bottom: 1px solid var(--border-color);
        }

        .editor-controls {
          display: flex;
          gap: var(--spacing-sm);
        }

        .control-btn {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: 0.5rem 1rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          font-weight: 600;
          font-size: 0.875rem;
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .control-btn:hover {
          background: var(--glass-bg);
          color: var(--text-primary);
        }

        .control-btn.primary {
          background: var(--accent-primary);
          color: var(--bg-primary);
          border-color: var(--accent-primary);
        }

        .control-btn.primary:hover {
          background: var(--accent-secondary);
        }

        .control-btn.danger {
          color: var(--danger);
        }

        .control-btn.danger:hover {
          background: rgba(255, 51, 102, 0.1);
          border-color: var(--danger);
        }

        .editor-content {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .title-input {
          width: 100%;
          padding: var(--spacing-md);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: var(--spacing-md);
          outline: none;
          transition: var(--transition-fast);
        }

        .title-input:focus {
          border-color: var(--accent-primary);
        }

        .metadata-row {
          display: flex;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-md);
        }

        .meta-group {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          color: var(--text-muted);
        }

        .category-select {
          padding: 0.5rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-size: 0.875rem;
          font-weight: 600;
          outline: none;
        }

        .tags-input-group {
          flex: 1;
          display: flex;
          gap: var(--spacing-xs);
        }

        .tag-input {
          flex: 1;
          padding: 0.5rem;
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-size: 0.875rem;
          outline: none;
        }

        .add-tag-btn {
          padding: 0.5rem;
          background: var(--accent-primary);
          color: var(--bg-primary);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tags-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: var(--spacing-md);
        }

        .tag {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.25rem 0.75rem;
          background: var(--accent-primary);
          color: var(--bg-primary);
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .tag button {
          background: transparent;
          color: inherit;
          font-size: 1.25rem;
          line-height: 1;
          padding: 0;
          margin: 0;
        }

        .content-textarea {
          flex: 1;
          padding: var(--spacing-md);
          background: var(--bg-tertiary);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-size: 0.9375rem;
          font-family: 'Courier New', monospace;
          line-height: 1.8;
          resize: none;
          outline: none;
          transition: var(--transition-fast);
        }

        .content-textarea:focus {
          border-color: var(--accent-primary);
        }

        .preview-content {
          flex: 1;
          overflow-y: auto;
        }

        .preview-title {
          font-size: 2rem;
          font-weight: 800;
          margin: 0 0 var(--spacing-md) 0;
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .preview-meta {
          display: flex;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-md);
          font-size: 0.875rem;
          color: var(--text-muted);
        }

        .preview-category,
        .preview-date {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .preview-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: var(--spacing-lg);
        }

        .preview-tag {
          padding: 0.25rem 0.75rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--accent-primary);
        }

        .markdown-content {
          padding-top: var(--spacing-lg);
          border-top: 1px solid var(--border-color);
        }

        .markdown-content :global(h1),
        .markdown-content :global(h2),
        .markdown-content :global(h3) {
          color: var(--text-primary);
        }

        .markdown-content :global(p) {
          color: var(--text-secondary);
          margin-bottom: var(--spacing-md);
        }

        .markdown-content :global(code) {
          background: var(--bg-tertiary);
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }

        .markdown-content :global(pre) {
          background: var(--bg-tertiary);
          padding: var(--spacing-md);
          border-radius: var(--radius-sm);
          overflow-x: auto;
        }

        @media (max-width: 1024px) {
          .notes-container {
            grid-template-columns: 1fr;
            height: auto;
          }

          .notes-sidebar {
            height: auto;
            max-height: 400px;
          }
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 70px;
          }

          .notes-container {
            padding: var(--spacing-md);
          }
        }
      `}</style>
        </>
    );
}
