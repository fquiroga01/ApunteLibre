import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { Note } from '../upload-notes/upload-notes.page';

@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.page.html',
  styleUrls: ['./my-notes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, NavbarComponent]
})
export class MyNotesPage {
  myNotes: Note[] = [];

  constructor(private navCtrl: NavController, private toastCtrl: ToastController) {
    this.loadNotes();
  }

  loadNotes() {
    const user = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const notesSaved = localStorage.getItem('notes');
    if (notesSaved && user?.id) {
      const notes: Note[] = JSON.parse(notesSaved);
      this.myNotes = notes.filter(n => n.authorId === user.id);
    }
  }

  async deleteNote(note: Note) {
    const notesSaved = localStorage.getItem('notes');
    if (notesSaved) {
      let notes: Note[] = JSON.parse(notesSaved);
      notes = notes.filter(n => n.id !== note.id);
      localStorage.setItem('notes', JSON.stringify(notes));
      this.loadNotes();

      const toast = await this.toastCtrl.create({
        message: `Nota "${note.title}" eliminada`,
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }

  goBackToProfile() { this.navCtrl.navigateRoot('/profile'); }
}
