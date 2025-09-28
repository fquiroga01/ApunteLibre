import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterModule, CommonModule]
})
export class NavbarComponent {
  currentUser: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    // Escucha cambios en el usuario logueado
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    // Cargar usuario guardado (si hay en localStorage)
    this.authService.loadUserFromStorage();
  }

  async logout() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Cerrar sesión',
          handler: () => {
            this.authService.logout();
            this.router.navigate(['/browse-notes']);
          }
        }
      ]
    });

    await alert.present();
  }
}
