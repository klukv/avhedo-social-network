import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFriends } from 'src/app/models/friends';
import { FriendsService } from 'src/app/services/friends.service';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.css'],
})
export class PersonPageComponent {
  friendInfo: IFriends;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    public friendsService: FriendsService
  ) {}

  ngOnInit() {
    const userId = this.activeRoute.snapshot.queryParams['id'];
    this.friendsService.changeInfoFriend(userId);
  }

  ngDoCheck() {
    this.friendsService.friendInfo$.subscribe(
      (friendInfo) => (this.friendInfo = friendInfo)
    );
  }
  goToPageFriend(id: number) {
    this.friendsService.changeInfoFriend(id);
    this.router.navigate(['person'], {
      queryParams: {
        id: id,
      },
    });
  }
}
