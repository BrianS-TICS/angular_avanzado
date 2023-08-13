import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public loginForm: FormGroup;
  public formSubmited: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UsersService
  ) {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

  }

  login() {
    console.log(this.loginForm.value);
    this.userService.loginUser(this.loginForm.value).subscribe(
      {
        next: (response) => {
          const swalDialog = Swal.fire({
            title: 'Registrado con éxito',
            text: '',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          })

          localStorage.setItem('userToken', response.token)

          swalDialog.finally(() => {
            this.router.navigate(['./dashboard']);
          })

          this.formSubmited = false;
          this.loginForm.reset();
        },
        error: (error) => {
          
          Swal.fire({
            title: 'Error',
            text: error.errors.email.msg,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })

        }
      }
    )


    return;
    this.router.navigateByUrl('/');
  }

}
