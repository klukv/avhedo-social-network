import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFriends } from 'src/app/models/friends';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
})
export class ChatPageComponent {
  currentFriendChat: IFriends

  constructor(public friendsService: FriendsService, private activeRoute: ActivatedRoute) {}

  ngOnInit(){
    const userId = this.activeRoute.snapshot.queryParams["id"];
    this.friendsService.changeInfoFriend(userId);
  }
  ngDoCheck(){
    this.friendsService.friendInfo$.subscribe(friendInfo => this.currentFriendChat = friendInfo);
  }
  messages = [0, 1, 2, 3, 4]
}
