import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { IPersonInfo } from 'src/app/models/personInfo';
import { FriendsService } from 'src/app/services/friends.service';
import { NotificationService } from 'src/app/services/notification.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent {
  @ViewChild('notificationContainer') notificationContainer: ElementRef;

  private userInfo:IPersonInfo = this.storageService.getUser();

  constructor(
    private storageService: StorageService,
    public notificationService: NotificationService,
    public friendsService: FriendsService
  ) {}

  ngAfterViewInit() {
    this.notificationService.isOpenNotifications$.subscribe((isOpen) => {
      if (isOpen) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                const senderId = entry.target.getAttribute('data-sender-id');
                console.log(this.userInfo.id);
                
                if(this.userInfo.id !== 0 && this.userInfo.id && senderId){
                  this.notificationService.deleteNotificatons(this.userInfo.id, senderId).subscribe(() => {});
                }
              }
            });
          },
          {
            root: this.notificationContainer.nativeElement,
            rootMargin: '0px',
            threshold: 0,
          }
        );

        const notificationElements = this.notificationContainer.nativeElement.querySelectorAll(
            '.notifications__point'
          );

        console.log(notificationElements);

        notificationElements.forEach((notificationElement: Element) => {
          observer.observe(notificationElement);
        });
      }
    });
  }

  //Прослушивание события клика для закрытия выпадающего списка
  @HostListener('document:click', ['$event'])
  handlePopupSearch(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    if (!clickedElement.closest('.notifications__link')) {
      this.notificationService.setIsOpenNotif(false);
    }
  }
}
