import { HttpHeaders } from '@angular/common/http';

export const MAIN_PAGE = '';

export const FRIENDS_PAGE = 'friends';
export const FRIENDS_ADDED = 'added';
export const FRIENDS_SEARCH = 'search';

export const CASTING_PAGE = 'casting';
export const CASTING_PAGE_LIKES = 'likes';
export const CASTING_PAGE_CONTACTS = 'contacts';

export const LOGIN_PAGE = 'signin';
export const REGISTRATION_PAGE = 'signup';
export const PERSON_PAGE = 'person';
export const MESSAGES_PAGE = 'messages';
export const CHAT_PAGE = 'messages/chat';

//Backend requests const

export const API_URL = 'http://localhost:8080';
export const LOGIN_URL = '/api/auth/signin';
export const SIGNUP_URL = '/api/auth/signup';
export const GET_USER_INFO = '/userInfo';
export const ADD_USER_INFO = '/userAddInfo';
export const EDIT_USER_INFO = '/editUserInfo';
export const CREATE_POST = '/userAddMessage';
export const ADD_FRIEND = '/addFriends';
export const DELETE_FRIEND = '/deleteFriends';
export const GET_ALL_FRIENDS = '/allFriendsUser';

//SessionStorage keys

export const USER_KEY = 'auth-user';
export const TOKEN_KEY = 'token-user';
export const IS_SHOW_DATA_KEY = 'is-show-data-user';

//Enums

export enum TypeEditVariants {
  TYPE_AGE = 'age',
  TYPE_HOBBY = 'hobby',
  TYPE_ABOUT = 'about',
}

export enum TypeActionAddNewMessage {
  TYPE_ADD_MESSAGE = 'ADD_MESSAGE',
  TYPE_CLEAR_STASH = 'TYPE_CLEAR_STASH',
}

export enum TypeModalWindows {
  TYPE_MODAL_EDIT = 'TYPE_MODAL_EDIT',
  TYPE_MODAL_FORM = 'TYPE_MODAL_FORM',
}

// Headers requests

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

