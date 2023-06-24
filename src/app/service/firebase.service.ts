import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  collectionData,
  DocumentReference,
  Firestore,
  limit,
  query,
  serverTimestamp,
  where,
} from '@angular/fire/firestore';
import { from, Observable } from 'rxjs';
import { Chat } from '../firebase-send-models/chat';
import { Message } from '../firebase-send-models/message';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  public readonly firestore: Firestore = inject(Firestore);
  public readonly auth: Auth = inject(Auth);

  constructor() {}

  public getMessagesFromChat(chatId: string): Observable<Message[]> {
    return collectionData(
      query(collection(this.firestore, 'chats', chatId, 'messages'), limit(100))
    ) as Observable<Message[]>;
  }

  public sendMessage(
    text: string,
    chatId: string
  ): Observable<DocumentReference> {
    const message = new Message();
    message.senderUid = this.auth.currentUser?.uid as string;
    message.text = text;
    message.timestamp = serverTimestamp();

    return from(
      addDoc(
        collection(this.firestore, 'chats', chatId, 'messages'),
        <Message>message
      )
    );
  }

  public getChats(userId: string): Observable<Chat[]> {
    return collectionData(
      query(
        collection(this.firestore, 'chats'),
        where('participants', 'array-contains', userId)
      )
    ) as Observable<Chat[]>;
  }

  public createNewChat(
    participantUid: string,
    participantName: string
  ): Observable<DocumentReference> {
    const chat = new Chat();
    chat.participants.push(
      {
        uid: this.auth.currentUser?.uid as string,
        name: this.auth.currentUser?.displayName as string,
      },
      {
        uid: participantUid,
        name: participantName,
      }
    );

    return from(addDoc(collection(this.firestore, 'chats'), <Chat>chat));
  }

  // todo: add username search
  // todo: add chat request
}
