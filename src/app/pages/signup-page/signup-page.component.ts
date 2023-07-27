import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, catchError, throwError } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent implements OnDestroy {
  @ViewChild('refCheckboxMan') refChecboxMan: ElementRef;
  @ViewChild('refCheckboxWoman') refChecboxWoman: ElementRef;

  form: FormGroup;
  responseRegister: string = '';
  private agePerson: number = 0;
  private sub: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: LoginService,
    public errorService: ErrorService
  ) {
    this._createForm();
  }

  private _createForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', [Validators.required]],
      genderMan: [false, [Validators.required]],
      genderWoman: [false, [Validators.required]],
    });
  }

  setRegisterAgeValue(selectedDate: Date) {
    const today = new Date();
    const birthday = new Date(selectedDate);
    const diffMonth = today.getMonth() - birthday.getMonth();
    this.agePerson = today.getFullYear() - birthday.getFullYear();

    if (
      diffMonth < 0 ||
      (diffMonth === 0 && today.getDate() < birthday.getDate())
    ) {
      this.agePerson--;
    }
  }

  saveInfoUser() {
    if (this.form.invalid) {
      console.log(`ошибка`);
      return;
    }
    console.log(`Всё хорошо`);
    let genderPerson: string = '';

    if (this.genderMan?.value === true) {
      genderPerson = 'man';
    }
    if (this.genderWoman?.value === true) {
      genderPerson = 'woman';
    }

    this.sub = this.authService
      .register(
        this.username?.value,
        this.email?.value,
        this.password?.value,
        ['admin, moderator'],
        this.agePerson,
        genderPerson
      )
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(() => {
        this.authService.setValueIsRegister(true);
        this.router.navigate(['signin']);
      });
  }

  changeValueCheckbox(type: string) {
    if (type === 'man') {
      this.refChecboxWoman.nativeElement['checked'] = false;
    }
    if (type === 'woman') {
      this.refChecboxMan.nativeElement['checked'] = false;
    }
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

  get birthday() {
    return this.form.get('birthday');
  }

  get genderMan() {
    return this.form.get('genderMan');
  }

  get genderWoman() {
    return this.form.get('genderWoman');
  }

  closeErrorBlock(){
    this.errorService.clear();
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
