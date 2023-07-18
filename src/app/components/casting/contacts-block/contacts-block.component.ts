import { Component } from '@angular/core';
import { ILikesCard } from 'src/app/models/likeCards';
import { CastingService } from 'src/app/services/casting.service';

@Component({
  selector: 'app-contacts-block',
  templateUrl: './contacts-block.component.html',
  styleUrls: ['./contacts-block.component.css']
})
export class ContactsBlockComponent {
  listLikeCards:ILikesCard[] = []

  constructor(public castingService: CastingService){
    this.castingService.listLikePeople$.subscribe(currentListCards => this.listLikeCards = currentListCards)
  }

}
