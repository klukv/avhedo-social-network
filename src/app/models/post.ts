export interface IPost {
  id: number;
  linkAvatar: string;
  username: string;
  titlePost: string;
  textPost: string;
  comments: IComment[];
}
interface IComment {
  id: number;
  linkAvatarComment: string;
  username: string;
  textComment: string;
}
