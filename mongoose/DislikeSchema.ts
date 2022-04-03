import mongoose, {Schema} from "mongoose";
import Dislike from "../models/Dislike";

/**
 * @typedef DisLikeSchema Represents a disliked schema in database
 * @property {Tuit} tuit disliked tuit
 * @property {User} likedBy tuit disliked by user
 */
const DislikeSchema = new mongoose.Schema<Dislike>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "dislikes"});

export default DislikeSchema;