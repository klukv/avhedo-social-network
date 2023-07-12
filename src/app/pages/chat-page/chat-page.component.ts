import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFriends } from 'src/app/models/friends';
import { FriendsService } from 'src/app/services/friends.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css'],
})
export class ChatPageComponent {
  private _user_id: string;
  private _ws: WebSocket = new WebSocket('ws://localhost:5000');
  currentFriendChat: IFriends;
  messageContent: string = '';

  constructor(
    public friendsService: FriendsService,
    private activeRoute: ActivatedRoute,
    public websocketService: WebsocketService
  ) {
    this._user_id = this.activeRoute.snapshot.queryParams['id'];
    this._connectWebsocket();
  }

  private _connectWebsocket(){
    this._ws.onopen = () => {
      const message = {
        event: 'connection',
        id: this._user_id,
      }
      console.log(`connection`);
      console.log(this._user_id);
      this._ws.send(JSON.stringify(message));
      console.log(`Подключение с вебсокетом установлено`);
    }

    this._ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.websocketService.addNewMessage(data);
    }

    this._ws.onclose = () => {
      console.log(`Подключение остановлено`);
    }
  }

  ngOnInit() {
    this.friendsService.changeInfoFriend(Number(this._user_id));
  }

  ngDoCheck() {
    this.friendsService.friendInfo$.subscribe(
      (friendInfo) => (this.currentFriendChat = friendInfo)
    );
  }

  sendMessageWs() {
    const message = {
      id: this._user_id,
      content: this.messageContent,
      event: 'message'
    }
    console.log(`message`);
    console.log(this._user_id);
    this._ws.send(JSON.stringify(message));
    this.messageContent = ''
  }

  messages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  ngOnDestroy(){
    this._ws.close();
  }
}
