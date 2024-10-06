import {
	Component,
	inject,
	OnDestroy,
	OnInit,
	signal,
	WritableSignal,
} from "@angular/core";
import { CategoriesService } from "../../services/categories.service";
import { ICategory } from "../../interfaces/icategory";
import { Subscription } from "rxjs";
import { ISubcategory } from "../../interfaces/isubcategory";

@Component({
	selector: "app-categorie",
	standalone: true,
	imports: [],
	templateUrl: "./categorie.component.html",
	styleUrl: "./categorie.component.scss",
})
export class CategorieComponent implements OnInit, OnDestroy {
	_CategoriesService = inject(CategoriesService);
	AllCategoriesRes: WritableSignal<ICategory[]> = signal([]);
	SubCategoryName: WritableSignal<string> = signal("");
	AllSubCategoriesOnCategoryRes: WritableSignal<ISubcategory[]> = signal([]);
	private AllCategoriesSub!: Subscription;
	private AllSubCategoriesOnCategorySub!: Subscription;
	ngOnInit(): void {
		this.AllCategoriesSub = this._CategoriesService
			.getAllCategories()
			.subscribe({
				next: (res) => {
					this.AllCategoriesRes.set(res.data);
				},
			});
	}

	AllSubCategoriesOnCategory(id: string, name: string) {
		this.AllSubCategoriesOnCategorySub = this._CategoriesService
			.getAllSubCategoriesOnCategory(id)
			.subscribe({
				next: (res) => {
					this.AllSubCategoriesOnCategoryRes.set(res.data);
					if (this.AllSubCategoriesOnCategoryRes().length !== 0) {
						this.SubCategoryName.set(name);
					} else {
						this.SubCategoryName.set("");
					}
				},

				error: (err) => {
					console.error(err);
				},
			});
	}
	ngOnDestroy(): void {
		this.AllCategoriesSub?.unsubscribe();
		this.AllSubCategoriesOnCategorySub?.unsubscribe();
	}
}
