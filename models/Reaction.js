const { Schema, model, Types } = require('mongoose');

const ReactionSchema = new Schema(
    {
        reactionId: {
            type: Types.ObjectId,
            default: Types.ObjectId
        },
        reactionBody: {
            type: 'String',
            required: true,
            match: '/^.{0,280}$/'
            // 280 characters maximum
        },
        username: {
            type: 'String',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: true
        },
        reactions: []
    }
);


module.exports = Reaction;