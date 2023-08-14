import { Pipe, PipeTransform } from '@angular/core';
import { IFriends, IPersonSub } from '../models/friends';

@Pipe({
  name: 'filterFriends'
})
export class FilterFriendsPipe implements PipeTransform {

  transform(friendList: IPersonSub[], usernameSort: string): IPersonSub[] {
    if(usernameSort.length == 0) return friendList;
    return friendList.filter(friend => friend.username.toLowerCase().includes(usernameSort.toLowerCase()));
  }

}
