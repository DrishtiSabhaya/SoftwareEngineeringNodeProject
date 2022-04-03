/**
 * @file Declares DisLike data type representing an account
 * on the platform.
 */
import Tuit from "./Tuit";
import User from "./User";

/**
 * @typedef DisLike Represents a disliked tuit
 * @property {Tuit} tuit disliked tuit
 * @property {User} likedBy tuit disliked by user
 */
export default interface Dislike {
    tuit: Tuit,
    dislikedBy: User
};