import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, catchError, throwError } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';
import { LoginService } from 'src/app/services/login.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent implements OnDestroy {
  form: FormGroup;
  private sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: LoginService,
    private storageService: StorageService,
    public errorService: ErrorService
  ) {
    this._createForm();
  }

  private _createForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  saveInfoUser() {
    if (this.form.invalid) {
      console.log(`ошибка`);
      return;
    }
    console.log(`Всё хорошо`);

    this.sub = this.authService
      .register(this.username?.value, this.email?.value, this.password?.value, [
        'admin, moderator',
      ])
      .pipe(catchError((error) => this.errorService.handle(error)))
      .subscribe((idUserObject) => {
        this.storageService.saveIdUser(idUserObject.message);
        this.router.navigate(['signup/additionally/info']);
      });
  }

  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }

  get email() {
    return this.form.get('email');
  }

  ngOnDestroy() {
    if (this.sub !== undefined) {
      this.sub.unsubscribe();
    }
  }
}
