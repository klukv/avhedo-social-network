import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from './services/modal.service';
import { TypeModalWindows } from './utils/const';
import { ErrorService } from './services/error.service';
import { IPersonInfo } from './models/personInfo';
import { StorageService } from './services/storage.service';
import { PersonPageService } from './services/person-page.service';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showBlockFriends: boolean;
  showBlockAdditionally: boolean;
  variantsModals = TypeModalWindows;

  constructor(
    private router: Router,
    public modalService: ModalService,
    private personService: PersonPageService,
    private websocketService: WebsocketService,
    public errorService: ErrorService
  ) {}

  ngOnInit() {
    this.personService.personInfo$.subscribe((userInfo) => {
      if (userInfo.id !== 0) {

        this._connectWebsocket();
      }
    });

    this.errorService.error$.subscribe((error) => {
      if (error.length !== 0) {
        this.errorService.openErrorModal();
      }
    });
  }

  private _connectWebsocket() {
    this.websocketService.connect('http://localhost:8080/ws');
  }

  hasRoute(route: string) {
    return this.router.url.includes(route);
  }
}
