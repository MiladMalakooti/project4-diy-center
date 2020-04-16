const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/posts');

/*---------- Public Routes ----------*/
router.post('/', postsCtrl.create);


/*---------- Protected Routes ----------*/
router.use(require("../../config/auth"));

router.get("/", checkAuth, postsCtrl.show);
router.get("/:username", checkAuth, postsCtrl.userPosts);

router.post("/likebtn", postsCtrl.likePost);
router.post("/createcomment", postsCtrl.addCommentOnPost);
router.post("/deletecomment", postsCtrl.deleteComment);
router.post("/deletepost", postsCtrl.deletePost);
router.post('/updatepost', postsCtrl.updatePost);



function checkAuth(req, res, next) {
    if (req.user){
        return next();
    }
    return res.status(401).json({msg: " Not Allowed "});
}

module.exports = router;