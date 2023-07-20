import { Component } from '@angular/core';
import { ICards } from 'src/app/models/likeCards';
import { CastingService } from 'src/app/services/casting.service';

@Component({
  selector: 'app-contacts-block',
  templateUrl: './contacts-block.component.html',
  styleUrls: ['./contacts-block.component.css']
})
export class ContactsBlockComponent {
  listCastingCards:ICards[] = []

  constructor(public castingService: CastingService){
    this.castingService.listCastingPeople$.subscribe(currentListCards => this.listCastingCards = currentListCards)
  }

}
