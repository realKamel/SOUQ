import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
	const _AuthService = inject(AuthService);
	let userHeader: string = "";
	if (_AuthService.getUserToken()) {
		userHeader = _AuthService.getUserToken()!;
	}
	req = req.clone({
		setHeaders: {
			token: userHeader,
		},
	});
	return next(req);
};
