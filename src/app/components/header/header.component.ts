import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FriendsService } from 'src/app/services/friends.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  searchUsername = '';
  isOpenSearchPopup: boolean;
  isOpenNotifications: boolean;

  constructor(
    private route: Router,
    public notificationService: NotificationService,
    public friendsService: FriendsService
  ) {}

  //Прослушивание события клика для закрытия выпадающего списка
  @HostListener('document:click', ['$event'])
  handlePopupSearch(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    if (!clickedElement.closest('.header__search')) {
      this.isOpenSearchPopup = false;
    }

    if (!clickedElement.closest('.notifications__link')) {
      this.isOpenNotifications = false;
    }
  }

  getSearchUsername(usernameFriend: string) {
    this.searchUsername = usernameFriend;
  }

  goToLink(route: string) {
    this.route.navigate([route]);
  }

  goToPageFriend(id: number) {
    // this.friendsService.changeInfoFriend(id);
    this.route.navigate(['person'], {
      queryParams: {
        id: id,
      },
    });
    this.isOpenSearchPopup = false;
  }
}
