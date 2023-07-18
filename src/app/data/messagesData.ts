import { IChatMessage } from "../models/chatMessage";

export const messagesData = [
  {
    id: 0,
    avatarLink: '',
    username: 'Александр',
    textLastMessage: 'Ты мне не вернул сотку',
  },
  {
    id: 1,
    avatarLink: '',
    username: 'Максим',
    textLastMessage: 'Пошли в бар',
  },
  {
    id: 2,
    avatarLink: '',
    username: 'Надежда',
    textLastMessage: 'Пошли в доту',
  },
  {
    id: 3,
    avatarLink: '',
    username: 'Евгений',
    textLastMessage: 'Я клутой!',
  },
  {
    id: 4,
    avatarLink: '',
    username: 'Лера',
    textLastMessage: '...',
  },
];

export const messageLinkInterlocutor: IChatMessage[] = [
  {
    id: 3,
    chatId: `0_3`,
    senderId: "3",
    recipientId: "0",
    content: 'Hello world!',
  },
];

export const messageLinkOwn = [
  {
    id: 0,
    chatId: `0_3`,
    senderId: "0",
    recipientId: "3",
    content: 'hello',
  },
];

