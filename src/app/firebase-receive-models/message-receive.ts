import { Timestamp } from '@angular/fire/firestore';

export class MessageReceive {
  public text: string;
  public senderUid: string;
  public timestamp: Timestamp;
}
