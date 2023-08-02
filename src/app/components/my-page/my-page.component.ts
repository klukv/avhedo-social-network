import { Component } from '@angular/core';
import { IPersonInfo } from 'src/app/models/personInfo';
import { IUser } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';
import { ModalService } from 'src/app/services/modal.service';
import { PersonPageService } from 'src/app/services/person-page.service';
import { StorageService } from 'src/app/services/storage.service';
import { TypeEditVariants, TypeModalWindows } from 'src/app/utils/const';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css'],
})
export class MyPageComponent {
  variantsEdit = TypeEditVariants;
  variantsModals = TypeModalWindows;

  constructor(
    public modalService: ModalService,
    public personService: PersonPageService,
    private authService: LoginService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.personService.setPersonInfo(this.storageService.getUser());
  }

  clickLogoutButton() {
    this.authService.logout();
  }

}
