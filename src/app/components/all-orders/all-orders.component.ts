import {
	Component,
	inject,
	OnDestroy,
	OnInit,
	signal,
	WritableSignal,
} from "@angular/core";
import { OrdersService } from "../../services/orders.service";
import { IOrders } from "../../interfaces/iorders";
import { Subscription } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";
import { CurrencyPipe, DatePipe, NgClass } from "@angular/common";

@Component({
	selector: "app-all-orders",
	standalone: true,
	imports: [NgbAccordionModule, NgClass, CurrencyPipe, DatePipe],
	templateUrl: "./all-orders.component.html",
	styleUrl: "./all-orders.component.scss",
})
export class AllOrdersComponent implements OnInit, OnDestroy {
	private readonly _OrdersService = inject(OrdersService);

	getUserOrders: WritableSignal<IOrders[]> = signal([]);
	getUserOrdersSub!: Subscription;
	ngOnInit(): void {
		this.getUserOrdersSub = this._OrdersService.getUserOrders().subscribe({
			next: (res) => {
				this.getUserOrders.set(res);
			},
			error: (err: HttpErrorResponse) => {
				console.error(err.error.message);
			},
		});
	}
	ngOnDestroy(): void {
		this.getUserOrdersSub?.unsubscribe();
	}
}
