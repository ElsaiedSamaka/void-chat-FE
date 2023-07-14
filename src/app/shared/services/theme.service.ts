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
    console.log(
      "document.body.classList.toggle('dark');",
      document.body.classList.contains('dark')
    );
  }
  getCurrentTheme(): string {
    return this.isDarkTheme ? 'dark' : 'light';
  }
}
