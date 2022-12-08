const mongoose = require('mongoose')
const Schema = mongoose.Schema

const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true },
        userName: {type: String, required: true},
        published: {type: Boolean, required: true},
        likes: {type: Number},
        dislikes: {type: Number},
        listens: {type: Number},
        publishedDate: {type: String},
        comments: {type: [{user: String, comment: String}]},
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)