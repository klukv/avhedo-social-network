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
  private ws: WebSocket = new WebSocket('ws://localhost:5000');
  currentFriendChat: IFriends;
  messageContent: string = '';

  constructor(
    public friendsService: FriendsService,
    private activeRoute: ActivatedRoute,
    public websocketService: WebsocketService
  ) {
    this._connectWebsocket();
  }

  private _connectWebsocket(){
    this.ws.onopen = () => {
      const message = {
        event: 'connection',
        id: Date.now(),
      }
      this.ws.send(JSON.stringify(message));
      console.log(`Подключение с вебсокетом установлено`);
    }

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.websocketService.addNewMessage(data);
    }

    this.ws.onclose = () => {
      console.log(`Подключение остановлено. Попытка переподключения будет через 3 сек...`);
      setTimeout(this._connectWebsocket, 3000);
    }
  }

  ngOnInit() {
    const userId = this.activeRoute.snapshot.queryParams['id'];
    this.friendsService.changeInfoFriend(userId);
  }

  ngDoCheck() {
    this.friendsService.friendInfo$.subscribe(
      (friendInfo) => (this.currentFriendChat = friendInfo)
    );
  }

  sendMessageWs() {
    const message = {
      id: Date.now(),
      content: this.messageContent,
      event: 'message'
    }
    this.ws.send(JSON.stringify(message));
    this.messageContent = ''
  }

  messages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
}
