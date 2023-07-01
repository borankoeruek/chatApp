import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ChatListRoutingModule } from './chat-list.routing.module';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatComponent } from './components/chat/chat.component';
import { AddUserDialogComponent } from './components/add-user-dialog/add-user-dialog.component';

@NgModule({
  imports: [CommonModule, IonicModule, ChatListRoutingModule],
  declarations: [ChatComponent, ChatListComponent, AddUserDialogComponent],
})
export class ChatListModule {}
