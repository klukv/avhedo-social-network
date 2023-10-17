import { Pipe, PipeTransform } from '@angular/core';
import { IResponseAllUsers } from '../models/friends';
import { FriendsService } from '../services/friends.service';
import { Observable, map } from 'rxjs';

@Pipe({
  name: 'filterFriends',
})
export class FilterFriendsPipe implements PipeTransform {
  constructor(private friendsService: FriendsService) {}

  transform(friendList: IResponseAllUsers[]): Observable<IResponseAllUsers[]> {
    return this.friendsService.searchUsernameFriend$.pipe(
      map((searchValue) => {
        if (searchValue.length === 0) {
          return friendList;
        }
        
        return friendList.filter((person) =>
          person.userInfo.username
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        );
      })
    );
  }
}
