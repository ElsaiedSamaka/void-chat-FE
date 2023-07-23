import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css'],
})
export class SignoutComponent implements OnInit {
  showLoader: boolean = false;

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadingService.loading$.next(true);
    this.loadingService.loading$.subscribe({
      next: (value) => {
        this.showLoader = value;
      },
    });
    this.authService.signout().subscribe({
      next: () => {
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        console.log('error', err);
      },
      complete: () => {
        this.loadingService.loading$.next(false);
      },
    });
  }
}
