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

  currentCountNotification:number = 0;

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
                
                //Уменьшаю количество уведомлений на 1
                const currentCountNotif = this.notificationService.getCountNotifications(); // текущее кол-во уведомление
                const countRemoveNotif = entry.target.querySelector('.notifications__point-count')?.innerHTML; // кол-во уведомлений, которые сейчас видны
                this.notificationService.setCountNotifications(currentCountNotif - Number(countRemoveNotif));

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

        notificationElements.forEach((notificationElement: Element) => {
          observer.observe(notificationElement);
        });
      }
    });

    //Устанавливаю значение текущей длины массива с уведомлениями, чтобы список не показывал пустой шаблон
    this.notificationService.notificationList$.subscribe(notificationList => {
      this.currentCountNotification = notificationList.reduce<number>((counter, notificationGroup) => {
        counter += notificationGroup.length;
        return counter;
      }, this.currentCountNotification)
    })
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
