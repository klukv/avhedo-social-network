import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
} from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { PostsService } from 'src/app/services/posts.service';
import { IPersonInfo } from 'src/app/models/personInfo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements AfterViewInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  @ViewChild('homePage') homePage: ElementRef;

  isPostsOpen: boolean;
  isChangePostsBlock: boolean = false;
  isLoadedAdditionallyPosts = false;
  isLastPosts:boolean = false; // отслеживание - последние ли данные были получены из базы данных

  // это флаг для отслеживания - был ли уже отправлен запрос на бекенд при достижении конца страницы при скролле (страница с постами)
  isSendRequestGetPosts: boolean = false;

  private userInfo: IPersonInfo = this.storageService.getUser();

  form: FormGroup;

  constructor(
    public postService: PostsService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private errorService: ErrorService
  ) {
    this._createFrom();
  }

  ngOnInit() {
    this.postService.isGetPosts$.subscribe((isGet) => {
      if (isGet) {
        this.postService.getPosts(-1).subscribe(() => {
          this.postService.setValueIsGetPosts(false);
        });
      }
    });
  }

  ngAfterViewInit(): void {
    document.addEventListener('click', this.handleClickMenu.bind(this));
  }

  @HostListener('document:scroll', ['$event'])
  trackingScrollPosts(event: any) {
    const clientHeight = document.body.clientHeight;
    const homePageHeight = this.homePage.nativeElement.offsetHeight;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop || 0;

    if (clientHeight + scrollTop >= homePageHeight) {
      if (!this.isSendRequestGetPosts) {
        this.isLoadedAdditionallyPosts = false;
        this.getMorePosts();
        this.isSendRequestGetPosts = true;
      }
    } else {
      this.isSendRequestGetPosts = false;
    }
  }

  getMorePosts() {
    if (this.postService.postsData) {
      const idCurrentLastPost = this.postService.postsData[this.postService.postsData.length - 1].messageDto.id;

      this.postService
        .getPosts(idCurrentLastPost - 1)
        .subscribe((postsData) => {
          if (postsData.length === 0) {
            this.isLastPosts = true;
          }
        });
    }
  }

  private _createFrom() {
    this.form = this.fb.group({
      titlePost: ['', [Validators.required]],
      textPost: ['', [Validators.required]],
    });
  }

  clickCreatePost() {
    if (this.userInfo.id && this.form.valid) {
      console.log(`всё хорошо`);

      this.postService.setLoadedPosts(false);

      this.postService
        .createPost(
          {
            titleMessage: this.titlePost?.value,
            textMessage: this.textPost?.value,
          },
          this.userInfo.id
        )
        .pipe(catchError((error) => this.errorService.handle(error)))
        .subscribe(() => {
          this.form.setValue({
            titlePost: '',
            textPost: '',
          });
          this.postService.setValueIsGetPosts(true);
          this.postService.setLoadedPosts(true);
          this.isPostsOpen = false;
        });
    }
  }

  handleClickMenu(event: MouseEvent) {
    const clickedElement = event.target as HTMLElement;

    if (!clickedElement.closest('.home__news-post')) {
      this.isPostsOpen = false;
    }
  }

  get titlePost() {
    return this.form.get('titlePost');
  }

  get textPost() {
    return this.form.get('textPost');
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleClickMenu.bind(this));
  }
}
