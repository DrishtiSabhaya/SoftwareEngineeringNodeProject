/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDao";
import MessageModel from "../mongoose/MessageModel";
import Message from "../models/Message";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns messageDao
     */
    public static getInstance = (): MessageDao => {
        if (MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    /**
     * Uses MessageModel to retrieve all message documents sent by a specific user from messages collection from the database
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the messages are retrieved
     */
    findAllMessagesSentByUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({to: uid}).exec();

    /**
     * Uses MessageModel to retrieve all message documents received for a specific user from messages collection from the database
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the messages are retrieved
     */
    findAllMessagesReceivedByUser = async (uid: string): Promise<Message[]> =>
        MessageModel.find({from: uid}).exec();

    /**
     * Uses MessageModel to insert message document sent by a specific user from messages collection from the database
     * @param {string} message message
     * @returns Promise To be notified when the message is inserted into database
     */
    userMessagesUser = async (message: Message): Promise<any> =>
        MessageModel.create({...message});

    /**
     * Removes message from the database.
     * @param {string} uid User's primary key
     * @param {string} mid Message's primary key
     * @returns Promise To be notified when the messages are deleted from database
     */
    userDeletesMessage = async (uid: string, mid: string): Promise<any> =>
        MessageModel.deleteOne({_id: mid});
}