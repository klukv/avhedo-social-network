import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FriendsService } from 'src/app/services/friends.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-friends-block',
  templateUrl: './friends-block.component.html',
  styleUrls: ['./friends-block.component.css'],
})
export class FriendsBlockComponent {
  constructor(private websocketService: WebsocketService, private router: Router, public friendsService: FriendsService) {}
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
