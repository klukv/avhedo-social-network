import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {

  form: FormGroup

  constructor(private fb: FormBuilder){
    this._createForm();
  }

  private _createForm(){
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      age: ['', Validators.required],
      gender: [{man: 'мужской', woman: 'женский'}, Validators.required],
    })
  }

  setRegisterAgeValue(selectedDate: Date){

  }

}
