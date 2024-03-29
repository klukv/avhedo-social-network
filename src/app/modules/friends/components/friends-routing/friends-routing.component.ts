import { Component } from '@angular/core';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-friends-routing',
  templateUrl: './friends-routing.component.html',
  styleUrls: ['./friends-routing.component.css'],
})
export class FriendsRoutingComponent {
  ownSubscribers = 'ownSubscribers';
  searchSubscribes = 'searchSubscribes';
  addedSubscribers = 'addedSubscribers';

  constructor(public friendsService: FriendsService) {}
}
