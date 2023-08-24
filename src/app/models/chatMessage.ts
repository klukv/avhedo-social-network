export interface IChatMessage {
  senderId: number | undefined;
  recipientId: number;
  senderName: string;
  recipientName: string;
  content: string;
  timestamp: Date;
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
  status: string | null;
}
