export interface IChatMessage{
    id: number | null,
    chatId: string,
    senderId: string,
    recipientId: string,
    content: string
}