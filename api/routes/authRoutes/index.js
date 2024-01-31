const express = require('express');
const { login, signUp } = require('../../controllers/userControllers');
const passport = require('passport');
const { checkError } = require('../../Helpers/ErrCheckMiddleWare');

const router = express.Router()

router.post('/', passport.authenticate('local'), checkError, login)

router.post('/signup', checkError, signUp)

module.exports = router;