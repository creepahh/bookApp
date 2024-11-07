const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register 
router.post('/register', async (req, res) => {
    try {
        const newUser = new User({ username: req.body.username });
        await User.register(newUser, req.body.password);
        res.redirect('/login');
    } catch (error) {
        res.send(error.message);
    }
});

// Login 
router.post('/login', passport.authenticate('local', {
    successRedirect: '/books',
    failureRedirect: '/login'
}));

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}


module.exports = router;


