import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.css'],
})
export class MultiSelectComponent {
  @Input() nameControl: string;
  hobbyList = [
    ' Настольные игры',
    ' Спорт',
    ' Программирование',
    ' Сериалы',
    ' Фильмы',
    ' Рисование',
  ];

  constructor(public modalService: ModalService) {}

  
}
