import { Component } from '@angular/core';
import { IFriends } from 'src/app/models/friends';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.css'],
})
export class PersonPageComponent {
  constructor() {}
  friendsList: IFriends[] = [
    {
      id: 0,
      username: 'Евгений',
      age: 21,
    },
    {
      id: 1,
      username: 'Алексей',
      age: 25,
    },
    {
      id: 2,
      username: 'Лера',
      age: 18,
    },
    {
      id: 0,
      username: 'Анастасия',
      age: 21,
    },
    {
      id: 1,
      username: 'Максим',
      age: 25,
    },
    {
      id: 2,
      username: 'Евгения',
      age: 18,
    },
  ];
}
