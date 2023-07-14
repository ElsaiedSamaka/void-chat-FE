import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  toggleTheme(themeToSet: string): void {
    switch (themeToSet) {
      case 'dark':
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', 'dark');
        break;
      case 'light':
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', 'light');
        break;
      default:
        console.log('default do nothing');
        break;
    }
  }
}
