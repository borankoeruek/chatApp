import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Identifiable } from 'src/app/firebase-receive-models/Identifiable';
import { Chat } from 'src/app/firebase-send-models/chat';
import { Message } from 'src/app/firebase-send-models/message';
import { Participant } from 'src/app/firebase-send-models/participant';
import { FirebaseService } from 'src/app/service/firebase.service';
import { getParticipantsWithoutCurrentUser } from 'src/app/util/helpers';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  public participant: Participant;

  private chat: Identifiable<Chat>;

  private messages: Message[];

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
      this.chat = routerState as Identifiable<Chat>;
    } else {
      this.route.params.subscribe((params) => {
        console.log(params);
        this.firebaseService
          .getChat(params['chatId'])
          .subscribe((identifiableChat) => {
            this.chat = identifiableChat;
            this.loadMessages();
            this.participant = getParticipantsWithoutCurrentUser(
              identifiableChat.value.participants,
              this.firebaseService
            );
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
}
