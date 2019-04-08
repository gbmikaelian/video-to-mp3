import mongoose, { Schema } from 'mongoose';

const trackSchema = new Schema({
    trackName: {
        type: String,
        unique: true,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Track = mongoose.model('Track', trackSchema);

export default Track;