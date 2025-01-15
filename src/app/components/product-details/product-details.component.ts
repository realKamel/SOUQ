import {
	Component,
	inject,
	OnInit,
	signal,
	WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Subject, takeUntil } from 'rxjs';
import { IProducts } from '../../interfaces/iproducts';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'app-product-details',
	imports: [],
	templateUrl: './product-details.component.html',
	styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
	private readonly _ActivatedRoute = inject(ActivatedRoute);

	private readonly _ProductsService = inject(ProductsService);
	private readonly destroy$ = new Subject<void>();
	itemId = signal('');
	productDetails: WritableSignal<IProducts> = signal({} as IProducts);
	ngOnInit(): void {
		this._ActivatedRoute.paramMap.subscribe((params) => {
			this.itemId.set(params.get('id')!);
			console.log(this.itemId());
		});
		this._ProductsService
			.getSingleProduct(this.itemId())
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (product) => {
					this.productDetails.set(product);
					console.log(product);
				},
				error: (error: HttpErrorResponse) => {
					console.error(error);
				},
			});
	}
}
