import { Component } from '@angular/core';
import { catchError } from 'rxjs';
import { IPersonInfo } from 'src/app/models/personInfo';
import { ErrorService } from 'src/app/services/error.service';
import { FriendsService } from 'src/app/services/friends.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-friends-my-friends',
  templateUrl: './friends-my-friends.component.html',
  styleUrls: ['./friends-my-friends.component.css'],
})
export class FriendsMyFriendsComponent {
  private userInfo: IPersonInfo = this.storageService.getUser();

  activeButton: number;

  constructor(
    public friendsService: FriendsService,
    private storageService: StorageService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    if (this.userInfo.id && this.userInfo.id !== 0) {
      this.friendsService.setLoadedMySubscribes(false);
      this.friendsService
        .getAllSubscribes(this.userInfo.id)
        .pipe(catchError((error) => this.errorService.handle(error)))
        .subscribe(() => {
          this.friendsService.setLoadedMySubscribes(true);
        });
    }
  }

  clickDeleteFriendBtn(friendId: number, indexBtn: number) {
    if (this.userInfo.id && this.userInfo.id !== 0) {
      this.activeButton = indexBtn;

      const filterListSubscribes = this.friendsService.listSubcribes.filter(
        (infoSubscribe) => infoSubscribe.id !== friendId
      );
      this.friendsService.setListSubscribes(filterListSubscribes);

      this.friendsService
        .deleteFriend(this.userInfo.id, friendId)
        .subscribe(() => {});
    }
  }
}
