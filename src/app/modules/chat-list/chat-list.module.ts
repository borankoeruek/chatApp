import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatComponent } from './components/chat/chat.component';
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
