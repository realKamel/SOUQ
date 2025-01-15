import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class NavbarBlankService {
	isScrolled: WritableSignal<boolean> = signal(false);
	scrollMeasure: WritableSignal<number> = signal(0);
}
