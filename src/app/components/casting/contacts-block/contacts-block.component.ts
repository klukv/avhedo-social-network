import { Component } from '@angular/core';
import { ICards } from 'src/app/models/likeCards';
import { CastingService } from 'src/app/services/casting.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-contacts-block',
  templateUrl: './contacts-block.component.html',
  styleUrls: ['./contacts-block.component.css'],
})
export class ContactsBlockComponent {
  private infoUser = this.storageService.getUser();

  constructor(
    public castingService: CastingService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.castingService.listCastingPeople$.subscribe((listCasting) => {
      if (listCasting.length === 0) {
        this.castingService
          .getCastingCards(this.infoUser.id, -1)
          .subscribe(() => {});
      }
           
      if (listCasting.length === 1) {
        const lastCard = listCasting[listCasting.length - 1];
        this.castingService
          .getCastingCards(this.infoUser.id, lastCard.id)
          .subscribe(() => {});
      }
    });
  }
}
