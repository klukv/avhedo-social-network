import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IFriends } from 'src/app/models/friends';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private _searchFriends: IFriends[] = [];
  isOpenSearchPopup: boolean;

  constructor(private friendsService: FriendsService, private route: Router) {}

  ngAfterViewInit(): void {
    document.addEventListener('click', this.handlePopupSearch.bind(this));
  }

  handlePopupSearch(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    if (!clickedElement.closest('.header__search')) {
      this.isOpenSearchPopup = false;
    }
  }
  filterSelectFriend(usernameFriend: string) {
    this._searchFriends = this.friendsService.listFriends.filter((friend) =>
      friend.username.toLowerCase().includes(usernameFriend.toLowerCase())
    );
  }

  goToPageFriend(id: number){
    this.friendsService.changeInfoFriend(id);
    this.route.navigate(['person'], {
      queryParams: {
        id: id,
      },
    })
    this.isOpenSearchPopup = false;
  }

  get searchFriends() {
    return this._searchFriends;
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handlePopupSearch.bind(this));
  }
}
