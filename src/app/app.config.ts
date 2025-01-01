import {
	ApplicationConfig,
	provideZoneChangeDetection,
	importProvidersFrom,
} from '@angular/core';
import {
	provideRouter,
	withInMemoryScrolling,
	withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import {
	provideClientHydration,
	withEventReplay,
} from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(
			routes,
			withInMemoryScrolling({
				scrollPositionRestoration: 'top',
			}),
			//withHashLocation(),
			withViewTransitions()
		),
		provideClientHydration(withEventReplay()),
		importProvidersFrom(FormsModule),
		provideAnimationsAsync(),
		provideHttpClient(withFetch()),
		providePrimeNG({
			theme: {
				preset: Aura,
				options: {
					cssLayer: {
						name: 'primeng',
						order: 'tailwind-base, primeng, tailwind-utilities',
					},
					darkModeSelector: '.my-app-dark',
				},
			},
			ripple: true,
		}),
	],
};
