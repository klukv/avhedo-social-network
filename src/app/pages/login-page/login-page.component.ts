import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';
import { REGISTRATION_PAGE, USER_KEY } from 'src/app/utils/const';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  signupLink = REGISTRATION_PAGE;
  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService,
    public authService: LoginService
  ) {
    this._createFormLogin();

    setTimeout(() => {
      this.authService.setValueIsRegister(false);
    }, 2000);
  }

  private _createFormLogin() {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  clickLoginButton() {
    if (this.formLogin.invalid) {
      return;
    }

    this.authService
      .login(this.username?.value, this.password?.value)
      .pipe(
        map((userData) => {
          this.storageService.saveInfoUser(
            {
              username: this.username?.value,
              password: this.password?.value,
            },
            userData.token
          );
          return userData;
        })
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  get username() {
    return this.formLogin.get('username');
  }

  get password() {
    return this.formLogin.get('password');
  }
}
