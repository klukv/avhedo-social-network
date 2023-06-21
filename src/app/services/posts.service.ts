import { Injectable } from '@angular/core';
import { IPost } from '../models/post';
import { postsData } from '../data/postsData';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor() {}

  postsData: IPost[] = postsData;
}
