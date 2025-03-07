const mongoose = require("mongoose");
const Schema = mongoose.Schema; 
const FavoriteSchema = new Schema({
    imgSrc: {
        type: String,
        require: [true, 'image must has src'],
        trim: true,
    },
    name: {
        type: String,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'dogAppUsers',
        required: true,
    }, 
});
module.exports = mongoose.model('favorites', FavoriteSchema);