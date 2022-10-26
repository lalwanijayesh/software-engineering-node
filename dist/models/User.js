"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Declares User data type representing the end user.
 */
const AccountType_1 = __importDefault(require("./AccountType"));
const MaritalStatus_1 = __importDefault(require("./MaritalStatus"));
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
class User {
    constructor() {
        this.username = '';
        this.password = '';
        this.firstName = null;
        this.lastName = null;
        this.email = '';
        this.profilePhoto = null;
        this.headerImage = null;
        this.accountType = AccountType_1.default.Personal;
        this.maritalStatus = MaritalStatus_1.default.Single;
        this.biography = null;
        this.dateOfBirth = null;
        this.joined = new Date();
        this.location = null;
    }
}
exports.default = User;
;
//# sourceMappingURL=User.js.map