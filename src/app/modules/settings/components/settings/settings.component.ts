import { Component } from '@angular/core';
import {ActionSheetController} from "@ionic/angular";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(
    private actionSheetController: ActionSheetController
  ) {}

  uploadImage() {
    console.log('upload Image')
  }

  async openSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Profilbild verwalten',
      buttons: [{
        text: 'Bearbeiten',
        handler: () => {
          this.uploadImage();
        }
      }, {
        text: 'Ansehen',
        handler: () => {
          console.log('Item 1');
        }
      },     {
        text: 'Cancel',
        role: 'cancel',
        data: {
          action: 'cancel',
        },
      },]
    })
    await actionSheet.present()
  }

}
