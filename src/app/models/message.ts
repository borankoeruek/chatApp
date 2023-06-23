import { FieldValue } from '@angular/fire/firestore';

export class Message {
  public id?: string;
  public text: string;
  public senderUid: string;
  public timestamp: number | FieldValue;
}
