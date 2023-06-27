import { Directive, HostListener, Input, ElementRef } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Directive({
  selector: '[appClickListener]',
})
export class ClickListenerDirective {

  @Input() selectElement: string;

  constructor(private modalService:ModalService) {}


  @HostListener('click', ['$event'])
  public eventListen(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest(this.selectElement)) {
      this.modalService.closePopup();
    }
  }
}
