import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IFriends } from 'src/app/models/friends';
import { FriendsService } from 'src/app/services/friends.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { TypeActionAddNewMessage } from 'src/app/utils/const';

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
  messageContent: string = '';

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    public friendsService: FriendsService,
    public websocketService: WebsocketService
  ) {
    this._user_id = this.activeRoute.snapshot.queryParams['id'];
    this._connectWebsocket();
  }

  private _connectWebsocket() {
    this._ws.onopen = () => {
      const message = {
        event: 'connection',
        id: this._user_id,
      };
      this._ws.send(JSON.stringify(message));
      console.log(`Подключение с вебсокетом установлено`);
    };

    this._ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.content !== undefined) {
        this.websocketService.addNewMessage(
          TypeActionAddNewMessage.TYPE_ADD_MESSAGE,
          data
        );
      }
    };

    this._ws.onclose = () => {
      console.log(`Подключение остановлено`);
    };
  }

  ngOnInit() {
    this.friendsService.changeInfoFriend(Number(this._user_id));
  }

  ngDoCheck() {
    this.subscription = this.friendsService.friendInfo$.subscribe(
      (friendInfo) => (this.currentFriendChat = friendInfo)
    );
  }

  sendMessageWs() {
    const message = {
      id: this._user_id,
      content: this.messageContent,
      event: 'message',
    };
    this._ws.send(JSON.stringify(message));
    this.messageContent = '';
  }

  messages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  ngOnDestroy() {
    this.websocketService.addNewMessage(
      TypeActionAddNewMessage.TYPE_CLEAR_STASH,
      { id: null, content: '' }
    );
    this._ws.close();
    this.subscription.unsubscribe();
  }
}
