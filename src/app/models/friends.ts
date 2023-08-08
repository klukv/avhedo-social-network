import { TRoles } from './user';

type TUserInfo = {
  id: number;
  username: string;
  email: string;
  password: string;
  roles: TRoles[];
};

export interface IFriends {
  id: number;
  username: string;
  age: number;
  about?: string;
}

export interface IResponseSubscribesInfo {
  ownerPage: {
    userInfo: TUserInfo;
    url: string;
  };
  friends: {
    userInfo: TUserInfo;
    url: string;
  };
}
