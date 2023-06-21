import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements AfterViewInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  isPostsOpen: boolean;

  constructor(public postService: PostsService){}

  ngAfterViewInit(): void {
    document.addEventListener('click', this.handleClickMenu.bind(this));
  }

  handleClickMenu(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    if (!clickedElement.closest('.home__news-post')) {
      this.isPostsOpen = false;
    }
  }
  ngOnDestroy() {
    document.removeEventListener('click', this.handleClickMenu.bind(this));
  }
}
