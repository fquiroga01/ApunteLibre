import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthService } from '../../services/auth'; // Importamos el AuthService

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NavbarComponent
  ]
})
export class LoginPage {
  loginForm: FormGroup;
  submitted = false;

  // Usuarios simulados
  users: any[] = [
    { username: 'admin', email: 'admin@demo.com', password: 'admin123', role: 'admin' },
    { username: 'usuario1', email: 'usuario1@demo.com', password: 'usuario123', role: 'user' }
  ];

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AuthService // Inyectamos el AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() { return this.loginForm.controls; }

  async onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    // Buscar usuario en el array
    const user = this.users.find(u => u.email === email && u.password === password);

    if (user) {
      // Guardar sesión en el AuthService
      this.authService.login(user);

      // Mostrar toast de éxito
      const toast = await this.toastCtrl.create({
        message: `Bienvenido, ${user.username}!`,
        duration: 2000,
        color: 'success'
      });
      await toast.present();

      // Redirigir a la página principal
      this.navCtrl.navigateRoot('/browse-notes', { state: { role: user.role, username: user.username } });
    } else {
      const toast = await this.toastCtrl.create({
        message: 'Usuario o contraseña incorrectos',
        duration: 2000,
        color: 'danger'
      });
      await toast.present();
    }
  }

  goToRegister() {
    this.navCtrl.navigateForward('/register');
  }
}
