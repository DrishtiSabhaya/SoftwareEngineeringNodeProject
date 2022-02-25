/**
 * @file Controller RESTful Web service API for Messages resource
 */
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageController";

/**
 * @class MessagesController Implements RESTful Web service API for messages resource.
 * Defines the messaging HTTP endpoints:
 * <ul>
 *     <li>GET /users/:uid/messages/sent to retrieve all the messages sent by a user
 *     </li>
 *     <li>GET /users/:uid/messages/received to retrieve all the messages received by a user
 *     </li>
 *     <li>POST /api/users/:uid0/messages/sent/:uid1 to record that a user messaged a user
 *     </li>
 *     <li>DELETE /api/users/:uid0/messages/sent/:mid to record that a user deleted a message
 *     </li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing messages CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if (MessageController.messageController === null) {
            MessageController.messageController = new MessageController();
            app.get("/users/:uid/messages/sent", MessageController.messageController.findAllMessagesSentByUser);
            app.get("/users/:uid/messages/received", MessageController.messageController.findAllMessagesReceivedByUser);
            app.post("/users/:uid/messages/sent/:auid", MessageController.messageController.userMessagesUser);
            app.delete("/users/:uid/messages/:mid", MessageController.messageController.userDeletesMessage);
        }
        return MessageController.messageController;
    }

    private constructor() {}

    /**
     * Get all messages sent by a user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects
     */
    findAllMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSentByUser(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Get all messages received by a user
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the messages objects
     */
    findAllMessagesReceivedByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesReceivedByUser(req.params.uid)
            .then(messages => res.json(messages));

    /**
     * Post the message sent by one user to another user
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user and auid1 representing the another user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message object
     */
    userMessagesUser = (req: Request, res: Response) =>
        MessageController.messageDao.userMessagesUser(req.body)
            .then(message => res.json(message));

    /**
     * Deleting the message sent by the user
     * @param {Request} req Represents request from client, including the
     * path parameters uid representing the user and mid representing the message
     * @param {Response} res Represents response to client, including including the
     * body formatted with delete status for the message
     */
    userDeletesMessage = (req: Request, res: Response) =>
        MessageController.messageDao.userDeletesMessage(req.params.uid, req.params.mid)
            .then(status => res.send(status));
};