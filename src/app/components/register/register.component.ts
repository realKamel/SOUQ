import {
	Component,
	inject,
	OnDestroy,
	signal,
	WritableSignal,
} from "@angular/core";
import { AuthService } from "../../services/auth.service";
import {
	AbstractControl,
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { finalize, Subscription } from "rxjs";
import { NgClass } from "@angular/common";
import { Router, RouterLink } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
	selector: "app-register",
	standalone: true,
	imports: [ReactiveFormsModule, NgClass, RouterLink],
	templateUrl: "./register.component.html",
	styleUrl: "./register.component.scss",
})
export class RegisterComponent implements OnDestroy {
	private _AuthService: AuthService = inject(AuthService);
	private _ToastrService = inject(ToastrService);
	private _Router = inject(Router);
	private signUpSub!: Subscription;
	isLoading: WritableSignal<boolean> = signal(false);

	registerForm: FormGroup = new FormGroup(
		{
			name: new FormControl(null, [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(20),
			]),
			email: new FormControl(null, [
				Validators.required,
				Validators.email,
			]),
			password: new FormControl(null, [
				Validators.required,
				Validators.pattern(/^\w{6,}$/),
			]),
			rePassword: new FormControl(null),
			phone: new FormControl(null, [
				Validators.required,
				Validators.pattern(/^01[0125]\d{8}$/),
			]),
		},
		this.checkPasswords
	);
	checkPasswords(f: AbstractControl) {
		if (f.get("password")?.value === f.get("rePassword")?.value) {
			return null;
		}
		return { mismatch: "true" };
	}
	submitRegisterForm() {
		if (this.registerForm.valid) {
			this.isLoading.set(true);
			this.signUpSub = this._AuthService
				.signUp(this.registerForm.value)
				.pipe(finalize(() => this.isLoading.set(false)))
				.subscribe({
					next: (res) => {
						this._ToastrService.success(res.message);
						this._AuthService.setUserToken(res.token);
						this._Router.navigate(["/home"]);
						console.log(res);
					},
					error: (error: HttpErrorResponse) => {
						console.error(error.error.message);
					},
				});
		} else {
			this.registerForm.setErrors({ mismatch: true });
			this.registerForm.markAllAsTouched();
		}
	}
	ngOnDestroy(): void {
		this.signUpSub?.unsubscribe();
	}
}
