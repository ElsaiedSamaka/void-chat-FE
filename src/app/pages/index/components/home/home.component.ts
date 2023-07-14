import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  currentUser: any;
  preferredTheme;
  savedTheme: string = '';
  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {
    this.preferredTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    this.savedTheme = localStorage.getItem('theme');
  }

  ngOnInit() {
    this.getCurrentUser();
    this.toggleTheme();
  }
  getCurrentUser() {
    this.authService.USER$.subscribe((res) => {
      this.currentUser = res;
    });
  }
  toggleTheme() {
    const themeToSet = this.savedTheme || this.preferredTheme;
    this.themeService.toggleTheme(themeToSet);
  }
}
