import { Component, Input } from '@angular/core';
import { ICards } from 'src/app/models/likeCards';
import { CastingService } from 'src/app/services/casting.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-form-block',
  templateUrl: './form-block.component.html',
  styleUrls: ['./form-block.component.css'],
})
export class FormBlockComponent {
  @Input() infoCard: ICards;
  @Input() indexCard: number;

  private infoUser = this.storageService.getUser();

  constructor(
    public castingService: CastingService,
    private storageService: StorageService
  ) {}

  clickLikeButton() {
    (<HTMLStyleElement>document.getElementById('card_swipe')).style.transition =
      '.5s';
    (<HTMLStyleElement>document.getElementById('card_swipe')).style.transform =
      'translateX(-400px) rotate(-30deg)';
    (<HTMLStyleElement>document.getElementById('card_swipe')).style.opacity =
      '0';
    setTimeout(() => {
      this.castingService.setNewCastingCards(this.indexCard);
    }, 200);
    
    // Отправляем запрос на бекенд
    this.castingService
      .likeCard(this.infoUser.id, this.infoCard.id)
      .subscribe(() => {});
  }

  clickDislikeButton() {
    (<HTMLStyleElement>document.getElementById('card_swipe')).style.transition =
      '.5s';
    (<HTMLStyleElement>document.getElementById('card_swipe')).style.transform =
      'translateX(400px) rotate(30deg)';
    (<HTMLStyleElement>document.getElementById('card_swipe')).style.opacity =
      '0';
    setTimeout(() => {
      this.castingService.setNewCastingCards(this.indexCard);
    }, 200);
  }
}
