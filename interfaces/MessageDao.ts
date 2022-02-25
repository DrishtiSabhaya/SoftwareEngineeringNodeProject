import Message from "../models/Message";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDao {
    findAllMessagesSentByUser (uid: string): Promise<Message[]>;
    findAllMessagesReceivedByUser (uid: string): Promise<Message[]>;
    userMessagesUser (message: Message): Promise<Message>;
    userDeletesMessage (uid: string, mid: string): Promise<any>;
};