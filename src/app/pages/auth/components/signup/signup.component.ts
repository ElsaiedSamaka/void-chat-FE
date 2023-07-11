import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/core/services/auth.service';
import { MatchPassword } from 'src/core/validators/match-password';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  showToast: boolean = false;
  toastMessage: string = '';
  authForm = new FormGroup(
    {
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
      passwordConfirmation: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(25),
      ]),
    },
    { validators: [this.matchPassword.validate] }
  );
  constructor(
    private matchPassword: MatchPassword,
    private authService: AuthService,
    private router: Router
  ) {}
  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    this.authService
      .signup(
        this.authForm.value.email,
        this.authForm.value.password,
        this.authForm.value.passwordConfirmation
      )
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/index');
        },
        error: (err) => {
          if (!err.status) {
            this.authForm.setErrors({ noConnection: true });
            this.toastMessage = ' عفوا, يرجى التحقق من اتصال الانترنت';
          } else if (err.error.message == 'Failed! Email is already in use!') {
            this.authForm.setErrors({ alreadyUsedMailError: true });
            this.toastMessage = 'البريد الالكتروني مستخدم بالفعل';
          } else {
            this.authForm.setErrors({ unknownError: true });
            this.toastMessage = ' خطأ غير متوقع';
          }
          this.toggleToast();
        },
      });
  }

  ngOnInit() {}
  toggleToast() {
    this.showToast = !this.showToast;
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }
}
