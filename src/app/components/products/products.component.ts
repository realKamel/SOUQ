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
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { IProducts } from '../../interfaces/iproducts';
import { Heart, LucideAngularModule, ShoppingCart } from 'lucide-angular';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
	selector: 'app-products',
	imports: [
		ButtonModule,
		CardModule,
		LucideAngularModule,
		CurrencyPipe,
		RouterLink,
	],
	templateUrl: './products.component.html',
	styleUrl: './products.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit, OnDestroy {
	readonly LucideIcon = {
		Heart: Heart,
		ShoppingCart: ShoppingCart,
	};
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
