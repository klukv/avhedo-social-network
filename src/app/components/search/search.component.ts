import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  @Input() placeholder: string;
  @Output() setSearchValue = new EventEmitter();
  private _searchValue = new Subject();

  constructor() {
    this._setSearchSubscription();
  }

  updateSearch(newSearchText: any) {
    this._searchValue.next(newSearchText.target.value);
  }

  private _setSearchSubscription() {
    this._searchValue.pipe(debounceTime(500)).subscribe((searchValue) => {
      this.setSearchValue.emit(searchValue);
    });
  }

  ngOnDestroy() {
    this._searchValue.unsubscribe();
  }
}
