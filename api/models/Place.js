const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    owener: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String,
    address: String,
    photos: [String],
    description: String,
    perks: String,
    extraInfo: String,
    checkin: Number,
    checkout: Number,
    maxGuests: Number,
});

const PlaceModel = mongoose.model('Place', PplaceSchema);

module.exports = PlaceModel;