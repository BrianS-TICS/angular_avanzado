import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  public menu: any[] = [
    {
      title: "Dashboard",
      icon: "mdi mdi-gauge",
      submenu: [
        { title: "Main", url: '/' },
        { title: "Progress Bar", url: 'progress' },
        { title: "Graphics", url: 'graphic-one' },
      ]
    },
    {
      title: "Dashboard",
      icon: "mdi mdi-gauge",
      submenu: [
        { title: "Main", url: '/' },
        { title: "Progress Bar", url: 'progress' },
        { title: "Graphics", url: 'graphic-one' },
      ]
    },
  ]

  constructor() { }
}
