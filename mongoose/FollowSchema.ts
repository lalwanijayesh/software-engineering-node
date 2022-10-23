import mongoose from "mongoose";

const FollowSchema = new mongoose.Schema({
    userFollowed: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    userFollowing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    }
}, {collection: 'follows'});

export default FollowSchema;