import { inject, Injectable } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
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
import { MessageReceive } from '../firebase-receive-models/message-receive';
import { Chat } from '../firebase-send-models/chat';
import { Message } from '../firebase-send-models/message';
import { Participant } from '../firebase-send-models/participant';
import { UserPublic } from '../firebase-send-models/user-public';

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

  public getCurrentUserState() {
    return new Observable<User | null>((subscription) => {
      this.auth.onAuthStateChanged((user) => {
        subscription.next(user);
        subscription.complete();
      });
    });
  }

  public getMessagesFromChat(chatId: string): Observable<MessageReceive[]> {
    return collectionData(
      query(collection(this.firestore, 'chats', chatId, 'messages'), limit(100))
    ) as Observable<MessageReceive[]>;
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
    const participant = new Participant();
    participant.uid = this.auth.currentUser?.uid as string;
    participant.displayName = this.auth.currentUser?.displayName as string;

    const ref = query(
      collection(this.firestore, 'chats'),
      where(
        'participants',
        'array-contains',
        this.toFirebaseObject(participant)
      )
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
    chat.participants = [];
    chat.participants.push(
      {
        uid: this.auth.currentUser?.uid as string,
        displayName: this.auth.currentUser?.displayName as string,
      },
      {
        uid: participantUid,
        displayName: participantName,
      }
    );

    return from(
      addDoc(collection(this.firestore, 'chats'), this.toFirebaseObject(chat))
    );
  }

  // todo: add username search
  public searchUsername(
    displayName: string
  ): Observable<Identifiable<UserPublic>[]> {
    const ref = query(
      collection(this.firestore, 'users_public'),
      where('displayName', '==', displayName)
    );

    const objects = collectionData(ref, { idField: 'id' });

    return this.convertDocumentsToIdentifiables<UserPublic>(
      objects as Observable<UserPublic[]>,
      objects as Observable<Identifiable<null>[]>
    );
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

  private convertDocumentsToIdentifiables<T>(
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

  private toFirebaseObject(object: Object): object {
    return JSON.parse(JSON.stringify(object));
  }

  // todo: add chat request
}
