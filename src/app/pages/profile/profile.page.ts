import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { NavbarComponent } from '../../components/navbar/navbar.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NavbarComponent]
})
export class ProfilePage {
  user: any = { id: '', username: 'Usuario', email: '', avatar: '', favoriteSubject: '' };

  constructor(private navCtrl: NavController) {
    this.loadProfile();
  }

  loadProfile() {
    const saved = localStorage.getItem('userProfile');
    if (saved) this.user = JSON.parse(saved);
  }

  saveProfile() {
    localStorage.setItem('userProfile', JSON.stringify(this.user));
  }

  get avatarInitials(): string {
    if (this.user.avatar) return '';
    if (!this.user.username) return '';
    return this.user.username.split(' ').map((n: string) => n[0]).join('').toUpperCase();
  }

  goToUploadNote() { this.navCtrl.navigateForward('/upload-notes'); }
  goToMyNotes() { this.navCtrl.navigateForward('/my-notes'); }

  // Estadísticas
  get totalVotes(): number {
    const notesSaved = localStorage.getItem('notes');
    if (!notesSaved) return 0;
    const notes: any[] = JSON.parse(notesSaved);
    const myNotes = notes.filter(n => n.authorId === this.user.id);
    return myNotes.reduce((sum, note) => sum + note.upvotes, 0);
  }

  get topNote(): any | null {
    const notesSaved = localStorage.getItem('notes');
    if (!notesSaved) return null;
    const notes: any[] = JSON.parse(notesSaved);
    const myNotes = notes.filter(n => n.authorId === this.user.id);
    if (!myNotes.length) return null;
    return myNotes.reduce((prev, curr) => (prev.upvotes > curr.upvotes ? prev : curr));
  }
}
