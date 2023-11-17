import { Component } from '@angular/core';
import { IPersonInfo } from 'src/app/models/personInfo';
import { ErrorService } from 'src/app/services/error.service';
import { FriendsService } from 'src/app/services/friends.service';
import { StorageService } from 'src/app/services/storage.service';
import { catchError, Subject, debounceTime } from 'rxjs';
import { IPersonSub, IResponseAllUsers } from 'src/app/models/friends';

@Component({
  selector: 'app-friends-search',
  templateUrl: './friends-search.component.html',
  styleUrls: ['./friends-search.component.css'],
})
export class FriendsSearchComponent {
  private userInfo: IPersonInfo = this.storageService.getUser();
  private arrayAddedSubscribe: IPersonSub[] = [];
  private _searchPerson: Subject<string> = new Subject();

  searchPerson = '';

  selectedIndexButton: number;

  constructor(
    public friendsService: FriendsService,
    private storageService: StorageService,
    public friendService: FriendsService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    //Получение всех пользователей
    if (this.userInfo && this.userInfo.id && this.userInfo.id !== 0) {
      this.friendService.setLoadedAllUsers(false);
      this.friendService.getAllUsers(this.userInfo.id).subscribe(() => {
        this.friendService.setLoadedAllUsers(true);
        this.friendService.searchUsernameFriend$.subscribe(searchValue => this.searchPerson = searchValue);
      });
    }

    // Инициализация людей, на которых подписан пользователь
    if (this.userInfo.id && this.userInfo.id !== 0) {
      this.friendsService
        .getAllSubscribes(this.userInfo.id)
        .pipe(catchError((error) => this.errorService.handle(error)))
        .subscribe(() => {
          this.friendService.setLoaded(true);
        });
    }

    //Искомое имя, введенное пользователем
    this._searchPerson.pipe(debounceTime(800)).subscribe((searchValue) => {
      this.friendService.setSearchUsername(searchValue);
    });
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

  clickAddFriendBtn(
    friendId: number,
    indexButton: number,
    person: IResponseAllUsers
  ) {
    if (this.userInfo.id && this.userInfo.id !== 0) {
      console.log(`запрос прошёл`);

      const oldPerson: IPersonSub = {
        id: person.userInfo.id,
        username: person.userInfo.username,
        dateOfBirthday: person.dateOfBirthday,
        url: person.url,
      };

      this.selectedIndexButton = indexButton;
      this.arrayAddedSubscribe.push(oldPerson);

      this.friendService.setLoaded(false);
      this.friendService.addFriend(this.userInfo.id, friendId).subscribe(() => {
        this.friendService.setLoaded(true);
      });
    }
  }

  setSearchPerson(username: any) {
    this._searchPerson.next(username.target.value);
  }
}
