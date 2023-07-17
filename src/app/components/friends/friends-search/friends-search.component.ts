import { Component } from '@angular/core';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-friends-search',
  templateUrl: './friends-search.component.html',
  styleUrls: ['./friends-search.component.css']
})
export class FriendsSearchComponent {
  constructor(public friendsService: FriendsService){
  }

}
