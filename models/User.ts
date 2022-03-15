/**
 * @file Declares User data type representing an account
 * on the platform
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";
import mongoose from "mongoose";

/**
 * @typedef User Represents a personal account
 * @property {string} username unique account name
 * @property {string} password users account password
 * @property {string} firstName users first name
 * @property {string} lastName users last name
 * @property {string} email users email
 * @property {string} profilePhoto users profile photo
 * @property {string} headerImage users image
 * @property {string} biography users biography
 * @property {Date}   dateOfBirth users date of birth
 * @property {AccountType} accountType users account type
 * @property {MaritalStatus} maritalStatus users marital status
 */
export default interface User {
    _id?: mongoose.Schema.Types.ObjectId,
    username: string,
    password: string,
    email: string,
    firstName?: string,
    lastName?: string,
    profilePhoto?: string,
    headerImage?: string,
    biography?: string,
    dateOfBirth?: Date,
    accountType?: AccountType,
    maritalStatus?: MaritalStatus,
    location?: Location,
    salary?: number
};
