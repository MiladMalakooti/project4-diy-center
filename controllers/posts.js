const Project = require("../models/posts");
const User = require("../models/user");

module.exports = {
  create,
  show,
  userPosts
};

async function create(req, res) {
  
  const post = new Post(req.body);
  try {
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json(err);
  }
}

async function show(req, res) {
  console.log("user id: ", req.user)
  const posts = await Post.find({}).sort({ createdAt: -1 });
  res.json(posts);
}

async function userPosts(req, res) {
  console.log(req.params.username)
  User.findOne({user_name: req.params.username}, async function(err, user){
    const posts = await Post.find({ user: user.id }).sort({
      createdAt: -1
    });
    res.json(posts);
  })
}