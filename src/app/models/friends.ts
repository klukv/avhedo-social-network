export type TUserInfo = {
  id: number;
  username: string;
};
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

export interface IPeopleSearch {
  id: number,
  username: string,
  dateOfBirthday: string,
  url: string
}

