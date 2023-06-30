import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Identifiable } from 'src/app/firebase-receive-models/Identifiable';
import { Chat } from 'src/app/firebase-send-models/chat';
import { Participant } from 'src/app/firebase-send-models/participant';
import { FirebaseService } from 'src/app/service/firebase.service';
import { getParticipantsWithoutCurrentUser } from 'src/app/util/helpers';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent {
  public displayAddUserDialog: boolean = false;

  public filteredChats: Identifiable<Chat>[] = [
    {
      id: '1',
      value: {
        participants: [
          { uid: '1', displayName: 'ewa' },
          { uid: '2', displayName: '2' },
        ],
      },
    },
    {
      id: '2',
      value: {
        participants: [
          { uid: '1', displayName: 'wasgehtab' },
          { uid: '3', displayName: '3' },
        ],
      },
    },
  ];

  private chats: Identifiable<Chat>[] = [
    {
      id: '1',
      value: {
        participants: [
          { uid: '1', displayName: 'ewa' },
          { uid: '2', displayName: '2' },
        ],
      },
    },
    {
      id: '2',
      value: {
        participants: [
          { uid: '1', displayName: 'wasgehtab' },
          { uid: '3', displayName: '3' },
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
    this.loadChats();
  }

  public openChat(chat: Identifiable<Chat>): void {
    this.router.navigate(['chat', chat.id], {
      relativeTo: this.route,
      state: chat,
    });
  }

  private loadChats(): void {
    this.firebaseService.getChats().subscribe((chats) => {
      // this.chats = chats;
      // this.filteredChats = chats;
    });
  }

  public filterChatsByUsername(event: any): void {
    const username = event?.target?.value;

    this.filteredChats = this.chats.filter((chat) =>
      chat.value.participants.some((participant) =>
        participant.displayName.includes(username)
      )
    );
  }

  public getParticipant(participants: Participant[]): Participant {
    return getParticipantsWithoutCurrentUser(
      participants,
      this.firebaseService
    );
  }
}
