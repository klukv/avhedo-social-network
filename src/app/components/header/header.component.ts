import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IFriends } from 'src/app/models/friends';
import { FriendsService } from 'src/app/services/friends.service';
import { FRIENDS_PAGE } from 'src/app/utils/const';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {

  friend_link = FRIENDS_PAGE;
  searchUsername = '';
  isOpenSearchPopup: boolean;

  constructor(public friendsService: FriendsService, private route: Router) {}

  ngAfterViewInit(): void {
    document.addEventListener('click', this.handlePopupSearch.bind(this));
  }
  handlePopupSearch(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    if (!clickedElement.closest('.header__search')) {
      this.isOpenSearchPopup = false;
    }
  }

  getSearchUsername(usernameFriend: string) {
    this.searchUsername = usernameFriend;
  }

  goToPageFriend(id: number) {
    this.friendsService.changeInfoFriend(id);
    this.route.navigate(['person'], {
      queryParams: {
        id: id,
      },
    });
    this.isOpenSearchPopup = false;
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handlePopupSearch.bind(this));
  }
}
