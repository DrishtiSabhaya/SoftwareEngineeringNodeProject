/**
 * @file Declares Message data type representing a private message
 * between two users
 */
import User from "./User";

/**
 * @typedef Message Represents a private message
 * @property {string} message contents of message
 * @property {User} to User receiving the message
 * @property {User} from User sending the message
 * @property {Date} sentOn Date the message was sent
 */
export default interface Message {
    message: string,
    to: User,
    from: User,
    sentOn: Date,
};