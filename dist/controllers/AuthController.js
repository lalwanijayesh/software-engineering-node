"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDao_1 = __importDefault(require("../daos/UserDao"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
class AuthController {
    constructor() {
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const newUser = req.body;
            const password = newUser.password;
            const hash = yield bcrypt_1.default.hash(password, saltRounds);
            newUser.password = hash;
            const existingUser = yield AuthController.userDao
                .findUserByUsername(newUser.username);
            if (existingUser) {
                res.sendStatus(403);
            }
            else {
                const insertedUser = yield AuthController.userDao
                    .createUser(newUser);
                insertedUser.password = '';
                req.session['profile'] = insertedUser;
                res.json(insertedUser);
            }
        });
    }
}
exports.default = AuthController;
AuthController.userDao = UserDao_1.default.getInstance();
AuthController.authController = null;
AuthController.getInstance = (app) => {
    if (AuthController.authController == null) {
        AuthController.authController = new AuthController();
        app.post('/auth/signup', AuthController.authController.signup);
    }
    return AuthController.authController;
};
//# sourceMappingURL=AuthController.js.map