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
  preferredTheme: string = '';
  savedTheme: string = '';
  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {
    this.preferredTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
  }

  ngOnInit() {
    this.getCurrentUser();
    this.getCurrentTheme();
  }
  getCurrentUser() {
    this.authService.USER$.subscribe((res) => {
      this.currentUser = res;
    });
  }
  toggleTheme() {
    this.getCurrentTheme();
    const themeToSet = this.savedTheme == 'dark' ? 'light' : 'dark';
    console.log('themeToSet', themeToSet);
    this.themeService.toggleTheme(themeToSet);
  }
  getCurrentTheme() {
    this.savedTheme = localStorage.getItem('theme') || this.preferredTheme;
    console.log('savedTheme', this.savedTheme);
  }
}
