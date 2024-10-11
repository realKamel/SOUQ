import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { IProduct } from "../../interfaces/iproduct";
import { finalize, Subject, takeUntil } from "rxjs";
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
	imports: [RouterLink, FormsModule, SearchFilterPipe, CurrencyPipe, NgClass],
	templateUrl: "./product.component.html",
	styleUrl: "./product.component.scss"
})
export class ProductComponent implements OnInit, OnDestroy {
	private readonly _ProductsService = inject(ProductsService);
	private readonly _WishlistService = inject(WishlistService);
	private readonly _CartService = inject(CartService);
	private readonly _ToastrService = inject(ToastrService);
	private readonly destroy = new Subject<void>();
	allProdRes: WritableSignal<IProduct[]> = signal([]);
	searchTerm: WritableSignal<string> = signal("");

	ngOnInit() {
		this._WishlistService
			.getLoggedUserWishlist()
			.pipe(takeUntil(this.destroy))
			.subscribe({
				next: (res) => {
					this._WishlistService.inWishListProductsIds = res.data.map(
						(prod: IWishlist) => prod._id
					);
				},
				error: (err) => {
					console.error(err);
				}
			});
		this._ProductsService
			.getAllProducts()
			.pipe(takeUntil(this.destroy))
			.subscribe({
				next: (res) => {
					this.allProdRes.set(
						res.data.map((product: IProduct) => {
							product.inWishList =
								this._WishlistService.inWishListProductsIds.includes(product.id);
							return product;
						})
					);
				},
				error: (err) => {
					console.error(err);
				}
			});
	}
	onInput(event: Event) {
		const inputElement = event.target as HTMLInputElement;
		this.searchTerm.set(inputElement.value);
	}
	addOrRemoveFromWishlist(id: string, inWishList: boolean = false) {
		if (inWishList) {
			this._WishlistService
				.removeProductFromWishlist(id)
				.pipe(
					finalize(() => {
						this.allProdRes().forEach((product: IProduct) => {
							product.inWishList =
								this._WishlistService.inWishListProductsIds.includes(product.id);
						});
					})
				)
				.subscribe({
					next: (res) => {
						this._WishlistService.inWishListProductsIds = res.data;
					},
					error: (err) => {
						console.error(err);
					}
				});
		} else {
			this._WishlistService
				.addProductToWishlist(id)
				.pipe(
					finalize(() => {
						this.allProdRes().forEach((product: IProduct) => {
							product.inWishList =
								this._WishlistService.inWishListProductsIds.includes(product.id);
						});
					})
				)
				.subscribe({
					next: (res) => {
						console.log(res);
						this._WishlistService.inWishListProductsIds = res.data;
					},
					error: (err) => {
						console.error(err);
					}
				});
		}
	}
	addToCart(id: string) {
		this._CartService
			.addProductToCart(id)
			.pipe(takeUntil(this.destroy))
			.subscribe({
				next: (res) => {
					console.log(res.message);
					this._CartService.numOfCartItems.set(res.numOfCartItems);
					this._ToastrService.success(res.message);
				}
			});
	}
	ngOnDestroy(): void {
		this.destroy.next();
		this.destroy.complete();
	}
}
