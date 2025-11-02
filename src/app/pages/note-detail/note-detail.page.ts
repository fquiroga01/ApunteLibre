import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';

interface Note {
  id: number;
  title: string;
  subject: string;
  description: string;
  fileName?: string; // nombre del archivo adjunto
}

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class NoteDetailPage implements OnInit {
  note: Note | undefined;
  notes: Note[] = [
    { id: 1, title: 'Resumen Matemáticas', subject: 'Matemáticas', description: 'Álgebra y geometría.', fileName: 'resumen_mate.pdf' },
    { id: 2, title: 'Guía Historia', subject: 'Historia', description: 'Revolución Francesa.', fileName: 'guia_historia.pdf' },
    { id: 3, title: 'Apuntes Física', subject: 'Física', description: 'Ley de Newton y cinemática.', fileName: 'apuntes_fisica.pdf' }
  ];

  constructor(private route: ActivatedRoute, private navCtrl: NavController) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.note = this.notes.find(n => n.id === id);
  }

  goBack() {
    this.navCtrl.back();
  }
}
