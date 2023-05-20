import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notpagefound',
  templateUrl: './notpagefound.component.html',
  styleUrls: ['./nopagefound.component.css']
})
export class NotpagefoundComponent implements OnInit {

  constructor() { }

  public year = new Date().getFullYear();

  ngOnInit(): void {
  }

}
