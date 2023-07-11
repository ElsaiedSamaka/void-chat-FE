import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './components/signin/signin.component';
import { SignoutComponent } from './components/signout/signout.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule, AuthRoutingModule],
  declarations: [SigninComponent, SignupComponent, SignoutComponent],
})
export class AuthModule {}
