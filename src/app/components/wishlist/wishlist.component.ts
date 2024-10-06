import { IWishlistRes } from "./../../interfaces/iwishlist";
import {
	Component,
	inject,
	OnDestroy,
	OnInit,
	signal,
	WritableSignal,
} from "@angular/core";
import { WishlistService } from "../../services/wishlist.service";
import { finalize, Subscription } from "rxjs";
import { IWishlist } from "../../interfaces/iwishlist";
import { CurrencyPipe } from "@angular/common";
import { CartService } from "../../services/cart.service";
import { ToastrService } from "ngx-toastr";

@Component({
	selector: "app-wishlist",
	standalone: true,
	imports: [CurrencyPipe],
	templateUrl: "./wishlist.component.html",
	styleUrl: "./wishlist.component.scss",
})
export class WishlistComponent implements OnInit, OnDestroy {
	private readonly _WishlistService = inject(WishlistService);
	private readonly _ToastrService = inject(ToastrService);
	private readonly _CartService = inject(CartService);
	getLoggedUserWishlistRes: WritableSignal<IWishlist[]> = signal([]);
	private getLoggedUserWishlistSub!: Subscription;
	private addProductToCartSub!: Subscription;
	private removeProductFromWishlistSub!: Subscription;
	ngOnInit(): void {
		this.getAllWishList();
	}

	getAllWishList() {
		this.getLoggedUserWishlistSub = this._WishlistService
			.getLoggedUserWishlist()
			.subscribe({
				next: (res: IWishlistRes) => {
					this.getLoggedUserWishlistRes.set(res.data);
				},
				error: (err) => {
					console.error(err);
				},
			});
	}
	removeFromWishlist(id: string) {
		this._WishlistService
			.removeProductFromWishlist(id)
			.pipe(
				finalize(() => {
					this.getAllWishList();
				})
			)
			.subscribe({
				next: (res) => {
					this._ToastrService.success(res.message);
					this._WishlistService.inWishListProudctsIds = res.data;
				},
				error: (err) => {
					console.error(err);
				},
			});
	}
	addToCart(id: string) {
		this.addProductToCartSub = this._CartService
			.addProductToCart(id)
			.subscribe({
				next: (res) => {
					this._CartService.numOfCartItems.set(res.numOfCartItems);
					this._ToastrService.success(res.message);
				},
				error: (err) => {
					console.error(err);
				},
			});
	}
	ngOnDestroy(): void {
		this.getLoggedUserWishlistSub?.unsubscribe();
		this.addProductToCartSub?.unsubscribe();
		this.removeProductFromWishlistSub?.unsubscribe();
	}
}
