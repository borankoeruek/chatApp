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
import { Chat } from '../models/chat';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  public static readonly firestore: Firestore = inject(Firestore);
  public static readonly auth: Auth = inject(Auth);

  constructor() {}

  public static getMessagesFromChat(chatId: string): Observable<Message[]> {
    return collectionData(
      query(collection(this.firestore, 'chats', chatId, 'messages'), limit(100))
    ) as Observable<Message[]>;
  }

  public static sendMessage(
    text: string,
    chatId: string
  ): Observable<DocumentReference> {
    const message = new Message();
    message.senderUid = this.auth.currentUser?.uid as string;
    message.text = text;
    message.timestamp = serverTimestamp();

    // todo: check if this delete is really needed
    delete message.id;

    return from(
      addDoc(
        collection(this.firestore, 'chats', chatId, 'messages'),
        <Message>message
      )
    );
  }

  public static getChats(userId: string): Observable<Chat[]> {
    return collectionData(
      query(
        collection(this.firestore, 'chats'),
        where('participants', 'array-contains', userId)
      )
    ) as Observable<Chat[]>;
  }

  public static createNewChat(
    participantUid: string
  ): Observable<DocumentReference> {
    const chat = new Chat();
    chat.participants.push(
      this.auth.currentUser?.uid as string,
      participantUid
    );

    // todo: check if this delete is really needed
    delete chat.id;

    return from(addDoc(collection(this.firestore, 'chats'), <Chat>chat));
  }

  // todo: add username search
  // todo: add chat request
}
