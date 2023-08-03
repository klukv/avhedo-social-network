import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';
import { REGISTRATION_PAGE, USER_KEY } from 'src/app/utils/const';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  @ViewChild('refInputElement') inputElement: ElementRef;

  signupLink = REGISTRATION_PAGE;
  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private storageService: StorageService,
    private errorService: ErrorService,
    public authService: LoginService
  ) {
    this._createFormLogin();
  }

  ngOnInit() {
    setTimeout(() => {
      this.authService.setValueIsRegister(false);
    }, 2000);
  }

  ngAfterViewInit() {
    this.inputElement.nativeElement.focus();
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
              id: userData.id,
              username: this.username?.value,
            },
            userData.token
          );
          return userData;
        })
      )
      .pipe(catchError(this.errorService.handle.bind(this)))
      .subscribe(() => {
        this.router.navigate(['/']);
        setTimeout(() => {
          window.location.reload();
        }, 150);
      });
  }

  get username() {
    return this.formLogin.get('username');
  }

  get password() {
    return this.formLogin.get('password');
  }
}

