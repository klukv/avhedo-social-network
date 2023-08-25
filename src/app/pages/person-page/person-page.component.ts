import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { IResponseInfoUser } from 'src/app/models/user';
import { ErrorService } from 'src/app/services/error.service';
import { FriendsService } from 'src/app/services/friends.service';
import { PersonPageService } from 'src/app/services/person-page.service';

@Component({
  selector: 'app-person-page',
  templateUrl: './person-page.component.html',
  styleUrls: ['./person-page.component.css'],
})
export class PersonPageComponent {
  personInfo: IResponseInfoUser;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private personService: PersonPageService,
    private errorService: ErrorService,
    public friendsService: FriendsService
  ) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params) => {
      this.personService
        .getInfoUser(params.id)
        .pipe(catchError((error) => this.errorService.handle(error)))
        .subscribe((infoUser) => this.friendsService.setInfoFriend(infoUser));

      this.friendsService
        .getAllSubscribers(params.id, true)
        .pipe(catchError((error) => this.errorService.handle(error)))
        .subscribe(() => {});
    });

    this.friendsService.friendInfo$.subscribe(
      (infoPersonCurrent) => (this.personInfo = infoPersonCurrent)
    );
  }

  goToPageFriend(id: number) {
    this.router.navigate(['person'], {
      queryParams: {
        id: id,
      },
    });
  }
}
