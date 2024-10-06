import {
	Component,
	inject,
	OnDestroy,
	OnInit,
	signal,
	WritableSignal,
} from "@angular/core";
import { CartService } from "../../services/cart.service";
import { ICart } from "../../interfaces/icart";
import { Subscription } from "rxjs";
import { CurrencyPipe } from "@angular/common";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";
import { Router, RouterLink } from "@angular/router";
import { OrdersService } from "../../services/orders.service";

@Component({
	selector: "app-cart",
	standalone: true,
	imports: [CurrencyPipe,RouterLink],
	templateUrl: "./cart.component.html",
	styleUrl: "./cart.component.scss",
})
export class CartComponent implements OnInit, OnDestroy {
	readonly _CartService = inject(CartService);
	readonly _ToastrService = inject(ToastrService);
	readonly _OrdersService = inject(OrdersService);
	readonly _Router = inject(Router);
	getLoggedUserCartRes: WritableSignal<ICart> = signal({} as ICart);
	private getLoggedUserCartSub!: Subscription;
	private removeSpecificCartItemSub!: Subscription;
	private clearUserCartSub!: Subscription;
	ngOnInit(): void {
		this.getLoggedUserCartSub = this._CartService
			.getLoggedUserCart()
			.subscribe({
				next: (res) => {
					this._CartService.numOfCartItems.set(res.numOfCartItems);
					this.getLoggedUserCartRes.set(res.data);
				},
			});
	}

	updateCartProduct(id: string, q: number) {
		this._CartService.updateCartProductQuantity(id, q).subscribe({
			next: (res) => {
				this._CartService.numOfCartItems.set(res.numOfCartItems);
				this._ToastrService.success(res.status);
				this.getLoggedUserCartRes.set(res.data);
			},
			error: (err: HttpErrorResponse) => {
				console.error(err.error.message);
			},
		});
	}
	removeItemFromCart(id: string): void {
		this._CartService.removeSpecificCartItem(id).subscribe({
			next: (res) => {
				this._CartService.numOfCartItems.set(res.numOfCartItems);
				this._ToastrService.success(res.status);
				this.getLoggedUserCartRes.set(res.data);
			},
			error: (err) => {
				console.error(err);
			},
		});
	}
	clearCart(): void {
		this.clearUserCartSub = this._CartService.clearUserCart().subscribe({
			next: (res) => {
				this._CartService.numOfCartItems.set(0);
				this._ToastrService.success(res.message);
				this.getLoggedUserCartRes.set({} as ICart);
			},
			error: (err) => {
				console.error(err);
			},
		});
	}

	ngOnDestroy(): void {
		this.getLoggedUserCartSub?.unsubscribe();
		this.removeSpecificCartItemSub?.unsubscribe();
		this.clearUserCartSub?.unsubscribe();
	}
}
