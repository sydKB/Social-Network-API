const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomUsername, getRandomThoughts, getReactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  await Thought.deleteMany({});
  await User.deleteMany({});

  const usernames = getRandomUsername(10);
  const thoughts = getRandomThoughts(10);
  const reactions = getReactions(5);

  // for (let i = 0; i < 20; i++) {
  //   const username = getRandomUsername();
  //   users.push({
  //     username,
  //     age: Math.floor(Math.random() * (99 - 18 + 1) + 18),
  //   });
  // }

  // await User.collection.insertMany(usernames);
  // await Thought.collection.insertMany(thoughts);

  // loop through the saved thought, for each thought we need to generate a reaction and insert the reactions
  //console.table(usernames);
  console.table(thoughts);
  console.table(reactions);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
