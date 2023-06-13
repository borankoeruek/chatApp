import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss'],
})
export class ChatListComponent {
  chatItems: any = [
    { name: 'Jochen' },
    { name: 'Detlef' },
    { name: 'Karen' },
    { name: 'Eugen' },
    { name: 'Harry' },
  ];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  public openChat(): void {
    this.router.navigate(['chat'], { relativeTo: this.route });
  }
}
