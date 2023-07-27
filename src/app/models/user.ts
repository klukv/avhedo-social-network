export interface IUser {
  id?: number;
  username: string;
  email?: string;
  role?: string[];
  password: string;
  age?: number;
  gender?: string;
}

export interface IResponseUser {
  id: number,
  type: string,
  token: string,
  username: string,
  email: string,
  roles: string[]
}
