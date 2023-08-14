export type TUserInfo = {
  id: number;
  username: string;
};

export interface IFriends {
  id: number;
  username: string;
  age: number;
  about?: string;
}
export interface IPersonSub {
  id: number;
  username: string;
  age: string;
  url: string;
}
export interface IResponseSubscribesInfo {
  friends: {
    userInfo: TUserInfo;
    dateOfBirthday: string;
    url: string;
  };
}

export interface IResponseAllUsers {
  userInfo: TUserInfo,
  dateOfBirthday: string,
  url: string
}

