const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            match: '/^.{1,380}$/',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'reaction',
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)


module.exports = Thought