import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class HomePage {
  currentUser: any = null;

  // Datos simulados de apuntes
  latestNotes = [
    { id: 1, title: 'Apuntes de Matemáticas I', author: 'usuario1', votes: 12 },
    { id: 2, title: 'Resumen de Historia Universal', author: 'usuario2', votes: 7 },
    { id: 3, title: 'Biología: Células y tejidos', author: 'admin', votes: 15 }
  ];

  constructor() {
    const savedUser = localStorage.getItem('userProfile');
    this.currentUser = savedUser ? JSON.parse(savedUser) : null;
  }
}
