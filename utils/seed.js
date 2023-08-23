const connection = require('../config/connection');
const { User, Thought } = require('../models');
//const { getRandomUsername, getRandomThoughts, getReactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // dropping existing users and thoughts
  await User.deleteMany({});
  //await Thought.deleteMany({});

  // empty array holding usernames
  const users = [
    {
      username: "sydKB",
      email: "sydneykb11@gmail.com",
    },
    {
      username: "sydknee",
      email: "sydknee@joint.com",
    },
  ]

  await User.collection.insertMany(users);

  // const username = getRandomUsername(10);
  // const thoughts = getRandomThoughts(10);
  // const reactions = getReactions(5);

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

  

  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
