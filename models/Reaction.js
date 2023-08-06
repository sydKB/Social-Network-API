const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      // use getter method to format timestamp
    },
  },
  // {
  //   toJSON: {
  //     getters: true,
  //   },
  //   id: false,
  // }
);

// reactionSchema.set('toObject', { getters: true });

module.exports = reactionSchema;
