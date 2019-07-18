var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model
const UserSchema = new Schema({
    name: { type: String },
    username: {
        type: String,
        index: true,
        unique: true
    },
    email: {
        type: String,
        index: true,
        unique: true
    },
    password: { type: String, select: false },
    active: { type: Boolean }
});

module.exports = mongoose.model('User', UserSchema);