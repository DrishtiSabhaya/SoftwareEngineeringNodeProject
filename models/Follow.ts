/**
 * @file Declares Follow data type representing an account
 * on the platform.
 */
import User from "./User";

/**
 * @typedef Follow Represents a follow
 * @property {User} userFollowed users followed by a user
 * @property {User} userFollowing user following users
 */
export default class Follow {
    private userFollowed: User | null = null;
    private userFollowing: User | null = null;
}