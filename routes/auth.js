const express = require('express');
const userAuthentication = require('./../Controller/userAuthentication');
const router = express.Router();

// router.post('/login',userAuthentication.login);
router.post('/signup',userAuthentication.signup);

module.exports = router;