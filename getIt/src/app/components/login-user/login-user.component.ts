import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { LoginSuccess } from "src/app/models/login.model";
import { Router } from '@angular/router';
import { ApiService } from "src/app/services/api.service";
import { ShowAlertMessage } from 'src/app/helpers/showAlertMessage';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss'],
})

export class LoginUserComponent implements OnInit {
	loginForm = new FormGroup({
		email: new FormControl(''),
		password: new FormControl(''),
	});
	private showAlert = new ShowAlertMessage();
	constructor(
		public formBuilder: FormBuilder,
		private apiService: ApiService,
		private userService: UserService,
		private router: Router
	) { }
	
	ngOnInit() {
		this.createLoginForm();
	}
	
	private createLoginForm() {
		this.loginForm = this.formBuilder.group({
			email: ["", [Validators.required,Validators.pattern(
				/[\w]{1,}[\w.+-]{0,}@[\w-]{1,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/)
			]],
			// tslint:disable-next-line:max-line-length
			password: ["", [Validators.required, Validators.minLength(8), Validators.pattern(
				/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)
			]]
		});
	}
	
	public isInvalid(formControlName: string) {
		const control = this.loginForm.controls[formControlName];
		return !control.valid && (control.dirty || control.touched);
	}
	
	public hasErrorControl(formControlName, errorType) {
		return this.loginForm.controls[formControlName].errors[errorType];
	}
	
	public async login() {
		await this.apiService.postWithoutHeaders('login', this.loginForm.value)
		.subscribe((response: LoginSuccess) => {
			this.userService.setCurrentUser(response.token, "token");
			this.userService.setCurrentUser(response.id, "user");
			this.showAlert.showSuccessAlert("Bienvenido..!");
			this.router.navigate(['/getit/home']);
		}, 
		(error: HttpErrorResponse) => {
			this.showAlert.showErrorAlert("Datos incorrectos, vuelva a intentarlo");
		});
	}

	public registerUser() {
		this.router.navigate(['/register']);
	}
}
