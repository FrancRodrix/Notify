import {create} from 'zustand';
import {MMKV} from 'react-native-mmkv';

// Define types for a Note object
type Note = {
  id: string;
  title: string;
  content: string;
  backgroundColor: string;
  headerImage?: string | null;
  createdAt: string;
};

type NotesStore = {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (id: string, updatedData: Partial<Note>) => void;
  deleteNote: (id: string) => void;
};

const storage = new MMKV();

const useNotesStore = create<NotesStore>((set, get) => ({
  notes: JSON.parse(storage.getString('notes') || '[]'),

  addNote: (note: Note) => {
    const updatedNotes = [...get().notes, note];
    storage.set('notes', JSON.stringify(updatedNotes));
    set({notes: updatedNotes});
  },

  updateNote: (id: string, updatedData: Partial<Note>) => {
    const updatedNotes = get().notes.map(note =>
      note.id === id ? {...note, ...updatedData} : note,
    );
    storage.set('notes', JSON.stringify(updatedNotes));
    set({notes: updatedNotes});
  },

  deleteNote: (id: string) => {
    const updatedNotes = get().notes.filter(note => note.id !== id);
    storage.set('notes', JSON.stringify(updatedNotes));
    set({notes: updatedNotes});
  },
}));

export default useNotesStore;
