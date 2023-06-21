import { Injectable } from '@angular/core';
import { IPost } from '../models/post';
import { postsData } from '../data/postsData';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor() {}

  private _postsData: IPost[] = postsData;

  get posts() {
    return this._postsData;
  }

  set posts(newPosts: IPost[]) {
    this._postsData = newPosts;
  }
}
