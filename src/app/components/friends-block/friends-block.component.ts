import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IPersonInfo } from 'src/app/models/personInfo';
import { FriendsService } from 'src/app/services/friends.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-friends-block',
  templateUrl: './friends-block.component.html',
  styleUrls: ['./friends-block.component.css'],
})
export class FriendsBlockComponent {
  private sub: Subscription;

  personInfo: IPersonInfo;

  constructor(
    private router: Router,
    public friendsService: FriendsService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.personInfo = this.storageService.getUser();
    if (this.personInfo.id && this.personInfo.id !== 0) {
      this.friendsService.setLoadedMySubscribes(false);
      this.sub = this.friendsService
        .getAllSubscribes(this.personInfo.id)
        .subscribe(() => {
          this.friendsService.setLoadedMySubscribes(true);
        });
    }
  }

  goToChat(id: number) {
    this.router.navigate([`messages/chat`], {
      queryParams: {
        id: id,
      },
    });
    //  this.friendsService.changeInfoFriend(id);
  }
  goToPageFriend(id: number) {
    this.router.navigate(['person'], {
      queryParams: {
        id: id,
      },
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
