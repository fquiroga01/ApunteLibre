import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {}

  // Guardar usuario en localStorage y en el observable
  login(user: any) {
    localStorage.setItem('userProfile', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // Cargar usuario desde localStorage si existe
  loadUserFromStorage() {
    const savedUser = localStorage.getItem('userProfile');
    if (savedUser) {
      this.currentUserSubject.next(JSON.parse(savedUser));
    }
  }

  // Eliminar usuario
  logout() {
    localStorage.removeItem('userProfile');
    this.currentUserSubject.next(null);
  }

  // Retorna el usuario actual
  getCurrentUser() {
    return this.currentUserSubject.value;
  }

  // Verifica si hay sesión activa
  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}
