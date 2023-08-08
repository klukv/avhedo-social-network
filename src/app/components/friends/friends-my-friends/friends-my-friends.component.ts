import { Component } from '@angular/core';
import { catchError, map } from 'rxjs';
import { IPersonInfo } from 'src/app/models/personInfo';
import { ErrorService } from 'src/app/services/error.service';
import { FriendsService } from 'src/app/services/friends.service';
import { PersonPageService } from 'src/app/services/person-page.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-friends-my-friends',
  templateUrl: './friends-my-friends.component.html',
  styleUrls: ['./friends-my-friends.component.css'],
})
export class FriendsMyFriendsComponent {
  private userInfo: IPersonInfo = this.stoargeService.getUser();

  constructor(
    public friendsService: FriendsService,
    private stoargeService: StorageService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    if (this.userInfo.id !== undefined) {
      this.friendsService
        .getAllFriends(this.userInfo.id)
        .pipe(map(subcribesData => {
          
        }))
        .subscribe(() => {
          this.friendsService.setLoadedMySubscribes(true);
        });
    }
  }
}
