import { Component, ChangeDetectorRef } from '@angular/core';
import { ErrorService } from 'src/app/services/error.service';
import { LoginService } from 'src/app/services/login.service';
import { ModalService } from 'src/app/services/modal.service';
import { PersonPageService } from 'src/app/services/person-page.service';
import { StorageService } from 'src/app/services/storage.service';
import { TypeEditVariants, TypeModalWindows } from 'src/app/utils/const';
import { map, catchError } from 'rxjs';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css'],
})
export class MyPageComponent {
  variantsEdit = TypeEditVariants;
  variantsModals = TypeModalWindows;
  private currentInfoUser = this.storageService.getUser();

  constructor(
    public modalService: ModalService,
    public personService: PersonPageService,
    private authService: LoginService,
    public storageService: StorageService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {

    if (!this.storageService.isShowInfoUser()) {
      this.personService.setPersonInfo(this.currentInfoUser);
      this.personService.setLoaded(true);
    }

    this.personService.isLoaded$.subscribe((isLoad) => {
      if (!isLoad) {
        this.personService
          .getInfoUser(this.currentInfoUser.id)
          .pipe(
            map((userData) => {
              this.personService.setPersonInfo({
                id: userData.userDto.id,
                username: this.currentInfoUser.username,
                age: userData.dateOfBirthday,
                gender: userData.sex,
                hobby: userData.hobby,
                about: userData.aboutMe,
                urlImage: userData.url,
              });
            }),

            catchError(this.errorService.handle.bind(this))
          )
          .subscribe(() => {
            this.personService.setLoaded(true);
          });
      }
    });
  }

  clickLogoutButton() {
    this.authService.logout();
  }
}
