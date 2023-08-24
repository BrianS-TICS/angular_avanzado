import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UsersService,
    ) { }

  ngOnInit(): void {
  }

  public logout() {
    console.log('log');
    this.userService.logout();
  }

}
