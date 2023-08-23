const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // use getter method to format timestamp
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema], //Array of nested documents created w reactionSchema
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `responses` that gets the amount of response per video
thoughtSchema
  .virtual('reactionCount')
  .get(function () {return this.reactions.length;});
  //.set('toObject', { getters: true });

// Initialize our Video model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
