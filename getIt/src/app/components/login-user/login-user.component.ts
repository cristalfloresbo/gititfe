import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { Login, LoginSuccess } from "src/app/models/login.model";
import { User } from "src/app/models/user.model";
import { Router } from '@angular/router';
import { ApiService } from "src/app/services/api.service";
import { ShowAlertMessage } from 'src/app/helpers/showAlertMessage';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from 'src/app/services/storage.service';

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
  usuario: Login[];
  public showAlert: ShowAlertMessage;
  public user: User;
  
  constructor(
    public formBuilder: FormBuilder,
    private apiService: ApiService,
	private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  private createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required,Validators.pattern(
        /[\w]{1,}[\w.+-]{0,}@[\w-]{1,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/
      )
]],
      // tslint:disable-next-line:max-line-length
      password: ["", [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]]

    });

  }
  public isInvalid(formControlName: string) {
    const control = this.loginForm.controls[formControlName];
    return !control.valid && (control.dirty || control.touched);
  }

  public hasErrorControl(formControlName, errorType) {
    return this.loginForm.controls[formControlName].errors[errorType];
  }

  public cancel(): void {
    this.showAlert.showCancelAlert(
      "¿Esta seguro que no desea registrar la publicación?",
      ""
    );
  }

  getFormularioRegistro(event: Event) {
    event.preventDefault();
    console.log(this.loginForm.value);
  }

  public login() {
    this.apiService.post('login-user', this.loginForm.value).
	subscribe((response: LoginSuccess) => {
		this.storageService.setCurrentObject(response.token);
		this.apiService.getById('user', response.id)
		.subscribe((response: User) => {
			this.user = response;
		});
		this.showAlert.showSuccessAlert(`Inicio de sesion exitoso`);
		this.router.navigate(['/getit/home']);
	}, (error: HttpErrorResponse) => {
      this.showAlert.showErrorAlert("datos incorrectos, vuelva a intentarlo");
    });
  }  
}
