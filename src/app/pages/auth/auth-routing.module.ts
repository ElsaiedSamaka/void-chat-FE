import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignoutComponent } from './components/signout/signout.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  { path: 'signout', pathMatch: 'full', component: SignoutComponent },
  { path: 'signup', pathMatch: 'full', component: SignupComponent },
  { path: '', pathMatch: 'full', component: SigninComponent },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () =>
      import('../notfound/notfound.module').then((m) => m.NotfoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
