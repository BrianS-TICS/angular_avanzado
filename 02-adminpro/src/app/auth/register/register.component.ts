import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      name: ['Brian', Validators.required],
      email: ['Brian@.com', Validators.required],
      password: ['12345', Validators.required],
      password2: ['12345', Validators.required],
      terms: [true, Validators.required],
    });
  }


  public createUser() {
    console.log(this.registerForm.value);
  }

}
