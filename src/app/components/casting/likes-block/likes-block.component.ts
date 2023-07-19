import { Component } from '@angular/core';
import { CastingService } from 'src/app/services/casting.service';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-likes-block',
  templateUrl: './likes-block.component.html',
  styleUrls: ['./likes-block.component.css']
})
export class LikesBlockComponent {

  constructor(public friendsService: FriendsService, public castingService: CastingService){
    
  }
  cardsCount = [0, 1, 2, 3]

}
