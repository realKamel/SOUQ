import { Component } from '@angular/core';
import { NavBarAuthComponent } from '../../components/nav-bar-auth/nav-bar-auth.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-auth',
	imports: [NavBarAuthComponent, FooterComponent, RouterOutlet],
	templateUrl: './auth.component.html',
	styleUrl: './auth.component.scss',
})
export class AuthComponent {}
