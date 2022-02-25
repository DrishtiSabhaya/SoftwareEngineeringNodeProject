/**
 * @file Declares User data type representing an account
 * on the platform
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

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
export default class User {
    private username: string = '';
    private password: string = '';
    private firstName: string | null = null;
    private lastName: string | null = null;
    private email: string = '';
    private profilePhoto: string | null = null;
    private headerImage: string | null = null;
    private accountType: AccountType = AccountType.Personal;
    private maritalStatus: MaritalStatus = MaritalStatus.Single;
    private biography: string | null = null;
    private dateOfBirth: Date | null = null;
    private joined: Date = new Date();
    private location: Location | null = null;
}
