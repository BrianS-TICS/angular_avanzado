import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router'
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public registerForm: FormGroup;
  public formSubmited: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UsersService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password2: ['', Validators.required],
      terms: [false, Validators.required],
    }, {
      validators: this.equalPassword('password', 'password2')
    });
  }


  public createUser() {
    this.formSubmited = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.userService.createUser(this.registerForm.value).subscribe(
      {
        next: (response) => {

          this.router.navigateByUrl('/dashboard');

          this.formSubmited = false;
          this.registerForm.reset();

        },
        error: (error) => {

          Swal.fire({
            title: 'Error',
            text: error.error.msg,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })


        }, complete: () => {

        }
      }
    );

  }

  public invalidField(field: string): boolean {
    if (this.registerForm.get(field)?.invalid && this.formSubmited) {
      return true;
    }
    return false;
  }

  public disagreeTerms(): boolean {
    if (!this.registerForm.get('terms')?.value && this.formSubmited) {
      return true;
    }
    return false;
  }

  public diferentPasswords(): boolean {
    let diferentPasswords = false;

    if (this.registerForm.get('password')?.value !== this.registerForm.get('password2')?.value && this.formSubmited) {
      diferentPasswords = true;
    }
    return diferentPasswords;
  }

  public equalPassword(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ isNotEqual: true });

      }

    }
  }

}
