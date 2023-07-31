import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolBarComponent } from './components/tool-bar/tool-bar.component';
import { SettingsComponent } from './modules/settings/components/settings/settings.component';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import fireBaseConfig from './service/firebaseConfig.json';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [AppComponent, ToolBarComponent, SettingsComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        IonicModule.forRoot({mode: 'ios'}),
        provideFirebaseApp(() => initializeApp(fireBaseConfig)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        ReactiveFormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
