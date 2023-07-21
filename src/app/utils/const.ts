export const MAIN_PAGE = ''

export const FRIENDS_PAGE = 'friends'
export const FRIENDS_ADDED = 'added'
export const FRIENDS_SEARCH = 'search'

export const CASTING_PAGE = 'casting'
export const CASTING_PAGE_LIKES = 'likes'
export const CASTING_PAGE_CONTACTS = 'contacts'

export const LOGIN_PAGE = 'signin'
export const REGISTRATION_PAGE = 'signup'
export const PERSON_PAGE = 'person'
export const MESSAGES_PAGE = 'messages'
export const CHAT_PAGE = 'messages/chat'

//Backend requests const

export const API_URL = 'http://localhost:8080';
export const AUTH_URL = '/api/auth/signin';
export const SIGNUP_URL = '/api/auth/signup';
export const LOGOUT_URL = '/api/auth/logout';

//SessionStorage keys

export const USER_KEY = 'auth-user'

//Enums

export enum TypeEditVariants{
    TYPE_AGE = 'age',
    TYPE_HOBBY = 'hobby',
    TYPE_ABOUT = 'about'
}

export enum TypeActionAddNewMessage{
    TYPE_ADD_MESSAGE = 'ADD_MESSAGE',
    TYPE_CLEAR_STASH = 'TYPE_CLEAR_STASH'
}