import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';
import { GroupListComponent } from './group-list/group-list.component';
import { PrivateListComponent } from './private-list/private-list.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [GroupListComponent, PrivateListComponent, ChatComponent],
  exports: [GroupListComponent, PrivateListComponent, ChatComponent],
})
export class ViewsModule {}
