import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';

const routes: Routes = [
  {
    path: '',
    component: ToolBarComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'chats',
      },
      {
        path: 'chats',
        loadChildren: () =>
          import('./modules/chat-list/chat-list.module').then(
            (m) => m.ChatListModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./modules/settings/settings.module').then(
            (m) => m.SettingsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
