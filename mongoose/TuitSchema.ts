import mongoose, {Schema} from "mongoose";

/**
 * @typedef TuitSchema Represents a tuit schema in database
 * @property {string} tuit tuit description
 * @property {Date} postedOn tuit posted date
 * @property {User} postedBy tuit posted by user
 */
const TuitSchema = new mongoose.Schema({
    tuit: {type: String, required: true},
    postedBy: {type: Schema.Types.ObjectId, ref: "UserModel"},
    postedOn: {type: Date, default: Date.now}
}, {collection: 'tuits'});

export default TuitSchema;