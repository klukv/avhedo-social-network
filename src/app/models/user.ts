export type TRoles = {
  id: number;
  name: string;
}

export type TRegisterOneStep = {
  message: string
}

export interface IUser {
  id?: number;
  username: string;
  email?: string;
  role?: string[];
  password?: string;
  age?: number;
  gender?: string;
}

export interface IAdditionallyInfoUser {
  dateOfBirthday: number | string;
  hobby: string;
  aboutMe: string;
  sex: string;
  url: string;
}

export interface IResponseUser {
  id: number;
  type: string;
  token: string;
  username: string;
  email: string;
  roles: string[];
}

export interface IResponseInfoUser {
  dateOfBirthday: string;
  aboutMe: string;
  hobby: string,
  url: string;
  sex: string;
  userDto: {
    id: number;
    username: string;
  };
}

export interface IResponseEditInfo {
  id: number;
  dateOfBirthday: string;
  aboutMe: string;
  hobby: string;
  url: string | null;
  sex: string;
  userInfo: {
    id: number;
    username: string;
    email: string;
    password: string;
    roles: TRoles[];
  }
}
