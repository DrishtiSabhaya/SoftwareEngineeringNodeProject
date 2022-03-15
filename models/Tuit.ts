/**
 * @file Declares Tuit data type representing an account
 * on the platform.
 */
import User from "./User";
import Stats from "./Stats";
/**
 * @typedef Tuit Represents a tuit
 * @property {string} tuit tuit description
 * @property {Date} postedOn tuit posted date
 * @property {User} postedBy tuit posted by user
 */

export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
    image?: String,
    youtube?: String,
    avatarLogo?: String,
    imageOverlay?: String,
    stats: Stats
};
