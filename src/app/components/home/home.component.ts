import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { RouterLink } from "@angular/router";
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";
import { CategoriesService } from "../../services/categories.service";
import { ICategory } from "../../interfaces/icategory";
import { ProductComponent } from "../product/product.component";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [RouterLink, CarouselModule, ProductComponent],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.scss"
})
export class HomeComponent implements OnInit, OnDestroy {
	private readonly _CategoriesService = inject(CategoriesService);
	allCategoriesRes: WritableSignal<ICategory[]> = signal([]);
	searchTerm: WritableSignal<string> = signal("");
	private readonly destroy$ = new Subject<void>();
	catCustomOptions: OwlOptions = {
		loop: true,
		mouseDrag: false,
		touchDrag: true,
		pullDrag: false,
		dots: false,
		navSpeed: 700,
		navText: ["", ""],
		responsive: {
			0: {
				items: 1
			},
			400: {
				items: 2
			},
			740: {
				items: 4
			},
			940: {
				items: 6
			}
		},
		nav: true
	};
	staticCustomOptions: OwlOptions = {
		loop: true,
		mouseDrag: false,
		touchDrag: true,
		pullDrag: false,
		dots: false,
		navSpeed: 700,
		navText: ["", ""],
		responsive: {
			0: {
				items: 1
			},
			400: {
				items: 1
			},
			740: {
				items: 2
			},
			940: {
				items: 4
			}
		},
		nav: true
	};
	ngOnInit(): void {
		this._CategoriesService
			.getAllCategories()
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (res) => {
					this.allCategoriesRes.set(res.data);
				},
				error: (err) => {
					console.error(err);
				}
			});
	}
	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
