import { Message } from './message';

export class Chat {
  public id: string;
  public participants: string[];
  public messages: Message[];
}
