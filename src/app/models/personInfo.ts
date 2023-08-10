export interface IPersonItem<T> {
  value: T;
  text: string | number;
}

export interface IPersonInfo {
  id?: number;
  username: string;
  age: string;
  gender?: string;
  hobby?: string;
  about?: string;
  urlImage: string;
}

export interface IHobbyInfo {
  id: number;
  information: string;
}
