const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const formatDate = require('..utils/dateFormat.js');

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
      get: (date) => formatDate(date),
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
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `responses` that gets the amount of response per video
thoughtSchema
  .virtual('reactionCount')
  .get(function () {return this.reactions.length;});

// Initialize our Thought model
const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
