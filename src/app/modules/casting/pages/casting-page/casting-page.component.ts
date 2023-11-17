import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActiveLinkDirective } from 'src/app/modules/shared/directives/active-link.directive';
import { CastingService } from 'src/app/services/casting.service';

@Component({
  selector: 'app-casting-page',
  templateUrl: './casting-page.component.html',
  styleUrls: ['./casting-page.component.css']
})

export class CastingPageComponent {
  isClickCard: boolean;
  castingLink = 'castingLink'
  likeLink = 'likeLink'
  selectLinks = ['/likes', '/contacts'];
  

  constructor(private activeRoute: Router, public castingService: CastingService) {}
  ngDoCheck() {
    this.isClickCard = this.selectLinks.some((link) =>
      this.activeRoute.url.includes(link)
    );
  }

}
