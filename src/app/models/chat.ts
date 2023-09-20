export type TActiveChat = {
  id: string | undefined;
  recipientName: string | undefined;
};

export interface IInterlocutors {
  id: number;
  username: string;
  message: string;
}

export interface IAllChats {
  chatId: string;
  senderId: string;
  recipientId: string;
  senderName: string;
  recipientName: string;
  content: string;
  idLastSender: string;
  senderUrl: string;
}

export interface INotification {
  id: number;
  senderId: number;
  senderName: string;
}
