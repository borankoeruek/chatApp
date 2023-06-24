import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Identifiable } from 'src/app/firebase-receive-models/Identifiable';
import { Chat } from 'src/app/firebase-send-models/chat';
import { Participant } from 'src/app/firebase-send-models/participant';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent {
  public chats: Identifiable<Chat>[] = [
    {
      id: '1',
      value: {
        participants: [
          { uid: '1', name: '1' },
          { uid: '2', name: '2' },
        ],
      },
    },
    {
      id: '2',
      value: {
        participants: [
          { uid: '1', name: '1' },
          { uid: '3', name: '3' },
        ],
      },
    },
  ];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly firebaseService: FirebaseService
  ) {}

  public openChat(chatId: string): void {
    this.router.navigate(['chat', chatId], { relativeTo: this.route });
  }

  public filterChats(): void {}

  public getParticipantsWithoutCurrentUser(
    participants: Participant[]
  ): Participant[] {
    return participants.filter(
      (participant) =>
        participant.uid !== this.firebaseService.auth.currentUser?.uid
    );
  }
}
