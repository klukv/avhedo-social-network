import { Injectable } from '@angular/core';
import {
  IComments,
  IRequestCreatePost,
  IResponseCreatePost,
  IResponseGetPosts,
} from '../models/post';
import { HttpClient } from '@angular/common/http';
import {
  ADD_LIKE_POST,
  API_URL,
  CREATE_COMMENT_POST,
  CREATE_POST,
  DELETE_LIKE_POST,
  GET_POSTS,
  httpOptions,
} from '../utils/const';
import { Observable, catchError, tap } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private _http: HttpClient, private errorService: ErrorService) {}

  private _postsDatav: IResponseGetPosts[] = [];
  private _isLoadedPosts: boolean = true;


  get postsData() {
    return this._postsDatav;
  }

  get isLoadedPosts() {
    return this._isLoadedPosts;
  }

  setLoadedPosts(value: boolean) {
    this._isLoadedPosts = value;
  }

  // Backend requests

  createPost(
    infoPost: IRequestCreatePost,
    id: number
  ): Observable<IResponseCreatePost> {
    return this._http.post<IResponseCreatePost>(
      API_URL + CREATE_POST + '/' + id,
      infoPost,
      httpOptions
    );
  }

  getPosts(postId: number): Observable<IResponseGetPosts[]> {
    return this._http
      .get<IResponseGetPosts[]>(API_URL + GET_POSTS + '/' + postId, httpOptions)
      .pipe(
        tap((postsData) => (this._postsDatav = postsData)),
        catchError((error) => this.errorService.handle(error))
      );
  }

  createCommentInPost(
    userId: number,
    postId: number,
    comment: IComments
  ) {
    return this._http
      .post(
        API_URL + CREATE_COMMENT_POST + '/' + userId + '/' + postId,
        comment,
        httpOptions
      )
      .pipe(catchError((error) => this.errorService.handle(error)));
  }

  addLikeInPosts(userId: number, postId: number) {
    return this._http
      .post(API_URL + ADD_LIKE_POST + '/' + userId + '/' + postId, httpOptions)
      .pipe(catchError((error) => this.errorService.handle(error)));
  }

  deleteLikeFromPost(userId: number, postId: number) {
    return this._http
      .delete(
        API_URL + DELETE_LIKE_POST + '/' + userId + '/' + postId,
        httpOptions
      )
      .pipe(catchError((error) => this.errorService.handle(error)));
  }
}
