/**
 * @file Declares Like data type representing an account
 * on the platform.
 */
import Tuit from "./Tuit";
import User from "./User";

/**
 * @typedef Like Represents a liked tuit
 * @property {Tuit} tuit liked tuit
 * @property {User} likedBy tuit liked by user
 */
export default interface Like {
    tuit: Tuit,
    likedBy: User
};