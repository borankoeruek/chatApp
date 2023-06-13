import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ToolBarComponent} from "./tool-bar/tool-bar.component";

const routes: Routes = [
  { path: '', component: ToolBarComponent, children: [
      {
        path: '', pathMatch: 'full', redirectTo: 'chats',
      },
      {
        path: 'chats',
        loadChildren: () => import('./chat-list/chat-list.module').then((m) => m.ChatListModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
