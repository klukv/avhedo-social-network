import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appStopPropagination]',
})
export class StopPropaginationDirective {
  constructor() {}

  @HostListener('click', ['$event'])
  public onMousedown(event: MouseEvent): void {
    event.stopPropagation();
  }
}
