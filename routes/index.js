var express = require('express');

var authRoutes = require('./auth');

var router = express.Router();

router.use('/auth', authRoutes);

router.get('/', function(req, res) {
  if (req.session.user) {
    res.render('topics');
  } else {
    res.render('login');
  }
});

router.get('/unauthorized', function(req, res) {
  if (req.session.user) {
    res.redirect('/');
  } else {
    res.render('unauthorized');
  }
});

// All other routes require auth
router.use(function(req, res, next) {
  if (!req.session.user) {
    return res.render('unauthorized');
  }
  next();
});

router.get('/topics', function(req, res) {
  res.render('topics');
});

router.get('/discussed', function(req, res) {
  res.render('discussed');
});

module.exports = router;
