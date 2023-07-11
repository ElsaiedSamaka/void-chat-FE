import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { IndexRoutingModule } from './index-routing.module';
import { ViewsModule } from './views/views.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ViewsModule,
    RouterModule,
    IndexRoutingModule,
  ],
  declarations: [HomeComponent],
})
export class IndexModule {}
