import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputComponent } from './components/input/input.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ModalComponent } from './components/modal/modal.component';
import { ToastComponent } from './components/toast/toast.component';
@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  declarations: [
    ModalComponent,
    ToastComponent,
    InputComponent,
    LoadingSpinnerComponent,
  ],
  exports: [
    ModalComponent,
    ToastComponent,
    InputComponent,
    LoadingSpinnerComponent,
  ],
})
export class SharedModule {}
