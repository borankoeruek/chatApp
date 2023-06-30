import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Identifiable } from 'src/app/firebase-receive-models/Identifiable';
import { UserPublic } from 'src/app/firebase-send-models/user-public';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss'],
})
export class AddUserDialogComponent {
  @Input()
  isModalOpen = false;

  public users: Identifiable<UserPublic>[] = [];

  @Output()
  public readonly isModalOpenChange = new EventEmitter<boolean>();

  constructor(private readonly firebaseService: FirebaseService) {}

  public searchUsername(event: any): void {
    const username = event.target.value;

    this.firebaseService.searchUsername(username).subscribe((users) => {
      this.users = users;
    });
  }

  public createNewChat(user: Identifiable<UserPublic>): void {
    this.firebaseService
      .createNewChat(user.id, user.value.displayName)
      .subscribe(() => this.setOpen(false));
  }

  public setOpen(isOpen: boolean): void {
    this.isModalOpen = isOpen;
    this.isModalOpenChange.emit(isOpen);
  }
}
