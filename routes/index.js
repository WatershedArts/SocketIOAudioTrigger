var express = require('express');
var router = express.Router();
router.get('/', (req, res) => res.render('index'));

router.get('/shepard', function(req, res, next) {
  res.render('shepard', { title: 'Shepard' });
});

router.get('/flock', function(req, res, next) {
  res.render('flock', { title: 'flock' });
});

router.get('/wolf', function(req, res, next) {
  res.render('wolf', { title: 'Wolf' });
});

module.exports = router;
