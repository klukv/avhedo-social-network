import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { IPersonInfo } from 'src/app/models/personInfo';
import { IPost, IResponseGetPosts } from 'src/app/models/post';
import { PostsService } from 'src/app/services/posts.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-post-block',
  templateUrl: './post-block.component.html',
  styleUrls: ['./post-block.component.css'],
})
export class PostBlockComponent {
  @Input() post: IResponseGetPosts;
  @ViewChild('inputComment') inputComment: ElementRef;

  textComment = '';

  private userInfo: IPersonInfo = this.storageService.getUser();

  constructor(
    private postService: PostsService,
    private storageService: StorageService
  ) {}

  clickIconComment() {
    this.inputComment.nativeElement.focus();
  }

  clickCreateComment() {
    if (this.textComment.length !== 0 && this.userInfo.id !== undefined) {
      this.postService
        .createCommentInPost(this.userInfo.id, 3, {
          textComments: this.textComment,
        })
        .subscribe(() => {});
    }
  }
}
