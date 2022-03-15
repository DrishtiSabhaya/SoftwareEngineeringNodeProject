import mongoose from "mongoose";
import User from "../models/User";
/**
 * @typedef UserSchema Represents a users schema in database
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
const UserSchema = new mongoose.Schema<User>({
    username: {type: String, required: true, default: `testusername${Date.now()}`},
    password: {type: String, required: true, default: `testpassword${Date.now()}`},
    firstName: String,
    lastName: String,
    email: {type: String, required: true, default: `testemail${Date.now()}`},
    profilePhoto: String,
    headerImage: String,
    accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
    maritalStatus: {type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED']},
    biography: String,
    dateOfBirth: Date,
    location: {
        latitude: {type: Number, default: 0.0},
        longitude: {type: Number, default: 0.0},
    },
    salary: {type: Number, default: 50000}
}, {collection: 'users'});

export default UserSchema;