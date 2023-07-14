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
  theme: string = '';
  constructor(
    private authService: AuthService,
    private themeService: ThemeService
  ) {}

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
    const themeToSet = this.theme == 'dark' ? 'light' : 'dark';
    this.themeService.toggleTheme(themeToSet);
  }
  getCurrentTheme() {
    this.themeService.theme$.subscribe((theme) => {
      this.theme = theme;
    });
  }
}
