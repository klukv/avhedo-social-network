import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subscription, debounceTime } from 'rxjs';
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

  @Input() placeholder: string;
  @Output() setSearchValue = new EventEmitter();
  subs: Subscription;

  constructor(
    private storageService: StorageService,
    public friendService: FriendsService,
  ) {
    this._setSearchSubscription();
  }

  ngOnInit() {
    if (this.userInfo.id && this.userInfo.id !== 0) {
      this.friendService.setLoadedSubscribers(false);
      this.friendService
        .getAllSubscribers(this.userInfo.id, false)
        .subscribe(() => {
          this.friendService.setLoadedSubscribers(true);
        });
    }
  }

  updateSearch(newSearchText: any) {
    this.friendService.setSearchUsername(newSearchText.target.value);
  }

  private _setSearchSubscription() {
    this.subs = this.friendService.searchUsernameFriend$
      .pipe(debounceTime(500))
      .subscribe((searchValue) => {
        this.setSearchValue.emit(searchValue);
      });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
