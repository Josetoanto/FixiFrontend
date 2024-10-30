import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SingUpComponent } from './pages/sing-up/sing-up.component';
import { LoginComponent } from './pages/login/login.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent }, // Ruta para la página principal
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SingUpComponent },
  { path: 'homeClient', component: UserHomeComponent },
];
