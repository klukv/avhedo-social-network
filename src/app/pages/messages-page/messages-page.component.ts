import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IInterlocutors } from 'src/app/models/chat';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.css'],
})
export class MessagesPageComponent {
  constructor(private router: Router) {}

  interlocutors: IInterlocutors[] = [
    {
      id: 0,
      username: 'Данил',
      message: 'проверка123',
    },
    {
      id: 1,
      username: 'Максим',
      message: 'где моя сотка?',
    },
    {
      id: 2,
      username: 'Петя',
      message: 'я люблю сырники',
    },
  ];

  goToChat(id: number) {
    this.router.navigate([`messages/chat`], {
      queryParams: {
        id: id,
      },
    });
  }

  messagesList = [0, 1, 2, 3, 4];
}
