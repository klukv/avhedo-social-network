import { Component } from '@angular/core';
import { catchError, debounceTime } from 'rxjs';
import { IPersonInfo } from 'src/app/models/personInfo';
import { ErrorService } from 'src/app/services/error.service';
import { FriendsService } from 'src/app/services/friends.service';
import { PersonPageService } from 'src/app/services/person-page.service';

@Component({
  selector: 'app-friends-search',
  templateUrl: './friends-search.component.html',
  styleUrls: ['./friends-search.component.css'],
})
export class FriendsSearchComponent {
  private userInfo: IPersonInfo;
  selectedIndexButton: number;

  constructor(
    public friendsService: FriendsService,
    private personService: PersonPageService,
    public friendService: FriendsService,
    private errorService: ErrorService,
  ) {}

  ngOnInit() {
    this.personService.personInfo$.subscribe(
      (userInfo) => (this.userInfo = userInfo)
    );
  }

  clickAddFriendBtn(friendId: number, indexButton: number) {
    if (this.userInfo.id) {
      console.log(`запрос прошёл`);

      this.selectedIndexButton = indexButton;

      this.friendService
        .addFriend(this.userInfo.id, friendId)
        // .pipe(catchError(this.errorService.handle.bind(this)))
        .subscribe(() => {
          this.friendService.setLoaded(true);
          console.log(1);
        });
    }
  }
}
