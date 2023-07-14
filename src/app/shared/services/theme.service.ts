import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkTheme = false;

  toggleTheme(themeToSet: string): void {
    console.log('themeToSet', themeToSet);
    switch (themeToSet) {
      case 'dark':
        this.isDarkTheme = true;
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', 'dark');
        break;
      case 'light':
        this.isDarkTheme = false;
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', 'light');
        break;
      default:
        console.log('default do nothing');
        break;
    }
  }
  getCurrentTheme(): string {
    return this.isDarkTheme ? 'dark' : 'light';
  }
}
