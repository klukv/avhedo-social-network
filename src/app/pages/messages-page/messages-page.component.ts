import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { messagesData } from 'src/app/data/messagesData';
import { IInterlocutors } from 'src/app/models/chat';
import { IMessage } from 'src/app/models/message';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.css'],
})
export class MessagesPageComponent {
  constructor(private router: Router) {}

  interlocutors: IMessage[] = messagesData;

  goToChat(id: number) {
    this.router.navigate([`messages/chat`], {
      queryParams: {
        id: id,
      },
    });
  }
}
