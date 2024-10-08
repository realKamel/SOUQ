import {
	Component,
	inject,
	OnDestroy,
	OnInit,
	signal,
	TemplateRef,
	WritableSignal
} from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { BrandsService } from "../../services/brands.service";
import { IBrand } from "../../interfaces/ibrand";
import { Subject, Subscription, takeUntil } from "rxjs";

@Component({
	selector: "app-brands",
	standalone: true,
	imports: [],
	templateUrl: "./brands.component.html",
	styleUrl: "./brands.component.scss"
})
export class BrandsComponent implements OnInit, OnDestroy {
	private readonly modalService = inject(NgbModal);
	private readonly _BrandsService = inject(BrandsService);
	closeResult: WritableSignal<string> = signal("");
	AllBrands: WritableSignal<IBrand[]> = signal([]);
	private readonly destroy$ = new Subject<void>();
	AllBrandsSubscription!: Subscription;

	ngOnInit(): void {
		this._BrandsService
			.getAllBrands()
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (res) => {
					this.AllBrands.set(res.data);
				},
				error: (err) => {
					console.error(err);
				}
			});
	}
	open(content: TemplateRef<any>) {
		this.modalService.open(content, { ariaLabelledBy: "modal-basic-title" }).result.then(
			(result) => {
				this.closeResult.set(`Closed with: ${result}`);
			},
			(reason) => {
				this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
			}
		);
	}
	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return "by pressing ESC";
			case ModalDismissReasons.BACKDROP_CLICK:
				return "by clicking on a backdrop";
			default:
				return `with: ${reason}`;
		}
	}
	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
