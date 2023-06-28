import { inject, Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  DocumentData,
  DocumentReference,
  Firestore,
  limit,
  query,
  serverTimestamp,
  where,
} from '@angular/fire/firestore';
import { combineLatest, from, Observable } from 'rxjs';
import { Identifiable } from '../firebase-receive-models/Identifiable';
import { Chat } from '../firebase-send-models/chat';
import { Message } from '../firebase-send-models/message';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  public readonly firestore: Firestore = inject(Firestore);
  public readonly auth: Auth = inject(Auth);

  constructor() {}

  public login(): void {
    // todo:
  }

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

  public getChats(): Observable<Identifiable<Chat>[]> {
    const ref = query(
      collection(this.firestore, 'chats'),
      where('participants', 'array-contains', this.auth.currentUser?.uid)
    );

    const objects = collectionData(ref, { idField: 'id' });

    return this.convertDocumentsToIdentifiables<Chat>(
      objects as Observable<Chat[]>,
      objects as Observable<Identifiable<null>[]>
    );
  }

  public getChat(chatId: string): Observable<Identifiable<Chat>> {
    const ref = doc(this.firestore, 'chats', chatId);

    return this.convertDocumentToIdentifiable<Chat>(
      docData(ref) as Observable<Chat>,
      ref
    );
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

  private convertDocumentToIdentifiable<T>(
    object: Observable<T>,
    document: DocumentReference<DocumentData>
  ): Observable<Identifiable<T>> {
    return new Observable<Identifiable<T>>((subscription) => {
      object.subscribe((object: T) => {
        console.log('object', object);
        const identifiable: Identifiable<T> = {
          id: document.id,
          value: object,
        };

        subscription.next(identifiable);
      });
    });
  }

  public convertDocumentsToIdentifiables<T>(
    objects: Observable<T[]>,
    ids: Observable<Identifiable<null>[]>
  ): Observable<Identifiable<T>[]> {
    return new Observable<Identifiable<T>[]>((subscription) => {
      combineLatest([objects, ids]).subscribe(([objects, ids]) => {
        const identifiables: Identifiable<T>[] = [];

        objects.forEach((object: T, index: number) => {
          const identifiable: Identifiable<T> = {
            id: ids[index].id,
            value: object,
          };

          identifiables.push(identifiable);
        });

        subscription.next(identifiables);
      });
    });
  }

  // todo: add username search
  // todo: add chat request
}
