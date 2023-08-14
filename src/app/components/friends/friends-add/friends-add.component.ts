import { Component } from '@angular/core';
import { FriendsService } from 'src/app/services/friends.service';
import { catchError, debounceTime } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { IPersonInfo } from 'src/app/models/personInfo';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-friends-add',
  templateUrl: './friends-add.component.html',
  styleUrls: ['./friends-add.component.css'],
})
export class FriendsAddComponent {
  private userInfo: IPersonInfo = this.storageService.getUser();
  searchUsername = '';

  constructor(
    public friendsService: FriendsService,
    private storageService: StorageService,
    private errorService: ErrorService
  ) {
    this._setSearchSubscription();
  }

  ngOnInit() {
    if (this.userInfo.id && this.userInfo && this.userInfo.id !== 0) {
      this.friendsService.setLoadedSubscribers(false)
      
      this.friendsService
        .getAllSubscribers(this.userInfo.id)
        .pipe(catchError((error) => this.errorService.handle(error)))
        .subscribe(() => {this.friendsService.setLoadedSubscribers(true)});
    }
  }

  private _setSearchSubscription() {
    this.friendsService.searchUsernameFriend$
      .pipe(debounceTime(500))
      .subscribe((searchValue) => (this.searchUsername = searchValue));
  }
}
