import { FieldValue, Timestamp } from '@angular/fire/firestore';

export class Message {
  public id?: string;
  public text: string;
  public senderUid: string;
  public timestamp: Timestamp | FieldValue;
}
