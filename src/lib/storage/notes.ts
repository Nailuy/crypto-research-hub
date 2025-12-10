// LocalStorage utilities for notes

export interface Note {
    id: string;
    title: string;
    content: string;
    category: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

const STORAGE_KEY = 'crypto_research_notes';

export function getNotes(): Note[] {
    if (typeof window === 'undefined') return [];

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Error reading notes:', error);
        return [];
    }
}

export function saveNotes(notes: Note[]): void {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (error) {
        console.error('Error saving notes:', error);
    }
}

export function createNote(note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Note {
    const newNote: Note = {
        ...note,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    const notes = getNotes();
    notes.push(newNote);
    saveNotes(notes);

    return newNote;
}

export function updateNote(id: string, updates: Partial<Omit<Note, 'id' | 'createdAt'>>): Note | null {
    const notes = getNotes();
    const index = notes.findIndex(n => n.id === id);

    if (index === -1) return null;

    notes[index] = {
        ...notes[index],
        ...updates,
        updatedAt: new Date().toISOString(),
    };

    saveNotes(notes);
    return notes[index];
}

export function deleteNote(id: string): boolean {
    const notes = getNotes();
    const filtered = notes.filter(n => n.id !== id);

    if (filtered.length === notes.length) return false;

    saveNotes(filtered);
    return true;
}

export function searchNotes(query: string, category?: string): Note[] {
    const notes = getNotes();
    const lowerQuery = query.toLowerCase();

    return notes.filter(note => {
        const matchesSearch =
            note.title.toLowerCase().includes(lowerQuery) ||
            note.content.toLowerCase().includes(lowerQuery) ||
            note.tags.some(tag => tag.toLowerCase().includes(lowerQuery));

        const matchesCategory = !category || category === 'All' || note.category === category;

        return matchesSearch && matchesCategory;
    });
}

export const NOTE_CATEGORIES = [
    'All',
    'Stablecoins',
    'DeFi',
    'Security',
    'FHE',
    'DePIN',
    'Research',
    'General',
];
