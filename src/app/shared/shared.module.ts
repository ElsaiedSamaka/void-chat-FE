import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './components/modal/modal.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: [ModalComponent, ToastComponent],
  exports: [ModalComponent, ToastComponent],
})
export class SharedModule {}
