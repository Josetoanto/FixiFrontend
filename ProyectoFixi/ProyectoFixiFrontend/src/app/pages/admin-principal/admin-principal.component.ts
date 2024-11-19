import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-admin-principal',
  standalone: true,
  imports: [],
  templateUrl: './admin-principal.component.html',
  styleUrl: './admin-principal.component.scss'
})
export class AdminPrincipalComponent {
  usuariosActivos = 0;
  fixisActivos = 0;
  ingresosTotales = 50.0; // Valor estático

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers(0, 20).subscribe(
      (users) => {
        console.log(users)
        // Clasificar usuarios por tipo
        this.usuariosActivos = users.filter(
          (user: any) => user.tipo_usuario === 'Cliente'
        ).length;
        console.log(this.usuariosActivos)

        this.fixisActivos = users.filter(
          (user: any) => user.tipo_usuario === 'Proveedor'
        ).length;
        console.log(this.fixisActivos)
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }
}
