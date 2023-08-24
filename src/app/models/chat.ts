export interface IInterlocutors {
    id: number,
    username: string,
    message: string
}

export interface IAllChats {
    chatId: string,
    senderId: string,
    recipientId: string,
    senderName: string,
    recipientName: string,
    content: string
}