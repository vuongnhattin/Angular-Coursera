export interface MessageReceive {
    id: string;
    roomId: number;
    content: string;
    sender: string;
    senderName: string;
}