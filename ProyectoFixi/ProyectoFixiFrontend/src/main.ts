import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http'; // Agrega esto para HttpClient
import { provideStore } from '@ngrx/store';
import { userReducer } from './app/store/reducers/user.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    provideStore({ users: userReducer }), // Agrega el reducer al Store
    provideRouter(routes),
    provideHttpClient() // Agrega el proveedor de HttpClient
  ]
}).catch(err => console.error(err));
