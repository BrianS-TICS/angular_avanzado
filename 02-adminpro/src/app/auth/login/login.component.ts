import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UsersService } from 'src/app/services/users.service';
import { GoogleAuthService } from 'src/app/services/google-auth.service';


declare const google: any;
declare const gapi: any;


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit, AfterViewInit {
  public auth2: any;

  public loginForm: FormGroup;
  public formSubmited: boolean = false;

  @ViewChild('googleBtn') googleBtn: ElementRef;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private googleAuth: GoogleAuthService,
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
    this.renderButton();
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }


  googleInit = () => {
    this.googleAuth.initializeGoogleAuth(this.handleCredentialResponse.bind(this));
    this.googleAuth.renderGoogleButton(this.googleBtn.nativeElement);
    this.googleAuth.promptGoogleLogin();
  }

  public handleCredentialResponse(response: any) {
    this.userService.loginGoogle(response.credential).subscribe(
      {
        next: (response) => {
          console.log(response);
          this.ngZone.run(() => {
            this.router.navigate(['./dashboard']);
          });
        },
        error: (error) => {
          console.log(error);
        },
      })

  }

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();

  }


  async startApp() {

    await this.userService.googleInit();
    this.auth2 = this.userService.auth2;

    this.attachSignin(document.getElementById('my-signin2'));

  };


  attachSignin(element: any) {

    this.auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        // console.log(id_token);
        this.userService.loginGoogle(id_token)
          .subscribe(resp => {
            // Navegar al Dashboard
            this.ngZone.run(() => {
              this.router.navigateByUrl('/');
            })
          });

      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
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

          this.router.navigateByUrl('/dashboard');

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
