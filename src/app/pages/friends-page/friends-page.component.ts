import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IFriends } from 'src/app/models/friends';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.css']
})
export class FriendsPageComponent {

  constructor(private router: Router){}

  friendsList: IFriends[] = [
    {
      id: 0,
      username: 'Данил',
      age: 21,
    },
    {
      id: 1,
      username: 'Максим',
      age: 25,
    },
    {
      id: 2,
      username: 'Петя',
      age: 18,
    },
  ];

  goToChat(id: number) {
    this.router.navigate([`messages/chat`], {
      queryParams: {
        id: id,
      },
    });
  }

}
