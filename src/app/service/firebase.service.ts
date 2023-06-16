import { inject, Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  DocumentData,
  Firestore,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  public readonly firestore: Firestore = inject(Firestore);

  constructor() {}

  public getChat(userId: string, chatId: string): Observable<DocumentData> {
    return docData(doc(this.firestore, 'users', userId, 'chats', chatId));
  }

  public getChats(userId: string): Observable<DocumentData[]> {
    return collectionData(collection(this.firestore, 'users', userId, 'chats'));
  }

  // todo: add username search
  // todo: add chat request
}
