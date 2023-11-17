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

  isOwnChat(chatId:string) {
    if(this.userInfo.id && this.userInfo.id !== 0){
     return chatId.split('_')[0] === this.userInfo.id.toString()
    }
    return;
  }

  isOwnLastMessage(idLastSender: string){
    if(this.userInfo.id && this.userInfo.id !== 0){
      return this.userInfo.id.toString() === idLastSender
     }
     return;
  }

  goToChat(id: string) {
  
    this.router.navigate([`messages/chat`], {
      queryParams: {
        id: id,
      },
    });
  }
}
