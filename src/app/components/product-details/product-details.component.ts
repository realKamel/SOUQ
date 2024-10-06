import {
	Component,
	inject,
	OnDestroy,
	OnInit,
	signal,
	WritableSignal,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductsService } from "../../services/products.service";
import { IProduct } from "../../interfaces/iproduct";
import { Subscription } from "rxjs";
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";
import { NgbRating } from "@ng-bootstrap/ng-bootstrap";
import { CurrencyPipe } from "@angular/common";

@Component({
	selector: "app-product-details",
	standalone: true,
	imports: [CarouselModule, NgbRating, CurrencyPipe],
	templateUrl: "./product-details.component.html",
	styleUrl: "./product-details.component.scss",
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
	private readonly _ActivatedRoute = inject(ActivatedRoute);
	private readonly _ProductsService = inject(ProductsService);
	productId: WritableSignal<string | null> = signal("");
	SpcificProdRes: WritableSignal<IProduct> = signal({} as IProduct);
	SpcificProdSubscribe!: Subscription;

	ngOnInit(): void {
		this._ActivatedRoute.paramMap.subscribe({
			next: (p) => {
				this.productId.set(p.get("id"));
				this.SpcificProdSubscribe = this._ProductsService
					.getSpcificProduct(this.productId())
					.subscribe({
						next: (res) => {
							this.SpcificProdRes.set(res.data);
						},
					});
			},
		});
	}
	customOptions: OwlOptions = {
		loop: true,
		mouseDrag: true,
		touchDrag: true,
		pullDrag: false,
		dots: false,
		navSpeed: 700,
		navText: ["", ""],
		items: 1,
		nav: true,
	};

	ngOnDestroy(): void {
		this.SpcificProdSubscribe?.unsubscribe();
	}
}
