import { Component } from '@angular/core';
import { FriendsService } from 'src/app/services/friends.service';


@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.css'],
})
export class FriendsPageComponent {
  constructor(public friendsService: FriendsService) {
  }
}
