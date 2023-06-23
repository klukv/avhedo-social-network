import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { debounce, debounceTime } from 'rxjs';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.css'],
})
export class FriendsPageComponent {
  searchUsername = '';
  constructor(private router: Router, public friendsService: FriendsService) {
    this._setSearchSubscription();
  }

  private _setSearchSubscription() {
    this.friendsService.searchUsernameFriend$
      .pipe(debounceTime(500))
      .subscribe((searchValue) => (this.searchUsername = searchValue));
  }

  goToChat(id: number) {
    this.router.navigate([`messages/chat`], {
      queryParams: {
        id: id,
      },
    });
    this.friendsService.changeInfoFriend(id);
  }
  goToPageFriend(id: number) {
    this.router.navigate(['person'], {
      queryParams: {
        id: id,
      },
    });
  }
}
