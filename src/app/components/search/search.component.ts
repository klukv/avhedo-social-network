import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { IPersonInfo } from 'src/app/models/personInfo';
import { FriendsService } from 'src/app/services/friends.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  private userInfo: IPersonInfo = this.storageService.getUser();
  private _searchUsername: Subject<string> = new Subject();

  @Input() placeholder: string;
  @Output() setSearchValue = new EventEmitter();
  subs: Subscription;

  constructor(
    private storageService: StorageService,
    public friendService: FriendsService,
  ) {}

  ngOnInit() {
    if (this.userInfo.id && this.userInfo.id !== 0) {
      this.friendService.setLoadedAllUsers(false);
      this.friendService
        .getAllUsers(this.userInfo.id)
        .subscribe(() => {
          this.friendService.setLoadedAllUsers(true);
        });
    }

    //Устанавливаю имя, введенное пользователем, применив debounceTime
    this._searchUsername.pipe(debounceTime(800)).subscribe(searchValue => this.friendService.setSearchUsername(searchValue));
  }

  updateSearch(newSearchText: any) {
    this._searchUsername.next(newSearchText.target.value);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
