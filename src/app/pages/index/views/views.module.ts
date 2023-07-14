import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatComponent } from './chat/chat.component';
import { GroupListComponent } from './group-list/group-list.component';
import { PrivateListComponent } from './private-list/private-list.component';

@NgModule({
  imports: [CommonModule, SharedModule, ReactiveFormsModule, FormsModule],
  declarations: [GroupListComponent, PrivateListComponent, ChatComponent],
  exports: [GroupListComponent, PrivateListComponent, ChatComponent],
})
export class ViewsModule {}
