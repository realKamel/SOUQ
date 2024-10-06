import { Component } from '@angular/core';
import { NavbarAuthComponent } from "../../components/navbar-auth/navbar-auth.component";
import {  RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [NavbarAuthComponent,RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

}
