import { Directive, HostListener, Input } from '@angular/core';
import { PersonPageService } from '../services/person-page.service';

@Directive({
  selector: '[appClickHobby]',
})
export class ClickHobbyDirective {
  @Input() hobbyInfo: string[];
  constructor(private personService: PersonPageService) {}

  @HostListener('click', ['$event'])
  public setHobby() {
    this.personService.selectHobbyItems.map((hobby) => {
      if (this.hobbyInfo.indexOf(hobby.information) !== -1) return;
      this.hobbyInfo.push(hobby.information);
    });
  }
}
