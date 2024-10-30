import { Component } from '@angular/core';
import { HeaderClientComponent } from '../../component/header-client/header-client.component';
import { CardComponent } from '../../component/card/card.component';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [HeaderClientComponent,CardComponent,NgFor],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss'
})
export class UserHomeComponent {
  cards = [
    {
      title: 'Limpieza',
      imageUrl: 'limpieza.jpg',
      fixisAvailable: 36,
      minPrice: 50
    },
    {
      title: 'Jardinería',
      imageUrl: 'jardineria.jpg',
      fixisAvailable: 24,
      minPrice: 75
    },
    {
      title: 'Electricidad',
      imageUrl: 'electricidad.jpeg',
      fixisAvailable: 15,
      minPrice: 100
    },
    {
      title: 'Fontanería',
      imageUrl: 'fontaneria.jpeg',
      fixisAvailable: 20,
      minPrice: 80
    },
    {
      title: 'Pintura',
      imageUrl: 'pintura.jpeg',
      fixisAvailable: 10,
      minPrice: 120
    },
    {
      title: 'Montaje de muebles',
      imageUrl: 'motajeMueble.jpeg',
      fixisAvailable: 18,
      minPrice: 65
    }
  ];
}
