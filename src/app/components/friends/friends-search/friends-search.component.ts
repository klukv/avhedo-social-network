import { Component } from '@angular/core';
import { IPersonInfo } from 'src/app/models/personInfo';
import { ErrorService } from 'src/app/services/error.service';
import { FriendsService } from 'src/app/services/friends.service';
import { StorageService } from 'src/app/services/storage.service';
import { catchError } from 'rxjs';
import { IPersonSub } from 'src/app/models/friends';

@Component({
  selector: 'app-friends-search',
  templateUrl: './friends-search.component.html',
  styleUrls: ['./friends-search.component.css'],
})
export class FriendsSearchComponent {
  private userInfo: IPersonInfo = this.storageService.getUser();
  private arrayAddedSubscribe: IPersonSub[] = [];

  selectedIndexButton: number;
  searchPerson: string = '';

  constructor(
    public friendsService: FriendsService,
    private storageService: StorageService,
    public friendService: FriendsService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    if (this.userInfo && this.userInfo.id && this.userInfo.id !== 0) {
      this.friendService.setLoadedAllUsers(false);
      this.friendService.getAllUsers(this.userInfo.id).subscribe(() => {
        this.friendService.setLoadedAllUsers(true);
      });

      // Инициализация людей, на которых подписан пользователь
      this.friendsService
        .getAllSubscribes(this.userInfo.id)
        .pipe(catchError((error) => this.errorService.handle(error)))
        .subscribe(() => {});
    }
  }

  hasSubscribes(personId: number): boolean {
    const arrayCurrentSubscribes = this.friendService.listSubcribes.concat(
      this.arrayAddedSubscribe
    );

    return (
      arrayCurrentSubscribes.filter((infoUser) => infoUser.id == personId)
        .length !== 0
    );
  }

  clickAddFriendBtn(friendId: number, indexButton: number, person: IPersonSub) {
    if (this.userInfo.id && this.userInfo.id !== 0) {
      console.log(`запрос прошёл`);

      this.selectedIndexButton = indexButton;
      this.arrayAddedSubscribe.push(person);

      this.friendService.addFriend(this.userInfo.id, friendId).subscribe(() => {
        this.friendService.setLoadedMySubscribes(false);
        this.friendService.setLoaded(true);
      });
    }
  }
}
