import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import {
	provideRouter,
	RouterModule,
	withInMemoryScrolling,
	withViewTransitions
} from "@angular/router";

import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { headerInterceptor } from "./interceptors/header.interceptor";
import { errorInterceptor } from "./interceptors/error.interceptor";
import { loadingInterceptor } from "./interceptors/loading.interceptor";
import { provideToastr } from "ngx-toastr";
import { NgxSpinnerModule } from "ngx-spinner";

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(
			routes,
			withInMemoryScrolling({
				scrollPositionRestoration: "top"
			}),
			//withHashLocation(),
			withViewTransitions()
		),
		provideClientHydration(),
		provideHttpClient(withFetch(), withInterceptors([headerInterceptor, errorInterceptor])),
		provideAnimations(),
		importProvidersFrom(NgbModule, RouterModule, NgxSpinnerModule),
		provideToastr()
	]
};
