import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { AuthService } from 'src/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  showToast: boolean = false;
  toastMessage: string = '';
  showPassword: boolean = false;
  showLoader: boolean = false;
  theme: string = '';

  authForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(80),
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(25),
    ]),
  });
  constructor(
    private themeService: ThemeService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private router: Router
  ) {
    this.getCurrentTheme();
  }

  ngOnInit() {
    this.loadingService.loading$.subscribe({
      next: (value) => {
        this.showLoader = value;
      },
    });
    // Check if the user is already authenticated
    this.authService.signedin$.subscribe((authenticated) => {
      if (authenticated) {
        // User is already authenticated, navigate to the index page
        this.router.navigateByUrl('/index');
      }
    });
  }
  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    this.loadingService.loading$.next(true);
    this.authService
      .signin(this.authForm.value.email!, this.authForm.value.password!)
      .subscribe({
        next: (response) => {
          console.log('response', response);
        },
        error: (err) => {
          if (!err.status) {
            this.authForm.setErrors({ noConnection: true });
            this.toastMessage = ' عفوا, يرجى التحقق من اتصال الانترنت';
          } else if (err.error.message == 'Invalid Password!') {
            this.authForm.setErrors({ credentials: true });
            this.toastMessage = ' البريد الالكتروني او كلمة المرور غير صحيحة';
          } else if (err.error.message == 'User not active') {
            this.authForm.setErrors({ notActive: true });
            this.toastMessage = 'لا يمكن تسجيل الدخول , المستخدم غير مفعل';
          } else {
            this.authForm.setErrors({ unknownError: true });
            this.toastMessage = ' خطأ غير متوقع';
          }
          this.loadingService.loading$.next(false);
          this.toggleToast();
        },
        complete: () => {
          this.loadingService.loading$.next(false);
          // this.showLoader = false;
          this.router.navigateByUrl('/index');
        },
      });
  }
  toggleToast() {
    this.showToast = !this.showToast;
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  getCurrentTheme() {
    this.themeService.theme$.subscribe((theme) => {
      this.theme = theme;
    });
  }
}
