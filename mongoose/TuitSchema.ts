import mongoose, {Schema} from "mongoose";
import Tuit from "../models/Tuit";
/**
 * @typedef TuitSchema Represents a tuit schema in database
 * @property {string} tuit tuit description
 * @property {Date} postedOn tuit posted date
 * @property {User} postedBy tuit posted by user
 */
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now},
    image: String,
    youtube: String,
    avatarLogo: String,
    imageOverlay: String,
    stats: {
        replies: Number,
        retuits: Number,
        likes: Number
    }
}, {collection: 'tuits'});

export default TuitSchema;