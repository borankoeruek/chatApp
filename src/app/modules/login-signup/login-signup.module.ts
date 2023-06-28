import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { LoginSignupRoutingModule } from './login-signup.routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, LoginSignupRoutingModule],
  declarations: [LoginSignupComponent],
})
export class LoginSignupModule {}
