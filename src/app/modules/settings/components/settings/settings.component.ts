import {Component, OnInit} from '@angular/core';
import {ActionSheetController, ToastController} from "@ionic/angular";
import {FirebaseService} from "../../../../service/firebase.service";
import {FormControl, FormGroup} from "@angular/forms";
import {User, user} from "@angular/fire/auth";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  currentUser: any
  userFormGroup: FormGroup
  userImage: any

  constructor(
    private actionSheetController: ActionSheetController,
    private firebaseService: FirebaseService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.firebaseService.getCurrentUserState().subscribe((data: any) => {
      this.currentUser = this.firebaseService.auth.currentUser
      this.buildForm(this.currentUser)
    })
  }

  buildForm(user: User) {
    console.log(user)
    this.userFormGroup = new FormGroup({
      displayName: new FormControl(user.displayName ? user.displayName : null),
      image: new FormControl(user.photoURL ? user.photoURL : null),
      email: new FormControl(user.email ? user.email : null),
      phoneNumber: new FormControl(user.phoneNumber ? user.phoneNumber : null),
    })

    this.userImage = user.photoURL
  }

  saveUser() {
    console.log(this.userFormGroup.getRawValue())
    this.firebaseService.updateUser(this.userFormGroup.getRawValue())
  }

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

  async openToast() {
    const toast = await this.toastCtrl.create({
      message: 'Erfolgreich gespeichert',
      cssClass: 'myToast',
      position: 'bottom',
      icon: 'checkmark-outline',
      duration: 3000
    });
    await toast.present();
  }

}
