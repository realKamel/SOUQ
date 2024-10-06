import {
	Component,
	inject,
	OnDestroy,
	signal,
	WritableSignal,
} from "@angular/core";
import {
	FormControl,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { finalize, Subscription } from "rxjs";
import { NgClass } from "@angular/common";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
	selector: "app-forget-password",
	standalone: true,
	imports: [ReactiveFormsModule, NgClass],
	templateUrl: "./forget-password.component.html",
	styleUrl: "./forget-password.component.scss",
})
export class ForgetPasswordComponent implements OnDestroy {
	private readonly _AuthService = inject(AuthService);
	private readonly _Router = inject(Router);
	private forgetPasswordSub!: Subscription;
	private verifyResetCodeSub!: Subscription;
	private resetPasswordSuB!: Subscription;
	isLoading: WritableSignal<boolean> = signal(false);
	userEmail: WritableSignal<string> = signal("");
	step: WritableSignal<number> = signal(0);

	checkEmailForm: FormGroup = new FormGroup({
		email: new FormControl(null, [Validators.required, Validators.email]),
	});
	checkCodeForm: FormGroup = new FormGroup({
		resetCode: new FormControl(null, [
			Validators.required,
			Validators.pattern(/^\d{6}$/),
		]),
	});

	checkNewPasswordForm: FormGroup = new FormGroup({
		email: new FormControl(null, [Validators.required, Validators.email]),
		newPassword: new FormControl(null, [
			Validators.required,
			Validators.pattern(/^\w{6,}$/),
		]),
	});

	checkEmail() {
		if (this.checkEmailForm.valid) {
			this.isLoading.set(true);
			this.forgetPasswordSub = this._AuthService
				.forgetPassword(this.checkEmailForm.value)
				.pipe(finalize(() => this.isLoading.set(false)))
				.subscribe({
					next: (res: any) => {
						this.userEmail.set(
							this.checkEmailForm.get("email")?.value
						);
						console.log(res);
						if (res.statusMsg === "success") {
							this.step.update((s: number): number => s + 1);
						}
					},
					error: (err: HttpErrorResponse) => {
						console.error(err);
					},
				});
		}
	}
	checkCode() {
		if (this.checkCodeForm.valid) {
			this.isLoading.set(true);
			this.verifyResetCodeSub = this._AuthService
				.verifyResetCode(this.checkCodeForm.value)
				.pipe(finalize(() => this.isLoading.set(false)))
				.subscribe({
					next: (res) => {
						if (res.status === "Success") {
							this.step.update((s: number): number => s + 1);
							this.checkNewPasswordForm
								.get("email")
								?.setValue(this.userEmail());
						}
					},
					error: (err: HttpErrorResponse) => {
						console.error(err);
					},
				});
		}
	}
	checkNewPassword() {
		if (this.checkNewPasswordForm.valid) {
			this.isLoading.set(true);
			this.resetPasswordSuB = this._AuthService
				.resetPassword(this.checkNewPasswordForm.value)
				.pipe(finalize(() => this.isLoading.set(false)))
				.subscribe({
					next: (res) => {
						this._AuthService.setUserToken(res.token);
						this._Router.navigate(["/home"]);
					},
					error: (err: HttpErrorResponse) => {
						console.error(err);
					},
				});
		}
	}
	ngOnDestroy(): void {
		this.forgetPasswordSub?.unsubscribe();
		this.verifyResetCodeSub?.unsubscribe();
		this.resetPasswordSuB?.unsubscribe();
	}
}
