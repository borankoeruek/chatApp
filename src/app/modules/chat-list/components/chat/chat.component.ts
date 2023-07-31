import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Identifiable } from 'src/app/firebase-receive-models/Identifiable';
import { MessageReceive } from 'src/app/firebase-receive-models/message-receive';
import { Chat } from 'src/app/firebase-send-models/chat';

import { Participant } from 'src/app/firebase-send-models/participant';
import { FirebaseService } from 'src/app/service/firebase.service';
import { getParticipantsWithoutCurrentUser } from 'src/app/util/helpers';
import {GlobalService} from "../../../../service/global.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  @ViewChild('messageList') messageList: ElementRef;

  public chat: Identifiable<Chat>;

  public messages: MessageReceive[] = [];

  private subscriptions: Subscription = new Subscription();

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly firebaseService: FirebaseService,
    private readonly global: GlobalService
  ) {}

  public ngOnInit(): void {
    this.loadChat();
    this.global.hideTabs()
  }

  public ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.global.showTabs()
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
    this.subscriptions.add(
      this.firebaseService
        .getMessagesFromChat(this.chat.id)
        .subscribe((messages) => {
          this.messages = messages;

          this.scrollToBottom();
        })
    );
  }

  public sendMessage(text?: string | null): void {
    if (text === null || text === undefined || text === '') return;
    this.firebaseService.sendMessage(text, this.chat.id).subscribe(() => {
      this.scrollToBottom();
    });
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
    if (timestamp === null || timestamp === undefined) return '';

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
    setTimeout(() => {
      this.messageList?.nativeElement.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 500);
  }
}
