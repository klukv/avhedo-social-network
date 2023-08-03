export interface IPersonItem<T> {
  value: T;
  text: string | number;
}

export interface IPersonInfo {
  id?: number;
  username: string;
  age: number | undefined;
  gender: string | undefined;
  hobby: string | undefined;
  about: string | undefined;
  urlImage: string | undefined;
}

export interface IHobbyInfo {
  id: number;
  information: string;
}
