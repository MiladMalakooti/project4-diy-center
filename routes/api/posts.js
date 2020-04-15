const express = require('express');
const router = express.Router();
const postsCtrl = require('../../controllers/posts');

/*---------- Public Routes ----------*/
router.get('/', postsCtrl.show);
router.get('/:username', postsCtrl.userPosts);
router.post('/', postsCtrl.create);


/*---------- Protected Routes ----------*/
module.exports = router;