import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsersService } from 'src/app/services/users.service';


declare const google: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit, AfterViewInit {

  public loginForm: FormGroup;
  public formSubmited: boolean = false;

  @ViewChild('googleBtn') googleBtn: ElementRef;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private ngZone: NgZone
  ) {
    this.googleBtn = new ElementRef(null);

    this.loginForm = this.formBuilder.group({
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      remember: [localStorage.getItem('email') ? true : false]
    });

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit = () => {
    google.accounts.id.initialize({
      client_id: "987891107175-2fkbld58abphva7545gmc2er8a7s48o9.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }
    );
    google.accounts.id.prompt();

  }

  public handleCredentialResponse(response: any) {
    this.userService.loginGoogle(response.credential).subscribe({
      next: (response) => {
        this.ngZone.run(() => {
          this.router.navigate(['./dashboard']);
        });
      },
      error: (error) => {
        console.log(error);
      },
    })

  }


  invalidField(fieldName: string): boolean {
    let invalid = false;
    if (this.loginForm.get(fieldName)?.invalid && this.formSubmited) {
      invalid = true;
      return invalid;
    }
    return invalid;
  }

  login() {

    if (this.loginForm.invalid) {
      this.formSubmited = true;
      return
    }

    this.userService.loginUser(this.loginForm.value).subscribe(
      {
        next: (response) => {

          if (this.loginForm.get('remember')?.value) {
            localStorage.setItem('email', this.loginForm.get('email')?.value)
          } else {
            localStorage.removeItem('email')
          }

          const swalDialog = Swal.fire({
            title: 'Bienvenido',
            text: '',
            icon: 'success',
            confirmButtonText: 'Continuar'
          })

          swalDialog.finally(() => {
            this.router.navigate(['./dashboard']);
          })

          this.formSubmited = false;
          this.loginForm.reset();
        },
        error: (error) => {

          Swal.fire({
            title: 'Error',
            text: error.error.msg,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })

        }
      }
    )

  }

}
