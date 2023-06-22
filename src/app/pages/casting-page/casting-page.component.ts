import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-casting-page',
  templateUrl: './casting-page.component.html',
  styleUrls: ['./casting-page.component.css'],
})
export class CastingPageComponent {
  isClickCard: boolean;
  selectLinks = ['/likes', '/contacts'];

  constructor(private activeRoute: Router) {}
  ngDoCheck() {
    this.isClickCard = this.selectLinks.some((link) =>
      this.activeRoute.url.includes(link)
    );
  }
}
