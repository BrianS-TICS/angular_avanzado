import { Injectable } from '@angular/core';

declare const google: any;

@Injectable({
  providedIn: 'root'
})

export class GoogleAuthService {

  constructor() { }

  initializeGoogleAuth(callback: (response: any) => void) {
    google.accounts.id.initialize({
      client_id: "987891107175-2fkbld58abphva7545gmc2er8a7s48o9.apps.googleusercontent.com",
      callback: callback
    });
  }

  renderGoogleButton(element: HTMLElement) {
    google.accounts.id.renderButton(
      element,
      { theme: "outline", size: "large" }
    );
  }

  promptGoogleLogin() {
    google.accounts.id.prompt();
  }
}
