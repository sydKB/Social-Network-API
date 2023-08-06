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
      res.status(404).json({ message: 'No thought with that ID' })
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
    const thought = await Thought.create(req.body);
    res.json(thought);
    
    // const user = await User.findOneAndUpdate(
    //   { _id: req.body.userId },
    //   { $addToSet: { thoughts: thought._id } },
    //   { new: true }
    // );
    
    // if (user) {
    //   res.json('Created the thought 🎉');      
    // } else {
    //   res.status(404).json({
    //     message: 'Thought created, but found no user with that ID',
    //   });
    // }
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
      { new: true }
    );
    
    if (thought) {
      res.json(thought);
    } else {
      res.status(404).json({ message: 'No thought with this id!' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}

async function deleteThought(req, res) {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

    if (thought) {
      res.json(thought);
      // const user = await User.findOneAndUpdate(
      //   { thoughts: req.params.thoughtId },
      //   { $pull: { thoughts: req.params.thoughtId } },
      //   { new: true }  
      // );
    } else {
      res.status(404).json({ message: 'No thought with this id!' });
    }

    // if (user) {
    //   res.json({ message: 'Thought successfully deleted!' });
    // } else {
    //   res.status(404).json({ message: 'Thought created but no user with this id!' });
    // }
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
      res.status(200).json({ message: 'Reaction added!', reaction })
      res.json(reaction)
    } else {
      res.status(404).json({ message: 'Failed to add reaction!' })
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
      res.status(200).json({ message: 'Reaction removed!' })
    } else { 
      res.status(404).json({ message: 'Failed to remove reaction!' })
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
