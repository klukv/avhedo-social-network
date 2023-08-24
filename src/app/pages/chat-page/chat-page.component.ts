import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, catchError } from 'rxjs';
import { IFriends } from 'src/app/models/friends';
import { IPersonInfo } from 'src/app/models/personInfo';
import { IResponseInfoUser } from 'src/app/models/user';
import { ChatService } from 'src/app/services/chat.service';
import { ErrorService } from 'src/app/services/error.service';
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
  currentFriendChat: IResponseInfoUser;
  personInfo: IPersonInfo;
  messageContent: string = '';

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private personService: PersonPageService,
    private errorService: ErrorService,
    public chatService: ChatService,
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
    this.personService
      .getInfoUser(this._user_id)
      .pipe(catchError((error) => this.errorService.handle(error)))
      .subscribe((infoUser) => {
        this.friendsService.setInfoFriend(infoUser);
      });

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
  
    this.chatService
      .getAllMessagesChat(this.chatService.currentChatId)
      .subscribe(() => {});
  }

  isOwnMessage(senderId: string): boolean{
    return this.personInfo.id === Number(senderId);
  }

  clickBtnSendMessage() {
    this.websocketService.sendMessage(
      this.messageContent,
      this.currentFriendChat
    );
    this.messageContent = '';
  }

  ngOnDestroy() {
    this.websocketService.clearMessages();
    this.websocketService.disconnect();
    this.subscription.unsubscribe();
  }
}
