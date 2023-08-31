import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../../../services/authentication.service';
import { Route, Router } from '@angular/router';
import {
  fadeInAnimation,
  fadeOutAnimation,
  fadeRightAnimation,
} from '../../../../animations/animations';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [fadeInAnimation, fadeOutAnimation, fadeRightAnimation],
})
export class RegisterComponent {
  constructor(
    private _authSerive: AuthenticationService,
    private _router: Router,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = formBuilder.group(
      {
        name: [
          null,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(20),
          ],
        ],
        email: [null, [Validators.required, Validators.email]],
        password: [
          null,
          [
            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])[\x00-\x7F]{8,}$/),
            Validators.required,
          ],
        ],
        rePassword: [
          null,
          [
            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])[\x00-\x7F]{8,}$/),
            Validators.required,
          ],
        ],
        phone: [
          null,
          [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
        ],
      },
      {
        validators: [this.passwordMatchValidator('password', 'rePassword')],
      }
    );
  }

  isLoading: boolean = false;
  errorMsg: string = '';
  registerForm: FormGroup = new FormGroup({});

  handleRegister(registerForm: FormGroup) {
    if (registerForm.valid) {
      this.isLoading = true;
      this._authSerive.registerUser(registerForm.value).subscribe({
        next: (response) => {
          if (response.message === 'success')
            this._router.navigate(['./authentication/login']);
          this.isLoading = false;
        },

        error: (err) => {
          console.log(err);
          this.isLoading = false;
          this.errorMsg = err.error.message;
        },

        complete: () => {
          //why complete not working
          this.isLoading = false;
        },
      });
    }
  }

  passwordMatchValidator(password: string, rePassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const rePassControl = formGroup.controls[rePassword];

      if (passwordControl.value === rePassControl.value) return;

      rePassControl.setErrors({
        passwordMatch: 'Confirm password must match with password',
      });
    };
  }
}
