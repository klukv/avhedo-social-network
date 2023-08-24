import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { messagesData } from 'src/app/data/messagesData';
import { IMessage } from 'src/app/models/message';
import { IPersonInfo } from 'src/app/models/personInfo';
import { ChatService } from 'src/app/services/chat.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.css'],
})
export class MessagesPageComponent {
  userInfo: IPersonInfo = this.storageService.getUser();

  constructor(
    private router: Router,
    private storageService: StorageService,
    public chatService: ChatService
  ) {}

  ngOnInit() {
    if (this.userInfo.id && this.userInfo.id !== 0) {
      this.chatService.getAllChatsUser(this.userInfo.id).subscribe(() => {});
    }
  }

  isOwnMessage(idSender: string): boolean {
    return this.userInfo.id === Number(idSender);
  }

  goToChat(id: string, chatId: string) {
    
    this.chatService.setChatId(chatId);

    this.router.navigate([`messages/chat`], {
      queryParams: {
        id: id,
      },
    });
  }
}
