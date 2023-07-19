import { Directive, HostListener, Input } from '@angular/core';
import { CastingService } from '../services/casting.service';
import { FriendsService } from '../services/friends.service';

@Directive({
  selector: '[appActiveLink]',
})
export class ActiveLinkDirective {
  @Input('argLinks') selectLink: string;

  constructor(
    private castingService: CastingService,
    private friendsService: FriendsService
  ) {}

  @HostListener('click', ['$event'])
  setActiveLink() {
    const castingLinks = this.castingService.getActiveLinks();
    const friendsLinks = this.friendsService.activeFriendsLinks;

    if (Object.keys(castingLinks).indexOf(this.selectLink) !== -1) {
      this.castingService.setNewActiveLink(this.selectLink);
    }

    if (Object.keys(friendsLinks).indexOf(this.selectLink) !== -1) {
      this.friendsService.setActiveFriendLink(this.selectLink);
    }
  }
}
