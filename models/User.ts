/**
 * @file Declares User data type representing the end user.
 */
import AccountType from "./AccountType";
import MaritalStatus from "./MaritalStatus";
import Location from "./Location";

/**
 * @typedef User Represents the end user.
 * @property {string} username username of the user
 * @property {string} password password set by the user
 * @property {string} firstName first name of the user
 * @property {string} lastName last name of the user
 * @property {string} email user's email address
 * @property {string} profilePhoto user's profile photo
 * @property {AccountType} accountType the type of account
 * @property {MaritalStatus} maritalStatus user's marital status
 * @property {string} biography short bio of the user
 * @property {Date} dateOfBirth user's birth date
 * @property {Date} joined date when user starting using Tuiter
 * @property {Location} location location of the user
 */
export default class User {
    username: string = '';
    password: string = '';
    firstName: string | null = null;
    lastName: string | null = null;
    email: string = '';
    profilePhoto: string | null = null;
    headerImage: string | null = null;
    accountType: AccountType = AccountType.Personal;
    maritalStatus: MaritalStatus = MaritalStatus.Single;
    biography: string | null = null;
    dateOfBirth: Date | null = null;
    joined: Date = new Date();
    location: Location | null = null;
};