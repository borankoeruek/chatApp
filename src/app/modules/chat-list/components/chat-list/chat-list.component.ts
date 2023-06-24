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
  public filteredChats: Identifiable<Chat>[];

  private chats: Identifiable<Chat>[] = [
    {
      id: '1',
      value: {
        participants: [
          { uid: '1', name: 'ewa' },
          { uid: '2', name: '2' },
        ],
      },
    },
    {
      id: '2',
      value: {
        participants: [
          { uid: '1', name: 'wasgehtab' },
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

  public ngOnInit(): void {
    this.filteredChats = this.chats;
  }

  public openChat(chatId: string): void {
    this.router.navigate(['chat', chatId], { relativeTo: this.route });
  }

  public filterChatsByUsername(event: any): void {
    const username = event?.target?.value;
    this.filteredChats = this.chats.filter((chat) =>
      chat.value.participants.some((participant) =>
        participant.name.includes(username)
      )
    );
  }

  public getParticipantsWithoutCurrentUser(
    participants: Participant[]
  ): Participant[] {
    return participants.filter(
      (participant) =>
        participant.uid !== this.firebaseService.auth.currentUser?.uid
    );
  }
}
