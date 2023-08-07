import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { PostsService } from 'src/app/services/posts.service';
import { PersonPageService } from 'src/app/services/person-page.service';
import { IPersonInfo } from 'src/app/models/personInfo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements AfterViewInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  isPostsOpen: boolean;

  private userInfo: IPersonInfo;

  form: FormGroup;

  constructor(
    public postService: PostsService,
    private personService: PersonPageService,
    private fb: FormBuilder,
    private errorService: ErrorService
  ) {
    this._createFrom();
  }

  ngOnInit() {
    this.personService.personInfo$.subscribe(
      (infoUser) => (this.userInfo = infoUser)
    );
  }

  ngAfterViewInit(): void {
    document.addEventListener('click', this.handleClickMenu.bind(this));
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
      
      this.postService
        .createPost(
          {
            titleMessage: this.titlePost?.value,
            textMessage: this.textPost?.value,
          },
          this.userInfo.id
        )
        .pipe(catchError(this.errorService.handle.bind(this)))
        .subscribe(() => {});
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
