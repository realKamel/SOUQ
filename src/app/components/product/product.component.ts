import {
	Component,
	inject,
	OnDestroy,
	OnInit,
	signal,
	WritableSignal,
} from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { IProduct } from "../../interfaces/iproduct";
import { finalize, Subscription } from "rxjs";
import { NgbRating } from "@ng-bootstrap/ng-bootstrap";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { SearchFilterPipe } from "../../pipes/search-filter.pipe";
import { CurrencyPipe, NgClass } from "@angular/common";
import { WishlistService } from "../../services/wishlist.service";
import { IWishlist } from "../../interfaces/iwishlist";
import { CartService } from "../../services/cart.service";
import { ToastrService } from "ngx-toastr";

@Component({
	selector: "app-product",
	standalone: true,
	imports: [
		NgbRating,
		RouterLink,
		FormsModule,
		SearchFilterPipe,
		CurrencyPipe,
		NgClass,
	],
	templateUrl: "./product.component.html",
	styleUrl: "./product.component.scss",
})
export class ProductComponent implements  OnDestroy {
	private readonly _ProductsService = inject(ProductsService);
	private readonly _WishlistService = inject(WishlistService);
	private readonly _CartService = inject(CartService);
	private readonly _ToastrService = inject(ToastrService);
	allProdRes: WritableSignal<IProduct[]> = signal([]);
	searchTerm: WritableSignal<string> = signal("");
	private getLoggedUserWishlistSub!: Subscription;
	private allProdSubscribe!: Subscription;
	private removeProductFromWishlistSub!: Subscription;
	private addProductToWishlistSub!: Subscription;
	private addProductToCartSub!: Subscription;

	/* ngOnInit() {
		this.getLoggedUserWishlistSub = this._WishlistService
			.getLoggedUserWishlist()
			.subscribe({
				next: (res) => {
					this._WishlistService.inWishListProudctsIds = res.data.map(
						(prod: IWishlist) => prod._id
					);
					this.allProdSubscribe = this._ProductsService
						.getAllProducts()
						.subscribe({
							next: (res) => {
								this.allProdRes.set(
									res.data.map((product: IProduct) => {
										product.inWishList =
											this._WishlistService.inWishListProudctsIds.includes(
												product.id
											);
										return product;
									})
								);
							},
							error: (err) => {
								console.error(err);
							},
						});
				},
				error: (err) => {
					console.error(err);
				},
			});
	}
 */	onInput(event: Event) {
		const inputElement = event.target as HTMLInputElement;
		this.searchTerm.set(inputElement.value);
	}
	addOrRemoveFromWishlist(id: string, inWishList: boolean = false) {
		if (inWishList) {
			this.removeProductFromWishlistSub = this._WishlistService
				.removeProductFromWishlist(id)
				.pipe(
					finalize(() => {
						this.allProdRes().map((product: IProduct) => {
							product.inWishList =
								this._WishlistService.inWishListProudctsIds.includes(
									product.id
								);
							return product;
						});
					})
				)
				.subscribe({
					next: (res) => {
						this._WishlistService.inWishListProudctsIds = res.data;
					},
					error: (err) => {
						console.error(err);
					},
				});
		} else {
			this.addProductToWishlistSub = this._WishlistService
				.addProductToWishlist(id)
				.pipe(
					finalize(() => {
						this.allProdRes().map((product: IProduct) => {
							product.inWishList =
								this._WishlistService.inWishListProudctsIds.includes(
									product.id
								);
							return product;
						});
					})
				)
				.subscribe({
					next: (res) => {
						console.log(res);
						this._WishlistService.inWishListProudctsIds = res.data;
					},
					error: (err) => {
						console.error(err);
					},
				});
		}
	}
	addToCart(id: string) {
		this.addProductToCartSub = this._CartService
			.addProductToCart(id)
			.subscribe({
				next: (res) => {
					console.log(res.message);
					this._CartService.numOfCartItems.set(res.numOfCartItems);
					this._ToastrService.success(res.message);
				},
			});
	}
	ngOnDestroy(): void {
		this.removeProductFromWishlistSub?.unsubscribe();
		this.addProductToWishlistSub?.unsubscribe();
		this.getLoggedUserWishlistSub?.unsubscribe();
		this.allProdSubscribe?.unsubscribe();
		this.addProductToCartSub?.unsubscribe();
	}
}
