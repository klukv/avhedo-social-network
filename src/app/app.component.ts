import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  showBlockFriends: boolean;
  showBlockAdditionally: boolean;

  constructor(private router: Router, public modalService: ModalService) {}

  hasRoute(route: string){
    return this.router.url.includes(route)
  }
}
