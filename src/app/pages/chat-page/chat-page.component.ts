import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IFriends } from 'src/app/models/friends';
import { IPersonInfo } from 'src/app/models/personInfo';
import { FriendsService } from 'src/app/services/friends.service';
import { PersonPageService } from 'src/app/services/person-page.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
})
export class ChatPageComponent {
  private subscription: Subscription;
  private _user_id: string;
  currentFriendChat: IFriends;
  personInfo: IPersonInfo;
  messageContent: string = '';

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private personService: PersonPageService,
    public friendsService: FriendsService,
    public websocketService: WebsocketService
  ) {
    personService.personInfo$.subscribe(
      (currentPersonInfo) => (this.personInfo = currentPersonInfo)
    );
    this._user_id = this.activeRoute.snapshot.queryParams['id'];
  }

  private _connectWebsocket() {
    this.websocketService.connect('http://localhost:8080/ws');
  }

  ngOnInit() {
    this.friendsService.changeInfoFriend(Number(this._user_id));
    this.subscription = this.friendsService.friendInfo$.subscribe(
      (friendInfo) => (this.currentFriendChat = friendInfo)
    );
    this.router.events.subscribe((event) => {
      let currentUrl = this.router.url;

      if (event instanceof NavigationEnd && currentUrl.includes('chat')) {
        window.location.reload();
      }
    });
    this._connectWebsocket();
    this.websocketService.getAllMessages(`${this.personInfo.id}_${this._user_id}`)
  }

  clickBtnSendMessage(){
    this.websocketService.sendMessage(this.messageContent, this.currentFriendChat);
    this.messageContent = ''
  }

  ngOnDestroy() {
    this.websocketService.clearMessages();
    this.websocketService.disconnect();
    this.subscription.unsubscribe();
  }
}
