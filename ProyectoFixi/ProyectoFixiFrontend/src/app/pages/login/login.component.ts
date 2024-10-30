import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private router: Router){}

  login(){
    console.log("hola")
    this.router.navigate(['/homeClient'])
  }

  goToSignUp() {
    this.router.navigate(['/signup']);
  }
}
