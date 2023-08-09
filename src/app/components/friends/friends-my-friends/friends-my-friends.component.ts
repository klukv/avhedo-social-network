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
        .pipe(catchError(error => this.errorService.handle(error)))
        .subscribe(() => {
          this.friendsService.setLoadedMySubscribes(true);
        });
    }
  }
}
