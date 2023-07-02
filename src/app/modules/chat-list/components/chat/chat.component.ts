import { Component } from '@angular/core';
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
  public chat: Identifiable<Chat>;

  public messages: MessageReceive[] = [
    {
      text: 'tesaiushdiuashdiuashidhsaiudhasi aiudhiuashduiashd uiashdiuashdt',
      timestamp: new Timestamp(new Date().getTime() / 1000, 123),
      senderUid: 'EvNCwSbXCGNodjoff98CoEns4773',
    },
    {
      text: 'tesaiushdiuashdiuashidhsaiudhasi aiudhiuashduiashd uiashdiuashdt',
      timestamp: new Timestamp(new Date().getTime() / 1000, 0),
      senderUid: '1',
    },
    {
      text: 'tesaiushdiuashdiuashidhsaiudhasi aiudhiuashduiashd uiashdiuashdt',
      timestamp: new Timestamp(new Date().getTime() / 1000, 123),
      senderUid: 'EvNCwSbXCGNodjoff98CoEns4773',
    },
  ];

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
    console.log(routerState);
    if (routerState != null) {
      console.log(routerState);
      this.chat = routerState as Identifiable<Chat>;
    } else {
      console.log('else');
      this.route.params.subscribe((params) => {
        console.log(params);
        this.firebaseService
          .getChat(params['chatId'])
          .subscribe((identifiableChat) => {
            this.chat = identifiableChat;
            this.loadMessages();
          });
      });
    }
  }

  public loadMessages(): void {
    this.firebaseService
      .getMessagesFromChat(this.chat.id)
      .subscribe((messages) => {
        this.messages = messages;
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
    const date = timestamp.toDate();

    date.toLocaleDateString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    });
    console.log(date);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${hours}:${minutes}`;
  }
}
