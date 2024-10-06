import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { OrdersService } from "../../services/orders.service";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { NgClass } from "@angular/common";
import { ToastrService } from "ngx-toastr";

@Component({
	selector: "app-check-out",
	standalone: true,
	imports: [ReactiveFormsModule, NgClass],
	templateUrl: "./check-out.component.html",
	styleUrl: "./check-out.component.scss",
})
export class CheckOutComponent implements OnInit {
	private readonly _ActivatedRoute = inject(ActivatedRoute);
	private readonly _ToastrService = inject(ToastrService);
	private readonly _OrdersService = inject(OrdersService);
	private cartId = signal("");
	shippingForm: FormGroup = new FormGroup({
		details: new FormControl(null, [
			Validators.required,
			Validators.minLength(3),
		]),
		phone: new FormControl(null, [
			Validators.required,
			Validators.pattern(/^01[0125]\d{8}$/),
		]),
		city: new FormControl(null, [
			Validators.required,
			Validators.maxLength(15),
		]),
	});
	ngOnInit(): void {
		this._ActivatedRoute.paramMap.subscribe({
			next: (p) => {
				this.cartId.set(p.get("cart_id")!);
			},
		});
	}
	checkOut(): void {
		if (this.shippingForm.valid)
			this._OrdersService
				.checkOutSession(this.cartId(), this.shippingForm.value)
				.subscribe({
					next: (res) => {
						this._ToastrService.success(res.status);
						window.open(res.session.url, "_self");
					},
				});
	}
}
