import mongoose, {Schema} from "mongoose";
import Dislike from "../models/Dislike";

/**
 * @typedef LikeSchema Represents a liked schema in database
 * @property {Tuit} tuit liked tuit
 * @property {User} likedBy tuit liked by user
 */
const DislikeSchema = new mongoose.Schema<Dislike>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    dislikedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "dislikes"});

export default DislikeSchema;