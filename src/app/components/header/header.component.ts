import { Component } from '@angular/core';
import { IFriends } from 'src/app/models/friends';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private _searchFriends: IFriends[] = [];

  constructor(private friendsService: FriendsService) {}

  filterSelectFriend(usernameFriend: string) {
    this._searchFriends = this.friendsService.listFriends.filter((friend) =>
      friend.username.toLowerCase().includes(usernameFriend.toLowerCase())
    );
    console.log(this._searchFriends);
  }
}
