import {
	afterRender,
	Component,
	ElementRef,
	inject,
	OnDestroy,
	OnInit,
	signal,
	WritableSignal
} from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { RouterLink } from "@angular/router";
import { CarouselModule, OwlOptions } from "ngx-owl-carousel-o";
import { CategoriesService } from "../../services/categories.service";
import { ICategory } from "../../interfaces/icategory";
import { ProductComponent } from "../product/product.component";
import { CommonModule, NgClass } from "@angular/common";
import Swiper from "swiper";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [RouterLink, CarouselModule, ProductComponent, NgClass, CommonModule],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.scss"
})
export class HomeComponent implements OnInit, OnDestroy {
	//FIXME:fix slider design
	private readonly _CategoriesService = inject(CategoriesService);
	private readonly _ElementRef = inject(ElementRef);
	allCategoriesRes: WritableSignal<ICategory[]> = signal([]);
	searchTerm: WritableSignal<string> = signal("");
	private readonly destroy$ = new Subject<void>();
	swiper!: Swiper;
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
	constructor() {
		afterRender(() => {
			let swiperContainer = this._ElementRef.nativeElement.querySelector(".mySwiper");
			let swiperScroll = this._ElementRef.nativeElement.querySelector(".swiper-scrollbar");
			this.swiper = new Swiper(swiperContainer, {
				freeMode: true,
				loop: true,
				scrollbar: {
					el: swiperScroll,
					hide: true,
					draggable: true
				},
				slidesPerView: 10,
				spaceBetween: 10,
				// Responsive breakpoints
				breakpoints: {
					// when window width is >= 320px
					320: {
						slidesPerView: 3.5,
						spaceBetween: 20
					},
					// when window width is >= 480px
					480: {
						slidesPerView: 3,
						spaceBetween: 30
					},
					// when window width is >= 640px
					640: {
						slidesPerView: 5,
						spaceBetween: 30
					}
				}
			});
		});
	}
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
