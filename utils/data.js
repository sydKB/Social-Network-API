const usernames = [
  'Aaran',
  'Aaren',
  'Aarez',
  'Aarman',
  'Aaron',
  'Aaron-James',
  'Aarron',
  'Aaryan',
  'Aaryn',
  'Aayan',
  'Aazaan',
  'Abaan',
  'Abbas',
  'Abdallah',
  'Abdalroof',
  'Abdihakim',
  'Abdirahman',
  'Abdisalam',
  'Abdul',
  'Abdul-Aziz',
  'Abdulbasir',
  'Abdulkadir',
  'Abdulkarem',
  'Ze',
  'Zechariah',
  'Zeek',
  'Zeeshan',
  'Zeid',
  'Zein',
  'Zen',
  'Zendel',
  'Zenith',
  'Zennon',
  'Zeph',
  'Zerah',
  'Zhen',
  'Zhi',
  'Zhong',
  'Zhuo',
  'Zi',
  'Zidane',
  'Zijie',
  'Zinedine',
  'Zion',
  'Zishan',
  'Ziya',
  'Ziyaan',
  'Zohaib',
  'Zohair',
  'Zoubaeir',
  'Zubair',
  'Zubayr',
  'Zuriel',
  ``,
];

const thoughts = [
  'I like ice cream',
  'iPhone review',
  'how-to video',
  'video essay on the history of video games',
  'How to make money on the App Store',
  'Learn NextJS in five minutes (Not clickbate)',
  'Movie trailer',
  'Hello world',
  'Another possible solution to the algorithm',
  'Apology video',
  'Submission for startup pitch',
];

const possibleReactions = [
  'I disagree!',
  'I tried your algorithm, here were the results',
  'This was awesome',
  'Thank you for the great content',
  'Please check out my video response',
  'Like and subscribe to my channel please',
  'Reply: The side effects of in app purchases on digital marketplaces',
];

const friends = [
  'syd',
  'jay',
  'aja',
  'gray',
];

const emails = [
  'blah@blah.com',
  'mouse@mouse.com',
  'key@board.com'
]

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random username
const getRandomUsername = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      username: getRandomArrItem(usernames),
      email: getRandomArrItem(emails),
      thoughts: getRandomArrItem(thoughts),
      friends: [...getFriends(3)],
    });
  }
  return results;
}

// Function to generate random thoughts that we can add to the database. Includes reaction.
const getRandomThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomArrItem(thoughts),
      createdAt: "today",
      username: getRandomArrItem(usernames),
      reactions: [...getReactions(3)],
    });
  }
  return results;
};

// Create the reaction that will be added to each video
const getReactions = (int) => {
  if (int === 1) {
    return getRandomArrItem(possibleReactions);
  }
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionId: "22",
      reactionBody: getRandomArrItem(possibleReactions),
      username: getRandomUsername(),
      createdAt: "today",
    });
  }
  return results;
};

//TODO: write friends
const getFriends = (int) => {
  if (int === 1) {
    return getRandomArrItem(friends);
  }
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      friends: getRandomArrItem(friends),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { 
  getRandomUsername, 
  getRandomThoughts, 
  getReactions 
};
