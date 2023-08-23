export interface IChatMessage {
  senderId: number | undefined;
  recipientId: number;
  senderName: string;
  recipientName: string;
  content: string;
  timestamp: Date;
}
