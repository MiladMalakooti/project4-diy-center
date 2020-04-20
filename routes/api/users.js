const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const usersCtrl = require('../../controllers/users');


router.post('/signup', usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.post('/users', usersCtrl.getAllUsers);
router.use(require('../../config/auth'));
router.get('/user', checkAuth, usersCtrl.getUserFromServer);
router.post('/updateprofile', checkAuth, usersCtrl.updateProfile);

function checkAuth(req, res, next) {
    if (req.user) {
      return next();
    }
    return res.status(401).json({ msg: "Not Authorized" });
  }
module.exports = router;
