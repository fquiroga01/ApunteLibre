import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',   // 🔹 Cambiado de 'login' a 'home'
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: 'browse-notes',
    loadComponent: () => import('./pages/browse-notes/browse-notes.page').then(m => m.BrowseNotesPage)
  },
  {
    path: 'upload-notes',
    loadComponent: () => import('./pages/upload-notes/upload-notes.page').then(m => m.UploadNotesPage)
  },
  {
    path: 'note-detail/:id',
    loadComponent: () => import('./pages/note-detail/note-detail.page').then(m => m.NoteDetailPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then(m => m.ProfilePage)
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/terms/terms.page').then(m => m.TermsPage)
  },
  {
    path: 'my-notes',
    loadComponent: () => import('./pages/my-notes/my-notes.page').then( m => m.MyNotesPage)
  },
];


