import { TUserInfo } from './friends';
import { IResponseEditInfo } from './user';

// Типы

export type TCommentRequest = {
  textComments: string
}

export type TinfoUserFromLentaDTO = {
  userInfo: TUserInfo;
  dateOfBirthday: string;
  url: string;
};

export type TMessageDTO = {
  infoUserFromLentaDto: TinfoUserFromLentaDTO;
  textMessage: string;
  titleMessage: string;
};

//Интерфейсы
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

export interface IComments {
  textComments: string;
  infoUserFromLentaDto: TinfoUserFromLentaDTO;
  messageDto: {
    id: number;
  };
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
export interface IResponseGetPosts {
  messageDto: TMessageDTO;
  commentsDtoList: IComments[];
  likesDtos: string[];
}
