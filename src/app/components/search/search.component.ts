import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @Input() placeholder: string;
  @Output() setSearchValue = new EventEmitter();
  subs: Subscription;

  constructor(private friendService: FriendsService) {
    this._setSearchSubscription();
  }

  updateSearch(newSearchText: any) {
    this.friendService.setSearchUsername(newSearchText.target.value);
  }

  private _setSearchSubscription() {
    this.subs = this.friendService.searchUsernameFriend$.pipe(debounceTime(500)).subscribe((searchValue) => {
      this.setSearchValue.emit(searchValue);
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
