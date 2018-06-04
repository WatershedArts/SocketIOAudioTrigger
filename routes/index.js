var express = require('express');
var router = express.Router();
router.get('/', (req, res) => res.render('index'));

router.get('/shepard', function(req, res, next) {
  res.render('shepard', { title: 'Shepard' });
});

router.get('/flock', function(req, res, next) {
  res.render('flock', { title: 'Flock' });
});

router.get('/wolf', function(req, res, next) {
  res.render('wolf', { title: 'Wolf' });
});

router.get('/dev', function(req, res, next) {
  res.render('dev', { title: 'Dev Page' });
});

module.exports = router;
