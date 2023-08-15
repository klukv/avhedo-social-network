import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
})
export class NavigationComponent {
  ownSubscribers = 'ownSubscribers'
  isOpenNotifications: boolean;

  ngAfterViewInit(): void {
    document.addEventListener('click', this.clickPopupNitifications.bind(this));
  }

  clickPopupNitifications(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    if (!clickedElement.closest('.notifications__link')) {
      this.isOpenNotifications = false;
    }
  }
  ngOnDestroy() {
    document.removeEventListener('click', this.clickPopupNitifications.bind(this));
  }
}
