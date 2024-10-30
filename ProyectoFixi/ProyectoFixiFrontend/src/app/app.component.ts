import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomePageComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ProyectoFixiFrontend';
}
