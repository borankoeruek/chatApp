import { Component, ViewChild } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Identifiable } from 'src/app/firebase-receive-models/Identifiable';
import { MessageReceive } from 'src/app/firebase-receive-models/message-receive';
import { Chat } from 'src/app/firebase-send-models/chat';

import { Participant } from 'src/app/firebase-send-models/participant';
import { FirebaseService } from 'src/app/service/firebase.service';
import { getParticipantsWithoutCurrentUser } from 'src/app/util/helpers';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  @ViewChild('content') content: any;

  public chat: Identifiable<Chat>;

  public messages: MessageReceive[] = [];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly firebaseService: FirebaseService
  ) {}

  public ngOnInit(): void {
    this.loadChat();
  }

  public loadChat(): void {
    const routerState = this.router.getCurrentNavigation()?.extras?.state;
    if (routerState != null) {
      this.chat = routerState as Identifiable<Chat>;
      this.loadMessages();
    } else {
      this.route.params.subscribe((params) => {
        this.firebaseService
          .getChat(params['chatId'])
          .subscribe((identifiableChat) => {
            this.chat = identifiableChat;
            this.loadMessages();

            this.scrollToBottom();
          });
      });
    }
  }

  public loadMessages(): void {
    this.firebaseService
      .getMessagesFromChat(this.chat.id)
      .subscribe((messages) => {
        this.messages = messages;

        this.scrollToBottom();
      });
  }

  public sendMessage(text?: string | null): void {
    if (text === null || text === undefined || text === '') return;
    this.firebaseService.sendMessage(text, this.chat.id);
  }

  public isSender(message: MessageReceive): boolean {
    return message.senderUid === this.firebaseService.auth.currentUser?.uid;
  }

  public getParticipant(participants: Participant[]): Participant {
    return getParticipantsWithoutCurrentUser(
      participants,
      this.firebaseService
    );
  }

  public getTimeFromTimestamp(timestamp: Timestamp): string {
    const date = timestamp.toDate();

    date.toLocaleDateString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    });
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${minutes}`;
  }

  private scrollToBottom(): void {
    this.content.scrollToBottom(900);
  }
}
