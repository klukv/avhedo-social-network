import { Pipe, PipeTransform } from '@angular/core';
import { IFriends } from '../models/friends';

@Pipe({
  name: 'filterFriends'
})
export class FilterFriendsPipe implements PipeTransform {

  transform(friendList: IFriends[], usernameSort: string): IFriends[] {
    if(usernameSort.length == 0) return friendList;
    return friendList.filter(friend => friend.username.toLowerCase().includes(usernameSort.toLowerCase()));
  }

}
