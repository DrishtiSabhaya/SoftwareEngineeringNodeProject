import mongoose from "mongoose";

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
const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    email: String,
    profilePhoto: String,
    headerImage: String,
    accountType: {type: String, default: 'PERSONAL', enum: ['PERSONAL', 'ACADEMIC', 'PROFESSIONAL']},
    maritalStatus: {type: String, default: 'SINGLE', enum: ['MARRIED', 'SINGLE', 'WIDOWED']},
    biography: String,
    dateOfBirth: Date,
    joined: {type: Date, default: Date.now},
    location: {
        latitude: {type: Number, default: 0.0},
        longitude: {type: Number, default: 0.0},
    }
}, {collection: 'users'});

export default UserSchema;