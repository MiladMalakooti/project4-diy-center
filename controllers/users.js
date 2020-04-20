const User = require('../models/user');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  getAllUsers,
  getUserFromServer,
  getNotifications,
  updateProfile
};

async function signup(req, res) {
  const user = new User(req.body);
  try {
    await user.save();
    const token = createJWT(user);
    res.json({ token });
  } catch (err) {
    // possible a duplicate
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

async function getAllUsers(req, res) {
 const users = await User.find({}).populate('posts');
 res.json(users);
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user},
    SECRET,
    {expiresIn: '24h'}
  );
}

async function getUserFromServer(req, res) {
  User.findById({ _id: req.user._id }, async function(err, user) {
    await res.json(user);
  });
}

async function getNotifications(req, res) {
  User.findById({ _id: req.user._id }, async function(err, user) {
    await res.json(user.notifications);
  });
}

async function updateProfile(req, res) {
  User.findOne({ _id: req.user._id }, async function(err, user) {
    if (req.body.instagram) user.instagram = req.body.instagram;
    if (req.body.pinterest) user.pinterest = req.body.pinterest;
    if (req.body.pinterest) user.pinterest = req.body.pinterest;
    if (req.body.bio) user.bio = req.body.bio;
    await user.save();
  });
}
