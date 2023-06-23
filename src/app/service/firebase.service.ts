import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  DocumentData,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  public readonly firestore: Firestore = inject(Firestore);

  constructor() {}

  public getChat(chatId: string): Observable<DocumentData> {
    return docData(doc(this.firestore, 'chats', chatId));
  }

  public getChats(userId: string): Observable<DocumentData[]> {
    // todo: add where clause
    return collectionData(collection(this.firestore, 'chats')) as Observable<
      Message[]
    >;

    query(
      collection(this.firestore, 'chats'),
      where('users', 'array-contains', userId)
    );
  }

  // todo: add username search
  // todo: add chat request
}
