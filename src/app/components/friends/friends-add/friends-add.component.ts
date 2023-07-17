import { Component } from '@angular/core';
import { FriendsService } from 'src/app/services/friends.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-friends-add',
  templateUrl: './friends-add.component.html',
  styleUrls: ['./friends-add.component.css']
})
export class FriendsAddComponent {
  searchUsername = '';
  
  constructor(public friendsService: FriendsService){
    this._setSearchSubscription();
  }

  private _setSearchSubscription() {
    this.friendsService.searchUsernameFriend$
      .pipe(debounceTime(500))
      .subscribe((searchValue) => (this.searchUsername = searchValue));
  }
}
