import User from "./User";

export default class Message {
    message: String | '' = '';
    from: User | null = null;
    to: User | null = null;
    sentOn: Date | null = new Date();
}