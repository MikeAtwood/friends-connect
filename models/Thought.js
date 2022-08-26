const { Schema, model, Types } = require('mongoose');
const { format_date } = require('../utils/dateFormat');


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
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
);

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

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);


module.exports = Thought