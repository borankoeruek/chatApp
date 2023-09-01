import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ChatListRoutingModule } from './chat-list.routing.module';
import { AddUserDialogComponent } from './components/add-user-dialog/add-user-dialog.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  imports: [CommonModule, IonicModule, ChatListRoutingModule, TranslateModule],
  declarations: [ChatComponent, ChatListComponent, AddUserDialogComponent],
})
export class ChatListModule {}
