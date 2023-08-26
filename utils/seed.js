const connection = require('../config/connection');
const { User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // dropping existing users and thoughts
  await User.deleteMany({});

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

  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
