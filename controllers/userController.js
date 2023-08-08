const User = require('../models/User');


async function getUsers(req, res) {
  try {
    const users = await User.find()
    res.json(users);
  }
  catch (err) {
    res.status(500).json(err);
  }
};


async function getSingleUser(req, res) {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'No user with that ID' })
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

// create a new user
async function createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
}

// update a user given its id
async function updateUser(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { new: true }
    );
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'No user with this id!' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.userId });
    if (user) {
      res.json({ message: 'User successfully deleted!' });
    } else {
      res.status(404).json({ message: 'No user with this id!' });
    }
  } catch (err) {
    res.status(500).json(err);
  }
}

function addFriend(req, res) {
  User.findOne({ _id: req.params.userId })

}

function deleteFriend(req, res) {
  User.findOne({ _id: req.params.userId })

}

module.exports = {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend
};
