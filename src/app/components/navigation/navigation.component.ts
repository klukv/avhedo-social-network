import { Component } from '@angular/core';
import { FriendsService } from 'src/app/services/friends.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  ownSubscribers = 'ownSubscribers'
  isOpenNotifications: boolean;

  constructor(public notificationService: NotificationService, public friendsService: FriendsService){

  }

  ngAfterViewInit(): void {
    document.addEventListener('click', this.clickPopupNitifications.bind(this));
  }

  clickPopupNitifications(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    if (!clickedElement.closest('.notifications__link')) {
      this.isOpenNotifications = false;
    }
  }
  ngOnDestroy() {
    document.removeEventListener('click', this.clickPopupNitifications.bind(this));
  }
}
