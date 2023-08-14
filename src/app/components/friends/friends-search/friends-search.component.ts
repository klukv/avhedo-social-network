import { Component } from '@angular/core';
import { IPersonInfo } from 'src/app/models/personInfo';
import { ErrorService } from 'src/app/services/error.service';
import { FriendsService } from 'src/app/services/friends.service';
import { StorageService } from 'src/app/services/storage.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-friends-search',
  templateUrl: './friends-search.component.html',
  styleUrls: ['./friends-search.component.css'],
})
export class FriendsSearchComponent {
  private userInfo: IPersonInfo = this.storageService.getUser();

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
    const result =
      this.friendService.listSubcribes.filter(
        (infoUser) => infoUser.id == personId
      ).length !== 0;
    return result;
  }

  clickAddFriendBtn(friendId: number, indexButton: number) {
    if (this.userInfo.id && this.userInfo.id !== 0) {
      console.log(`запрос прошёл`);

      this.selectedIndexButton = indexButton;

      this.friendService.addFriend(this.userInfo.id, friendId).subscribe(() => {
        this.friendService.setLoaded(true);
      });
    }
  }


// TODO: перенести метод удаления в компонент с подписками



  clickDeleteFriendBtn(friendId: number) {
    if (this.userInfo.id && this.userInfo.id !== 0) {
      this.friendService
        .deleteFriend(this.userInfo.id, friendId)
        .subscribe(() => {});
    }
  }
}
