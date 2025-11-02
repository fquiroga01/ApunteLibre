import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { NavbarComponent } from '../../components/navbar/navbar.component';

export interface Note {
  id: number;
  title: string;
  subject: string;
  description: string;
  author: string;
  authorId: string;
  upvotes: number;
  date: string;
  favorite: boolean;
  file?: string;
}

@Component({
  selector: 'app-upload-note',
  templateUrl: './upload-notes.page.html',
  styleUrls: ['./upload-notes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, NavbarComponent]
})
export class UploadNotesPage {
  noteForm: FormGroup;
  currentUser: any;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private navCtrl: NavController) {
    const savedUser = localStorage.getItem('userProfile');
    this.currentUser = savedUser ? JSON.parse(savedUser) : { id: 'user_0', username: 'Usuario' };

    this.noteForm = this.fb.group({
      title: ['', Validators.required],
      subject: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get f() { return this.noteForm.controls; }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) this.selectedFile = file;
  }

  onSubmit() {
    if (this.noteForm.invalid) return;

    const notesSaved = localStorage.getItem('notes');
    const notes: Note[] = notesSaved ? JSON.parse(notesSaved) : [];
    const currentUser = this.currentUser;

    let fileData = '';
    const createAndSaveNote = () => {
      const newNote: Note = {
        id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
        title: this.noteForm.value.title,
        subject: this.noteForm.value.subject,
        description: this.noteForm.value.description,
        author: currentUser.username,
        authorId: currentUser.id,
        upvotes: 0,
        date: new Date().toISOString().split('T')[0],
        favorite: false,
        file: fileData
      };

      notes.push(newNote);
      localStorage.setItem('notes', JSON.stringify(notes));
      console.log('✅ Nota subida:', newNote);
      this.navCtrl.navigateRoot('/my-notes');
    };

    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        fileData = reader.result as string;
        createAndSaveNote();
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      createAndSaveNote();
    }
  }
}
