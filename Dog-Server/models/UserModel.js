const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
const UserSchema = new Schema({
    name: {
        type: String,
        require: [true, 'A user must have name'],
        trim: true,
    },
    profilePic: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'favorites',
    }, 
});
module.exports = mongoose.model('dogAppUsers', UserSchema);