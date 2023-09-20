import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, catchError } from 'rxjs';
import { IPersonInfo } from 'src/app/models/personInfo';
import { IResponseInfoUser } from 'src/app/models/user';
import { ChatService } from 'src/app/services/chat.service';
import { ErrorService } from 'src/app/services/error.service';
import { FriendsService } from 'src/app/services/friends.service';
import { PersonPageService } from 'src/app/services/person-page.service';
import { StorageService } from 'src/app/services/storage.service';
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
    private storageService: StorageService,
    public chatService: ChatService,
    public friendsService: FriendsService,
    public websocketService: WebsocketService
  ) {
    this._user_id = this.activeRoute.snapshot.queryParams['id'];
  }

  ngOnInit() {
    this.personInfo = this.storageService.getUser();

    this.personService
      .getInfoUser(this._user_id)
      .pipe(catchError((error) => this.errorService.handle(error)))
      .subscribe((infoUser) => {
        this.friendsService.setInfoFriend(infoUser);
      });

    this.subscription = this.friendsService.friendInfo$.subscribe(
      (friendInfo) => {
        this.currentFriendChat = friendInfo;

        // добавляем информацию о собеседнике в текущем чате
        this.websocketService.setActiveChat({
          id: friendInfo.userDto.id.toString(),
          recipientName: friendInfo.userDto.username,
        });
      }
    );

    this.router.events.subscribe((event) => {
      let currentUrl = this.router.url;

      if (event instanceof NavigationEnd && currentUrl.includes('chat')) {
        window.location.reload();
      }
    });

    this.websocketService.isConnected$.subscribe((valueConnecting) => {
      if (
        this.personInfo.id &&
        this.personInfo.id !== 0 &&
        valueConnecting === true
      ) {
        this.chatService
          .getAllMessagesChat(this.personInfo.id.toString(), this._user_id)
          .subscribe(() => {});
      }
    });
  }

  clickKeyupSendMessage(event: KeyboardEvent){
    if(event.key === 'Enter'){
      this.websocketService.sendMessage(
        this.messageContent,
        this.currentFriendChat
      );
      this.messageContent = '';
    }
  }

  isOwnMessage(senderId: string): boolean {
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
    this.websocketService.setActiveChat({
      id: undefined,
      recipientName: undefined,
    });
    this.websocketService.clearMessages();
    this.subscription.unsubscribe();
  }
}
