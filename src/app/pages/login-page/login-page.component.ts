import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { REGISTRATION_PAGE } from 'src/app/utils/const';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  signupLink = REGISTRATION_PAGE
  formLogin: FormGroup

  constructor(private fb: FormBuilder){
    this._createFormLogin();
  }

  private _createFormLogin(){
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  clickLoginButton(){
    console.log(this.formLogin);
  }

  get username(){
    return this.formLogin.get('username');
  }

  get password(){
    return this.formLogin.get('password');
  }
}
