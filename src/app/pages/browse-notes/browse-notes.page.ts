import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavbarComponent } from '../../components/navbar/navbar.component';


export interface Note {
  id: number;
  title: string;
  subject: string;
  description: string;
  author: string;
  upvotes: number;
  date: string;
  favorite: boolean;
  file?: string;
}

export interface User {
  username: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-browse-notes',
  templateUrl: './browse-notes.page.html',
  styleUrls: ['./browse-notes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BrowseNotesPage {
  searchTerm: string = '';
  currentUser: User = { username: '', email: '', role: 'user' };

  notes: Note[] = [
    { id: 1, title: 'Álgebra Lineal', subject: 'Matemáticas', description: 'Resumen sobre matrices y determinantes', author: 'Juan Pérez', upvotes: 5, date: '2025-09-25', favorite: false },
    { id: 2, title: 'Historia de Chile', subject: 'Historia', description: 'Guía sobre independencia de Chile', author: 'María Gómez', upvotes: 3, date: '2025-09-20', favorite: false },
    { id: 3, title: 'Química Orgánica', subject: 'Química', description: 'Apuntes de reacciones y grupos funcionales', author: 'Carlos Ruiz', upvotes: 8, date: '2025-09-23', favorite: false }
  ];

  constructor() {
    this.loadUser();
    this.loadNotes();
  }

  loadUser() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  loadNotes() {
    const saved = localStorage.getItem('notes');
    if (saved) {
      this.notes = JSON.parse(saved);
    }
  }

  get filteredNotes() {
    const normalize = (str: string) =>
      str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

    return this.notes
      .filter(note =>
        normalize(note.title).includes(normalize(this.searchTerm)) ||
        normalize(note.subject).includes(normalize(this.searchTerm))
      )
      .sort((a, b) => b.upvotes - a.upvotes);
  }

  upvote(note: Note) {
    note.upvotes++;
    this.saveNotes();
  }

  downvote(note: Note) {
    note.upvotes--;
    this.saveNotes();
  }

  toggleFavorite(note: Note) {
    note.favorite = !note.favorite;
    this.saveNotes();
  }

  deleteNote(note: Note) {
    if (this.currentUser.role === 'admin') {
      this.notes = this.notes.filter(n => n.id !== note.id);
      this.saveNotes();
    }
  }

  saveNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
  }
}
