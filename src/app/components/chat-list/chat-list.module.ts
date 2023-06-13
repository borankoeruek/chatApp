import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChatListComponent } from './chat-list.component';
import { ChatComponent } from '../chat/chat.component';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  { path: '', component: ChatListComponent },
  { path: 'chat', component: ChatComponent },
];

@NgModule({
  declarations: [ChatComponent],
  imports: [CommonModule, RouterModule.forChild(routes), IonicModule],
})
export class ChatListModule {}
