import { HttpHeaders } from '@angular/common/http';

export const MAIN_PAGE = '';

export const SUBSCRIBERS_PAGE = 'subscribers';
export const MY_SUBSCRIBERS = 'own'
export const SUBSCRIBERS_ADDED = 'added';
export const SUBSCRIBERS_SEARCH = 'search';

export const CASTING_PAGE = 'casting';
export const CASTING_PAGE_LIKES = 'likes';
export const CASTING_PAGE_CONTACTS = 'contacts';

export const LOGIN_PAGE = 'signin';
export const REGISTRATION_PAGE = 'signup';
export const REGISTRATION_SECOND = 'signup/additionally/info'
export const PERSON_PAGE = 'person';
export const MESSAGES_PAGE = 'messages';
export const CHAT_PAGE = 'messages/chat';

//Backend requests const

//export const API_URL = 'http://localhost:8080';
export const API_URL = 'http://80.76.43.34:8080'; // адресс хостинга
export const LOGIN_URL = '/api/auth/signin';
export const SIGNUP_URL = '/api/auth/signup';

export const GET_USER_INFO = '/userInfo';
export const ADD_USER_INFO = '/userAddInfo';
export const EDIT_USER_INFO = '/editUserInfo';

export const ADD_IMAGE_AVATAR = '/upload'

export const CREATE_POST = '/userAddMessage';
export const GET_POSTS = '/InfoForMessage';
export const CREATE_COMMENT_POST = '/usersAddCommentsMessage';
export const ADD_LIKE_POST = '/usersAddLikeMessage';
export const DELETE_LIKE_POST = '/usersDeleteLikeMessage';

export const ADD_FRIEND = '/addFriends';
export const DELETE_FRIEND = '/deleteFriends';
export const GET_ALL_FRIENDS = '/allFriendsUser';
export const GET_ALL_SUBCRIBERS = '/allSubFriendsUser';
export const GET_ALL_USERS = '/AlluserInfo';
export const GET_SEARCH_PEOPLE = '/searchUser'

export const GET_ALL_CHATS_USER = '/AllChatUser'
export const GET_ALL_MESSAGES_CHAT = '/ChatMessages'
export const GET_SPECIFICALLY_MESSAGE = '/MessageChatForId'

export const GET_CASTING_CARDS = '/InfoAllPeopleLove'
export const GET_ALL_FANS = '/infoAllLoveYou'
export const ADD_LIKE_CARD = '/love'
export const DELETE_LIKE_CARD = '/dontLove'

export const GET_ALL_NOTIFICATIONS = '/NotificationMessages'
export const DELETE_NOTIFICATIONS = '/deleteNotificationMessages'

//SessionStorage keys

export const USER_KEY = 'auth-user';
export const TOKEN_KEY = 'token-user';
export const IS_SHOW_DATA_KEY = 'is-show-data-user';

//Enums

export enum TypeEditVariants {
  TYPE_AGE = 'age',
  TYPE_HOBBY = 'hobby',
  TYPE_ABOUT = 'about',
  TYPE_AVATAR = 'TYPE_AVATAR'
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

