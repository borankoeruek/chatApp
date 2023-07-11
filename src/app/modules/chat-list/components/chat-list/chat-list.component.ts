import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  public filteredChats: Identifiable<Chat>[] = [];

  private chats: Identifiable<Chat>[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly firebaseService: FirebaseService
  ) {}

  public ngOnInit(): void {
    this.loadChats();
  }

  public onDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public openChat(chat: Identifiable<Chat>): void {
    this.router.navigate(['chat', chat.id], {
      relativeTo: this.route,
      state: chat,
    });
  }

  public filterChatsByUsername(event: any): void {
    const displayNameToSearch = event?.target?.value;

    this.filteredChats = this.chats.filter((chat) =>
      chat.value.participants.some((participant) =>
        participant.displayName
          .toLowerCase()
          .includes(displayNameToSearch.toLowerCase())
      )
    );
  }

  public getParticipant(participants: Participant[]): Participant {
    return getParticipantsWithoutCurrentUser(
      participants,
      this.firebaseService
    );
  }

  private loadChats(): void {
    this.subscriptions.add(
      this.firebaseService.getChats().subscribe((chats) => {
        this.chats = chats;
        this.filteredChats = chats;
      })
    );
  }
}
