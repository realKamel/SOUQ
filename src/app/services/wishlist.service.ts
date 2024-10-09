import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { AuthService } from "./auth.service";

@Injectable({
	providedIn: "root"
})
export class WishlistService {
	private readonly _HttpClient = inject(HttpClient);
	private readonly _AuthService = inject(AuthService);
	private readonly userHeader = this._AuthService.getUserToken();
	inWishListProductsIds: string[] = [];
	getLoggedUserWishlist(): Observable<any> {
		return this._HttpClient.get(`${environment.BaseUrl}/api/v1/wishlist`, {
			headers: { token: this.userHeader! }
		});
	}
	addProductToWishlist(id: string): Observable<any> {
		return this._HttpClient.post(`${environment.BaseUrl}/api/v1/wishlist`, {
			productId: `${id}`
		});
	}
	removeProductFromWishlist(id: string): Observable<any> {
		return this._HttpClient.delete(`${environment.BaseUrl}/api/v1/wishlist/${id}`);
	}
}
