import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/core/guards/AuthGaurd.guard';

const routes: Routes = [
  {
    path: 'index',
    canLoad: [AuthGuard],
    loadChildren: () =>
      import('./pages/index/index.module').then((m) => m.IndexModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
