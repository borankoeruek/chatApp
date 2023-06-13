import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SettingsComponent} from "./settings.component";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  { path: '', component: SettingsComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class SettingsModule { }
