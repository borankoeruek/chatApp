import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
import { SettingsComponent } from './settings/settings.component';
import { ChatListComponent } from './chat-list/chat-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolBarComponent,
    SettingsComponent,
    ChatListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
