import { Injectable } from '@angular/core';
import { IPost, IRequestCreatePost, IResponseCreatePost,  } from '../models/post';
import { postsData } from '../data/postsData';
import { HttpClient } from '@angular/common/http';
import { API_URL, CREATE_POST, httpOptions } from '../utils/const';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private _http: HttpClient) {}

  private _postsData: IPost[] = postsData;

  get posts() {
    return this._postsData;
  }

  set posts(newPosts: IPost[]) {
    this._postsData = newPosts;
  }

  // Backend requests

  createPost(infoPost: IRequestCreatePost, id: number): Observable<IResponseCreatePost> {
    return this._http.post<IResponseCreatePost>(
      API_URL + CREATE_POST + '/' + id,
      infoPost,
      httpOptions
    );
  }
}
