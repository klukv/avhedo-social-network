export interface IChatMessage {
  senderId: number;
  recipientId: number;
  senderName: string;
  recipientName: string;
  content: string;
  timestamp: Date;
   status: string;
}

export interface IResponseAllChatMessages {
  id: number;
  chatId: string;
  senderId: string;
  recipientId: string;
  senderName: string;
  recipientName: string;
  content: string;
  timestamp: Date;
  status: string;
}
