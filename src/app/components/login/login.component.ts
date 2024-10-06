import {
	Component,
	inject,
	OnDestroy,
	signal,
	WritableSignal,
} from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { finalize, Subscription } from "rxjs";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { Router, RouterLink } from "@angular/router";
import { NgClass } from "@angular/common";

@Component({
	selector: "app-login",
	standalone: true,
	imports: [ReactiveFormsModule, NgClass, RouterLink],
	templateUrl: "./login.component.html",
	styleUrl: "./login.component.scss",
})
export class LoginComponent implements OnDestroy {
	private _AuthService: AuthService = inject(AuthService);
	private _Router: Router = inject(Router);
	private logInSub!: Subscription;
	isLoading: WritableSignal<boolean> = signal(false);

	logInForm: FormGroup = new FormGroup({
		email: new FormControl(null, [Validators.required, Validators.email]),
		password: new FormControl(null, [
			Validators.required,
			Validators.pattern(/^\w{6,}$/),
		]),
	});
	submitLogInForm() {
		if (this.logInForm.valid) {
			this.isLoading.set(true);
			this.logInSub = this._AuthService
				.signIn(this.logInForm.value)
				.pipe(finalize(() => this.isLoading.set(false)))
				.subscribe({
					next: (res) => {
						this._AuthService.setUserToken(res.token);
						if (res.message === "success") {
							this._Router.navigate(["/home"]);
						}
					},
					error: (error: HttpErrorResponse) => {
						console.error(error.error.message);
					},
				});
		}
	}
	ngOnDestroy(): void {
		this.logInSub?.unsubscribe();
	}
}
