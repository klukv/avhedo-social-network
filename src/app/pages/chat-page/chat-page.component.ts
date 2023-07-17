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
  private _ws: WebSocket = new WebSocket('ws://localhost:5000');
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
    this._connectWebsocket();
  }

  private _connectWebsocket() {
    this._ws.onopen = () => {
      const message = {
        event: 'connection',
        id: Math.random(),
        chatId: `${this._user_id}_${this.personInfo.id}`,
        senderId: this.personInfo.id,
        recipientId: this._user_id,
        content: this.messageContent,
      };
      this._ws.send(JSON.stringify(message));
      console.log(`Подключение с вебсокетом установлено`);
    };

    this._ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.content !== undefined) {
        this.websocketService.addNewMessage(data);
      }
    };

    this._ws.onclose = () => {
      console.log(`Подключение остановлено`);
    };
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
  }

  sendMessageWs() {
    const message = {
      id: Math.random(),
      chatId: `${this._user_id}_${this.personInfo.id}`,
      senderId: this.personInfo.id,
      recipientId: this._user_id,
      content: this.messageContent,
      event: 'message',
    };
    this._ws.send(JSON.stringify(message));
    this.messageContent = '';
  }

  messages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  ngOnDestroy() {
    this.websocketService.clearMessages();
    this._ws.close();
    this.subscription.unsubscribe();
  }
}
