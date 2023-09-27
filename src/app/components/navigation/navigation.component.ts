import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FriendsService } from 'src/app/services/friends.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  ownSubscribers = 'ownSubscribers';

  constructor(
    private router: Router,
    public notificationService: NotificationService,
    public friendsService: FriendsService
  ) {}

  goToNavLink(route: string) {
    this.router.navigate([route]);
  }
}
