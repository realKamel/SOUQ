import {
	ApplicationConfig,
	importProvidersFrom,
	provideExperimentalZonelessChangeDetection,
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

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
	providers: [
		provideExperimentalZonelessChangeDetection(),
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
	],
};
