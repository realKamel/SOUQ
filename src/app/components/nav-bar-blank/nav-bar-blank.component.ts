import {
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	ElementRef,
	HostListener,
	output,
	signal,
	ViewChild,
	WritableSignal,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
	LucideAngularModule,
	Search,
	Heart,
	ShoppingCart,
	CircleUserRound,
} from 'lucide-angular';
import { DividerModule } from 'primeng/divider';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-nav-bar-blank',
	imports: [
		ButtonModule,
		ReactiveFormsModule,
		FormsModule,
		InputTextModule,
		LucideAngularModule,
		DividerModule,
		RouterLink,
	],
	templateUrl: './nav-bar-blank.component.html',
	styleUrl: './nav-bar-blank.component.scss',
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NavBarBlankComponent {
	@ViewChild('navbar') navbar!: ElementRef;
	lucideIcons = {
		Search: Search,
		Heart: Heart,
		ShoppingCart: ShoppingCart,
		CircleUserRound: CircleUserRound,
	};
	q: WritableSignal<string> = signal('');
	readonly isScrolled: WritableSignal<boolean> = signal(false);
	private scrollMeasure = 0;
	scrollToParent = output<number>();

	@HostListener('window:scroll', [])
	onWindowScroll() {
		// Change navbar style after scrolling navbar height pixels
		this.isScrolled.set(window.scrollY > this.scrollMeasure);
		this.scrollMeasure = this.navbar.nativeElement.offsetHeight ?? 0;
		this.scrollToParent.emit(this.scrollMeasure);
	}
}
