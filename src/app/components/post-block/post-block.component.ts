import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { IPost } from 'src/app/models/post';

@Component({
  selector: 'app-post-block',
  templateUrl: './post-block.component.html',
  styleUrls: ['./post-block.component.css'],
})
export class PostBlockComponent{
  @Input() post: IPost;
  @ViewChild('inputComment') inputComment: ElementRef;

  constructor() {}
  
  clickIconComment() {
    this.inputComment.nativeElement.focus();
  }

}
