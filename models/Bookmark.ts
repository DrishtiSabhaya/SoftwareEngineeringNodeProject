/**
 * @file Declares Bookmark data type representing an account
 * on the platform.
 */
import Tuit from "./Tuit";
import User from "./User";

/**
 * @typedef Bookmark Represents a bookmarked tuit
 * @property {Tuit} bookmarkedTuit bookmarked tuit
 * @property {User} bookmarkedBy tuit bookmarked by user
 */
export default interface Bookmark {
    bookmarkedTuit: Tuit,
    bookmarkedBy: User
};