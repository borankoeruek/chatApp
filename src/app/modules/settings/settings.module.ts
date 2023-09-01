import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [{ path: '', component: SettingsComponent }];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), TranslateModule],
})
export class SettingsModule {}
