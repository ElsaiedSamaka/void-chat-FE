import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkTheme = false;

  toggleTheme(themeToSet): void {
    console.log('themeToSet', themeToSet);
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('dark');
  }

  getCurrentTheme(): string {
    return this.isDarkTheme ? 'dark' : 'light';
  }
}
