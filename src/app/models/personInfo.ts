export interface IPersonItem<T> {
    value: T,
    text: string | number
}

export interface IPersonInfo {
    id:number,
    username: string,
    age: number,
    hobby: string,
    about: string
}

export interface IHobbyInfo {
    id: number,
    information: string
}