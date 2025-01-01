import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ButtonModule } from 'primeng/button';
@Component({
	selector: 'app-nav-bar-blank',
	imports: [ButtonModule],
	templateUrl: './nav-bar-blank.component.html',
	styleUrl: './nav-bar-blank.component.scss',
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavBarBlankComponent {}
