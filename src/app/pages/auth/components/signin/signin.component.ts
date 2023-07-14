import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router
  ) {
    this.getCurrentTheme();
  }

  ngOnInit() {}
  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    this.authService
      .signin(this.authForm.value.email!, this.authForm.value.password!)
      .subscribe({
        next: (response) => {},
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
          this.toggleToast();
        },
        complete: () => {
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
  getCurrentTheme() {
    this.themeService.theme$.subscribe((theme) => {
      this.theme = theme;
    });
  }
}
