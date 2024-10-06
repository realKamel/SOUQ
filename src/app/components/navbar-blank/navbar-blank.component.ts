import { Component, computed, inject, OnInit, signal, Signal } from "@angular/core";
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from "@angular/router";
import { NgbCollapseModule } from "@ng-bootstrap/ng-bootstrap";
import { AuthService } from "../../services/auth.service";
import { IUser } from "../../interfaces/iuser";
import { CartService } from "../../services/cart.service";

@Component({
	selector: "app-navbar-blank",
	standalone: true,
	imports: [RouterLink, RouterLinkActive, NgbCollapseModule],
	templateUrl: "./navbar-blank.component.html",
	styleUrl: "./navbar-blank.component.scss"
})
export class NavbarBlankComponent implements OnInit {
	isMenuCollapsed = signal(true);
	private readonly _Router = inject(Router);
	private readonly _AuthService = inject(AuthService);
	readonly _CartService = inject(CartService);

	navCartCounter: Signal<number> = computed(() => this._CartService.numOfCartItems());

	ngOnInit() {
		this._Router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				this.isMenuCollapsed.set(true);
			}
		});
		this._CartService.getLoggedUserCart().subscribe({
			next: (res) => {
				this._CartService.numOfCartItems.set(res.numOfCartItems);
			}
		});
	}
	toggleCollapse() {
		this.isMenuCollapsed.set(!this.isMenuCollapsed());
	}
	logOut() {
		this._AuthService.deleteUserToken();
		this._AuthService.userData = {} as IUser;
		this._Router.navigate(["/login"]);
	}
}
