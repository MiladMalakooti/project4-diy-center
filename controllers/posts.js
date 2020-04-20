const Post = require("../models/posts");
const User = require("../models/user");

module.exports = {
  create,
  show,
  userPosts,
  likePost,
  deleteComment,
  addCommentOnPost,
  updatePost,
  deletePost
};

async function show(req, res) {
  const posts = await Post.find({}).populate('user').sort({createdAt: -1});// find all user's post and sort it
  res.json(posts);
}

async function create(req, res) {
  const post = new Post(req.body);
  try {
    User.findOne({_id: post.user}, function(err, user){
      user.posts.unshift(post.id);
      user.save();
    });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(400).json(err);
  }
}


async function userPosts(req, res) {
  const user = await User.findOne({ user_name: req.params.username}).populate("post");
  res.json(user);
  // console.log(req.params.username)
  // User.findOne({user_name: req.params.username}, async function(err, user){
    // const posts = await Post.find({ user: user.id }).sort({
    //   createdAt: -1
}

async function likePost(req, res){
  Post.findOne({_id:req.postId}, 
    async function(err, post){
    if (post.likes.includes(req.body.userCopy.email)){
        post.likes.splice(req.body.userCopy.email, 1)
    } else { post.likes.push(req.body.userCopy.email);
    }
    post.save();
    res.json(post);
  })
}

async function addCommentOnPost(req, res){
  Post.findOne({_id: req.body.postInfo._id}, 
    async function(err, post){
    post.comments.push({comment: req.body.comment, 
    user_name: req.userInfo.user_name,
    user_id: req.body.userInfo._id });
    
    await post.save();
    res.json(post)
  });
}

async function deleteComment(req, res){
  Post.findOne({_id: req.body.post._id}, 
    async function(err, post){
    post.comments.forEach((c, idx) => {
      if(c._id == req.body.comment._id){
        post.comment[idx].remove();
      }
    });
    await post.save();
    res.json(post);
  })
}

async function deletePost(req, res) {
  Post.findOne({_id: req.body._id}, function(err, post) { 
    User.findOne({_id: post.user[0]}, function(err, user) {
      const posts = user.posts.filter(p => { return p != req.body._id})
      user.posts=posts;
      user.save() })

      post.remove();
      post.save();
      res.json(post)
    });
}


async function updatePost(req, res){
  Post.findOne({ _id: req.body._id }, function(res, post) {
    post.url = req.body.url;
    post.caption = req.body.caption;
    post.save()
    res.json(post);
  })
}