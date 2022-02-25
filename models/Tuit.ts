/**
 * @file Declares Tuit data type representing an account
 * on the platform.
 */
import User from "./User";

/**
 * @typedef Tuit Represents a tuit
 * @property {string} tuit tuit description
 * @property {Date} postedOn tuit posted date
 * @property {User} postedBy tuit posted by user
 */
export default class Tuit {
    private tuit: string = '';
    private postedOn?: Date;
    private postedBy: User | null = null;
}
