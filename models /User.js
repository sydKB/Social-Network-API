const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Invalid email format"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { 
    toJSON: {
      virtuals: true, // property added to query but not explicity added to model
    },
    id: false,
  }
);

userSchema
  .virtual('friendCount') 
  .get(function () {
    return this.friends.length;
  });

// Initialize User model
const User = model('User', userSchema);

module.exports = User;
