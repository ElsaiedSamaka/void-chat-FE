import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  savedTheme: string = '';
  preferredTheme: string = '';
  theme$ = new BehaviorSubject<string>(this.savedTheme);
  constructor() {
    this.preferredTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    this.getCurrentTheme();
  }
  getCurrentTheme() {
    this.savedTheme = localStorage.getItem('theme') || this.preferredTheme;
  }
  toggleTheme(themeToSet: string): void {
    switch (themeToSet) {
      case 'dark':
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', 'dark');
        this.theme$.next('dark');
        break;
      case 'light':
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', 'light');
        this.theme$.next('light');
        break;
      default:
        console.log('default do nothing');
        break;
    }
  }
}
