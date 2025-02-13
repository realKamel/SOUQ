import {
	ChangeDetectionStrategy,
	Component,
	inject,
	OnDestroy,
	OnInit,
	signal,
	WritableSignal,
} from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Subject, takeUntil } from 'rxjs';
import { IProducts } from '../../interfaces/iproducts';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
	selector: 'app-products',
	imports: [CurrencyPipe, RouterLink, NgOptimizedImage],
	templateUrl: './products.component.html',
	styleUrl: './products.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit, OnDestroy {
	private readonly _ProductsService = inject(ProductsService);
	private readonly Destroy$ = new Subject<void>();
	productsList: WritableSignal<IProducts[]> = signal([]);
	ngOnInit(): void {
		this._ProductsService
			.getAllProducts()
			.pipe(takeUntil(this.Destroy$))
			.subscribe({
				next: (value) => {
					this.productsList.set(value);
				},
				error: (err) => console.error(err),
			});
	}
	ngOnDestroy(): void {
		this.Destroy$.next();
		this.Destroy$.complete();
	}
}
