import {
	AfterViewInit,
	Component,
	ElementRef,
	inject,
	PLATFORM_ID,
	Renderer2,
	viewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarBlankComponent } from '../../components/nav-bar-blank/nav-bar-blank.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { isPlatformBrowser } from '@angular/common';
import { NavbarBlankService } from '../../services/navbar-blank.service';

@Component({
	selector: 'app-blank',
	imports: [RouterOutlet, NavBarBlankComponent, FooterComponent],
	templateUrl: './blank.component.html',
	styleUrl: './blank.component.scss',
})
export class BlankComponent implements AfterViewInit {
	readonly _NavbarBlankService = inject(NavbarBlankService);

	blankBody = viewChild<ElementRef<HTMLDivElement>>('blankBody');
	private readonly _Renderer2 = inject(Renderer2);
	private readonly _PLATFORM_ID = inject(PLATFORM_ID);

	ngAfterViewInit(): void {
		if (isPlatformBrowser(this._PLATFORM_ID)) {
			this._Renderer2.setStyle(
				this.blankBody()?.nativeElement,
				'marginTop',
				`${this._NavbarBlankService.scrollMeasure() + 30}px`
			);
		}
	}
}
