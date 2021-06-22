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
      )]],
      // tslint:disable-next-line:max-line-length
      password: ["", [Validators.required, Validators.minLength(8), 
		Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]]
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

  public login() {
	  console.log("g", this.loginForm.value);
	  
    this.apiService.post('login', this.loginForm.value).
	subscribe((response: LoginSuccess) => {
		this.storageService.setCurrentObject(response.token);
		this.apiService.getById('user', response.id)
		.subscribe((response: User) => {
			this.user = response;
		});
		this.showAlert.showSuccessAlert(`Inicio de sesion exitoso`);
		this.clearloginForm();
		this.router.navigate(['getit/home']);
	}, (error: HttpErrorResponse) => {
      this.showAlert.showErrorAlert("datos incorrectos, vuelva a intentarlo");
    });
  }  

  private clearloginForm() {
	this.loginForm.controls.email.setValue("");
	this.loginForm.controls.password.setValue("");
}

}




private createLoginForm(): void {
	  this.loginForm = new FormGroup({
		ci: new FormControl("", [
		  Validators.minLength(6),
		  Validators.maxLength(10),
		  Validators.pattern("^[0-9]*$"),
		  Validators.required,
		]),
		password: new FormControl("", [
		  Validators.minLength(5),
		  Validators.required,
		]),
	  });
	}
	/**
	 This function verify the user credentials
	  @method login()
	*/
	private login(): void {
	  this.apiService.post("/user/login", this.loginForm.value).subscribe(
		(response: User) => {
		  this.user = response;
		  this.userService.setCurrentUser(this.user);
		  this.showMessage.showSuccessAlert("Se inicio sesion exitosamente..!");
		  this.openHome();
		},
		(error: HttpErrorResponse) => {
		  this.showMessage.showError("Usuario no registrado");
		}
	  );
	}
	/**
	 this function allows to enter the user's home according to their role
	  @method openHome()
	*/
	private openHome(): void {
	  if (
		this.user.role.name === "Comision de Meritos Docente" ||
		this.user.role.name === "Comision de Meritos Estudiante"
	  ) {
		this.router.navigate(["merito"]);
	  } else {
		if (
		  this.user.role.name === "Comision de Conocimientos Docente" ||
		  this.user.role.name === "Comision de Conocimientos Estudiante"
		) {
		  this.router.navigate(["conocimiento"]);
		} else {
		  if (this.user.role.name === "Jefe de Departamento") {
			this.router.navigate(["admin"]);
		  } else {
			if (this.user.role.name === "Secretario") {
			  this.router.navigate(["secretario"]);
			} else {
			  this.router.navigate(["/"]);
			}
		  }
		}
	  }
	}
  }
  