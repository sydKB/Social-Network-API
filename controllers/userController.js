const { User } = require('../models ');

// display all users
async function getUsers(req, res) {
  try {
    const users = await User.find()
      .populate("thoughts")
      .populate("friends");
    res.json(users);
  }
  catch (err) {
    res.status(500).json(err);
  }
};

// display just one user
async function getSingleUser(req, res) {
  try {
    const user = await User.findOne(
      { _id: req.params.userId })
      .populate("thoughts")
      .populate("friends");
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
      { $set: {username: req.body.username }},
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

// delete a user given its id
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

// add a friend by connecting existing users to each other
async function addFriend(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    );
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'No user with this id!' });
    }
    console.log("yas");
  }
  catch (err) {
    res.status(500).json(err)
  }
}

// delete a users's friend
async function deleteFriend(req, res) {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: {friends: req.params.friendId } },
      { runValidators: true, new: true }
      );
  
      if (user) {
        res.json(user);
        res.json({ message: 'User successfully deleted!' });
      } else {
        res.status(404).json({ message: 'No user with this id!' });
      }
  }
  catch (err) {
    res.status(500).json(err)
  }
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
