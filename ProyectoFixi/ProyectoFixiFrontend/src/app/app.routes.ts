import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { SingUpComponent } from './pages/sing-up/sing-up.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { UserHomeComponent } from './pages/user-home/user-home.component';
import { SearchFixiComponent } from './pages/search-fixi/search-fixi.component';
import { ServiceProcessComponent } from './pages/service-process/service-process.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ServicesComponent } from './pages/services/services.component';
import { AdminPrincipalComponent } from './pages/admin-principal/admin-principal.component';
import { AdminFixisPageComponent } from './pages/admin-fixis-page/admin-fixis-page.component';
import { AdminClientsComponent } from './pages/admin-clients/admin-clients.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent }, // Ruta para la página principal
    { path: 'categoria/:categoria', component: CategoryPageComponent }, // Ruta dinámica para categorías
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SingUpComponent },
  { path: 'homeClient', component: UserHomeComponent },
  { path: 'homeAdmin', component: AdminPrincipalComponent},
  { path: 'fixis', component: AdminFixisPageComponent},
  { path: 'clients', component: AdminClientsComponent},

  { path: '**', component: ErrorPageComponent},

];
