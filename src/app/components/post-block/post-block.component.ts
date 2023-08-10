import {
  Component,
  Input,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { IPersonInfo } from 'src/app/models/personInfo';
import { IComments, IResponseGetPosts } from 'src/app/models/post';
import { PersonPageService } from 'src/app/services/person-page.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-block',
  templateUrl: './post-block.component.html',
  styleUrls: ['./post-block.component.css'],
})
export class PostBlockComponent {
  @Input() post: IResponseGetPosts;
  @ViewChild('inputComment') inputComment: ElementRef;

  textComment = '';
  isClickLike: boolean = false;

  private userInfo: IPersonInfo;

  constructor(
    private postService: PostsService,
    private personService: PersonPageService,
  ) {}

  ngAfterViewInit() {
    this.personService.personInfo$.subscribe((info) => (this.userInfo = info));
  }

  clickIconComment() {
    this.inputComment.nativeElement.focus();
  }

  clickIconLike() {
    this.isClickLike = !this.isClickLike;
  }

  clickCreateComment(idPost: number) {
    if (this.textComment.length !== 0 && this.userInfo.id !== undefined) {
      const commentObject: IComments = {
        textComments: this.textComment,
        infoUserFromLentaDto: {
          userInfo: {
            id: this.userInfo.id,
            username: this.userInfo.username,
          },
          dateOfBirthday: this.userInfo.age,
          url: this.userInfo.urlImage,
        },
        messageDto: {
          id: idPost,
        },
      };

      this.postService
        .createCommentInPost(this.userInfo.id, idPost, commentObject)
        .subscribe(() => {
          this.post.commentsDtoList.unshift(commentObject);
          this.textComment = '';
        });
    }
  }
}
