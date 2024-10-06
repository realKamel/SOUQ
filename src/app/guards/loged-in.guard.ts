import { inject, PLATFORM_ID } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { isPlatformBrowser } from "@angular/common";

export const logedInGuard: CanActivateFn = (route, state) => {
	const _AuthService = inject(AuthService);
	const _Router = inject(Router);
	const _PLATFORM_ID = inject(PLATFORM_ID);

	if (isPlatformBrowser(_PLATFORM_ID)) {
		if (_AuthService.getUserToken()) {
			return true;
		} else {
			_Router.navigate(["/login"]);
			return false;
		}
	} else {
		return false;
	}
};
