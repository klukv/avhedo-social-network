import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IFriends } from 'src/app/models/friends';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.css'],
})
export class FriendsPageComponent {
  constructor(private router: Router, public friendsService: FriendsService) {}

  goToChat(id: number) {
    this.router.navigate([`messages/chat`], {
      queryParams: {
        id: id,
      },
    });
  }
  goToPageFriend(id: number) {
    this.router.navigate(['person'], {
      queryParams: {
        id: id,
      },
    });
  }
}
