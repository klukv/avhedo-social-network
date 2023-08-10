import {
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  Renderer2,
} from '@angular/core';
import { CastingService } from 'src/app/services/casting.service';
import { FriendsService } from 'src/app/services/friends.service';
import { CASTING_PAGE, CASTING_PAGE_CONTACTS } from 'src/app/utils/const';

@Component({
  selector: 'app-likes-block',
  templateUrl: './likes-block.component.html',
  styleUrls: ['./likes-block.component.css'],
})
export class LikesBlockComponent {
  @ViewChildren('like__buttons_block') likeButtonsBlock: QueryList<ElementRef>;
  @ViewChildren('chatButton') chatButton: QueryList<ElementRef>;
  @ViewChildren('like__buttons') likeButtons: QueryList<ElementRef>;

  private _widthButtonsBlock: number;

  castingLink = `/${CASTING_PAGE}/${CASTING_PAGE_CONTACTS}`;
  castingPageLink = 'castingLink';

  constructor(
    public friendsService: FriendsService,
    public castingService: CastingService,
    private render: Renderer2,
  ) {}

  clickLikeCard(indexCard: number) {
    if (
      this.likeButtonsBlock !== undefined &&
      this.chatButton !== undefined &&
      this.likeButtons !== undefined
    ) {
      const currentLikeButtonsBlock = this.likeButtonsBlock.toArray()[indexCard].nativeElement;
      const currentChatBlock = this.chatButton.toArray()[indexCard].nativeElement;
      
      this._widthButtonsBlock = currentLikeButtonsBlock.offsetWidth - currentChatBlock.offsetWidth;

      this.render.setStyle(
        this.likeButtons.toArray()[indexCard].nativeElement,
        'opacity',
        '0'
      );

      setTimeout(() => {
        this.render.setStyle(currentChatBlock, 'transition', '.5s');
        this.render.setStyle(currentChatBlock, 'visibility', 'visible');
        this.render.setStyle(currentChatBlock, 'opacity', '1');
        this.render.setStyle(currentChatBlock, 'z-index', '2');
        this.render.setStyle(
          currentChatBlock,
          'transform',
          `translateX(${this._widthButtonsBlock}px)`
        );
      }, 200);
    }
  }

  clickDislikeCard(indexCard: number) {
    this.castingService.deleteUnlikeCard(indexCard);
  }

  clickChatButton(idLikePerson: number) {
    this.friendsService.goToChat(idLikePerson);
  }
}
