import mongoose, {Schema} from "mongoose";
import Message from "../models/Message";

/**
 * @typedef MessageSchema Represents a message schema in database
 * @property {string} message contents of message
 * @property {User} to User receiving the message
 * @property {User} from User sending the message
 * @property {Date} sentOn Date the message was sent
 */
const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String, required: true},
    to: {type: Schema.Types.ObjectId, ref: "UserModel"},
    from: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now}
}, {collection: "messages"});

export default MessageSchema;