import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	CUSTOM_ELEMENTS_SCHEMA,
	ElementRef,
	inject,
	OnDestroy,
	PLATFORM_ID,
	signal,
	viewChild,
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
import { NavbarBlankService } from '../../services/navbar-blank.service';
import { fromEvent, map, Observable, Subject, takeUntil } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

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
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarBlankComponent implements AfterViewInit, OnDestroy {
	readonly _NavbarBlankService = inject(NavbarBlankService);

	readonly _PLATFORM_ID = inject(PLATFORM_ID);

	//Signal-Based Query
	navbar = viewChild<ElementRef<HTMLDivElement>>('navbar');
	lucideIcons = {
		Search: Search,
		Heart: Heart,
		ShoppingCart: ShoppingCart,
		CircleUserRound: CircleUserRound,
	};
	q: WritableSignal<string> = signal('');
	windowScrollY: WritableSignal<number> = signal(0);
	destroy$: Subject<void> = new Subject<void>();

	// observable to handle window scroll to enhance change detection
	windowScroll$!: Observable<number>;

	//Signal to get navbar Height
	ngAfterViewInit(): void {
		this._NavbarBlankService.scrollMeasure.set(
			this.navbar()?.nativeElement?.offsetHeight ?? 0
		);
		if (isPlatformBrowser(this._PLATFORM_ID)) {
			this.windowScroll$ = fromEvent(window, 'scroll').pipe(
				map(() => window.scrollY)
			);

			// Observable to handle the scroll with the navbar service
			this.windowScroll$.pipe(takeUntil(this.destroy$)).subscribe((e) => {
				this.windowScrollY.set(e);
				this._NavbarBlankService.isScrolled.set(
					this.windowScrollY() >
						this._NavbarBlankService.scrollMeasure()
				);
			});
		}
	}
	//Hook to unsubscribe from observables
	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
