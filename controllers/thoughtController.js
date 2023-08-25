const { Thought, User } = require('../models');

async function getThoughts(req, res) {
  try {
    const allThoughts = await Thought.find();
    res.json(allThoughts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function getSingleThought(req, res) {
  try {
    const thought = await Thought.findOne({ _id: req.params.thoughtId });
    if (thought) {
      res.json(thought)
    } else {
      res.status(404).json('No thought with that ID')
    }
  }
  catch(err) {  
    console.log(err);
    res.status(500).json(err);
  }
}

// create a new thought
async function createThought(req, res) {
  try {
    const newThought = await Thought.create(req.body);

    if (newThought) {
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: newThought._id } },
        { new: true }
      );
      if (user) {
        res.status(200).json('Created the thought', newThought);      
      } else {
        res.status(404).json('Thought created, but found no user with that ID');
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function updateThought(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    
    if (thought) {
      res.json(thought);
    } else {
      res.status(404).json('No thought with this id!');
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function deleteThought(req, res) {
  try {
    const newThought = await Thought.findOneAndDelete(req.body);

    if (newThought) {
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $pull: { thoughts: newThought._id } },
        { new: true }  
      );
      if (user) {
        res.json('Thought successfully deleted!', newThought);
      } else {
        res.status(404).json('No user with this id!');
      }  
    } else {
      res.status(404).json('No thought with this id!' );
    }

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

// Add a thought reaction
async function addThoughtReaction(req, res) {
  try { 
    const reaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
    if(reaction) {
      res.status(200).json('Reaction added!', reaction)
      res.json(reaction)
    } else {
      res.status(404).json('Failed to add reaction!')
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
  
// Remove thought reaction
async function removeThoughtReaction(req, res) {
  try {
    const reaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
    if (reaction) {
      res.json(reaction);
      res.status(200).json('Reaction removed!')
    } else { 
      res.status(404).json('Failed to remove reaction!' )
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

module.exports = {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addThoughtReaction,
  removeThoughtReaction,
};
