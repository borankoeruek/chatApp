import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { FirebaseService } from '../../../../service/firebase.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  currentUser: any;
  userFormGroup: FormGroup;
  userImage: any;

  constructor(
    private actionSheetController: ActionSheetController,
    private firebaseService: FirebaseService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.firebaseService.getCurrentUserState().subscribe((data: any) => {
      this.currentUser = this.firebaseService.auth.currentUser;
      this.buildForm(this.currentUser);
    });
  }

  buildForm(user: User) {
    console.log(user);

    const formBuilder = new FormBuilder();

    this.userFormGroup = formBuilder.group({
      displayName: user.displayName as string,
      image: user.photoURL as string,
      email: user.email as string,
      phoneNumber: user.phoneNumber as string,
    });

    this.userImage = user.photoURL;
  }

  saveUser() {
    // remove readonly restriction
    const user = JSON.parse(
      JSON.stringify(this.firebaseService.auth.currentUser)
    );

    user.displayName = this.userFormGroup.getRawValue().displayName;
    this.firebaseService.updateUser(user);
  }

  uploadImage() {
    console.log('upload Image');
  }

  async openSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Profilbild verwalten',
      buttons: [
        {
          text: 'Bearbeiten',
          handler: () => {
            this.uploadImage();
          },
        },
        {
          text: 'Ansehen',
          handler: () => {
            console.log('Item 1');
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });
    await actionSheet.present();
  }

  async openToast() {
    const toast = await this.toastCtrl.create({
      message: 'Erfolgreich gespeichert',
      cssClass: 'myToast',
      position: 'bottom',
      icon: 'checkmark-outline',
      duration: 3000,
    });
    await toast.present();
  }
}
