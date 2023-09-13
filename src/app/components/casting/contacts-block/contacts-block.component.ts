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

  listCastingCards: ICards[] = [];

  constructor(
    public castingService: CastingService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    if (!this.castingService.getValueGettingCards()) {
      this.castingService
        .getCastingCards(this.infoUser.id, -1)
        .subscribe(() => {
          this.castingService.setValueGettingCards(true);
        });
    }

    this.castingService.listCastingPeople$.subscribe(
      (currentListCards) => (this.listCastingCards = currentListCards)
    );
  }
}
