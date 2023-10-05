import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, debounce, debounceTime } from 'rxjs';
import { IPersonInfo } from 'src/app/models/personInfo';
import { FriendsService } from 'src/app/services/friends.service';
import { ModalService } from 'src/app/services/modal.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  private userInfo: IPersonInfo = this.storageService.getUser();
  private subs:Subscription;

  searchUsername = '';
  isOpenSearchPopup: boolean;

  constructor(
    private route: Router,
    private storageService: StorageService,
    public notificationService: NotificationService,
    public friendsService: FriendsService,
    public modalService: ModalService
  ) {
    this._setSearchSubscription();
  }

  private _setSearchSubscription() {
    this.subs = this.friendsService.searchUsernameFriend$
      .pipe(debounceTime(500))
      .subscribe((searchValue) => {
        //запрос на бекенд
      });
  }

  ngOnInit() {
    if (this.userInfo.id !== 0 && this.userInfo.id) {
      this.notificationService
        .getAllNotifications(this.userInfo.id)
        .subscribe((notificationsData) => {
          // this.notificationService.addNotifications(notificationsData);
          // this.notificationService.setCountNotifications(notificationsData.length);
        });
    }
    this.modalService.isOpenSearch$.subscribe(value => console.log(value));
  }

  //Прослушивание события клика для закрытия выпадающего списка
  @HostListener('document:click', ['$event'])
  handlePopupSearch(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    if (!clickedElement.closest('.header__search')) {
      this.isOpenSearchPopup = false;
    }
  }

  getUserInfo() {
    return this.userInfo;
  }

  getSearchUsername(usernameFriend: string) {
    this.searchUsername = usernameFriend;
  }

  goToLink(route: string) {
    this.route.navigate([route]);
  }

  goPersonPage() {
    if (this.userInfo.id !== 0 && this.userInfo.id) {
      this.friendsService.goToPageFriend(this.userInfo.id);
    }
  }

  setResponsiveSearchUsername(searchUsername: any){
   this.friendsService.setSearchUsername(searchUsername.target.value);
  }
}
