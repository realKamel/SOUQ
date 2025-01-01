import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarBlankComponent } from '../../components/nav-bar-blank/nav-bar-blank.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
	selector: 'app-blank',
	imports: [RouterOutlet, NavBarBlankComponent, FooterComponent],
	templateUrl: './blank.component.html',
	styleUrl: './blank.component.scss',
})
export class BlankComponent {}
