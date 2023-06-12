import { Component, ViewChild } from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;

  isFocusPost:boolean;

}
