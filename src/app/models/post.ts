import { IResponseEditInfo } from './user';

export interface IPost {
  id: number;
  linkAvatar: string;
  username: string;
  titlePost: string;
  textPost: string;
  comments: IComment[];
}
export interface IComment {
  id: number;
  linkAvatarComment: string;
  username: string;
  textComment: string;
}

export interface IRequestCreatePost {
  titleMessage: string;
  textMessage: string;
}

export interface IResponseCreatePost {
  id: number;
  titleMessage: string;
  textMessage: string;
  userMessage: IResponseEditInfo;
}
