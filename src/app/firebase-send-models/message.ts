import { FieldValue } from '@angular/fire/firestore';

export class Message {
  public text: string;
  public senderUid: string;
  public timestamp: FieldValue;
}
