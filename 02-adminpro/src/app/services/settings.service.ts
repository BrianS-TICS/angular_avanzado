import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');
  private defaultUrlTheme: string = './assets/css/colors/red-dark.css'

  constructor() {
    const selectedTheme = localStorage.getItem('theme') || this.defaultUrlTheme;
    this.linkTheme?.setAttribute('href', selectedTheme);
  }
  
  public changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url)
  }

  public checkCurrentTheme(): void {
    const links: NodeListOf<Element> = document.querySelectorAll('.selector');
    if (links) {
      links.forEach(link => {
        link.classList.remove('working')
        const btnTheme = link.getAttribute('data-theme')
        const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`
        const currentThemeSelected = this.linkTheme?.getAttribute('href');

        if (btnThemeUrl === currentThemeSelected) {
          link.classList.add('working');
        }
      })
    }
  }

}
