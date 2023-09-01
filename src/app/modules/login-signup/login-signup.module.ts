import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { LoginSignupRoutingModule } from './login-signup.routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LoginSignupRoutingModule,
    TranslateModule,
  ],
  declarations: [LoginSignupComponent],
})
export class LoginSignupModule {}
