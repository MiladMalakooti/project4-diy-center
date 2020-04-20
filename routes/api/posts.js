const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/posts');


router.post('/', postsCtrl.create);
router.use(require('../../config/auth'));    //
router.post('/create-post', postsCtrl.create); //
router.get('/', checkAuth, postsCtrl.show); //
router.get('/:username', checkAuth, postsCtrl.userPosts); //
router.post('/likebtn', postsCtrl.likePost); //
router.post('/createcomment', postsCtrl.addCommentOnPost); //
router.post('/deletecomment', postsCtrl.deleteComment); //
router.post('/deletepost', postsCtrl.deletePost); //
router.post('/updatepost', postsCtrl.updatePost); //



function checkAuth(req, res, next) {
    if (req.user){
        return next();
    }
    return res.status(401).json({msg: 'Not Authorized'});
}

module.exports = router;