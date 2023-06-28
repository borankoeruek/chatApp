import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login-signup/login-signup.module').then(
        (m) => m.LoginSignupModule
      ),
  },
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
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./modules/chat-list/chat-list.module').then(
            (m) => m.ChatListModule
          ),
      },
      {
        path: 'settings',
        canActivate: [AuthGuard],
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
