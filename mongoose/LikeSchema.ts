import mongoose, {Schema} from "mongoose";
import Like from "../models/Like";

/**
 * @typedef LikeSchema Represents a liked schema in database
 * @property {Tuit} tuit liked tuit
 * @property {User} likedBy tuit liked by user
 */
const LikeSchema = new mongoose.Schema<Like>({
    tuit: {type: Schema.Types.ObjectId, ref: "TuitModel"},
    likedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
}, {collection: "likes"});

export default LikeSchema;