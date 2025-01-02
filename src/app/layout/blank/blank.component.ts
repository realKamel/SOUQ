import {
	AfterViewInit,
	Component,
	ElementRef,
	HostListener,
	inject,
	PLATFORM_ID,
	Renderer2,
	ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarBlankComponent } from '../../components/nav-bar-blank/nav-bar-blank.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
	selector: 'app-blank',
	imports: [RouterOutlet, NavBarBlankComponent, FooterComponent],
	templateUrl: './blank.component.html',
	styleUrl: './blank.component.scss',
})
export class BlankComponent implements AfterViewInit {
	scrollMeasure = 0;
	@ViewChild('blankBody') blankBody!: ElementRef<HTMLDivElement>;
	private readonly _Renderer2 = inject(Renderer2);
	private readonly _PLATFORM_ID = inject(PLATFORM_ID);

	@HostListener('window:scroll', [])
	onWindowScroll() {
		// Change navbar style after scrolling navbar height pixels
		console.log(`${this.scrollMeasure}`);
		if (isPlatformBrowser(this._PLATFORM_ID)) {
			this._Renderer2.setStyle(
				this.blankBody.nativeElement,
				'marginTop',
				`${this.scrollMeasure + (96 - 64)}px`
			);
		}
	}
	handleScrollChange(scroll: number) {
		this.scrollMeasure = scroll;
	}
	ngAfterViewInit(): void {
		this._Renderer2.setStyle(
			this.blankBody.nativeElement,
			'marginTop',
			'98px'
		);
	}
}
