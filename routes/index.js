var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Index' });
});

/* GET home page. */
router.get('/shepard', function(req, res, next) {
  res.render('shepard', { title: 'Shepard' });
});

/* GET home page. */
router.get('/sheep', function(req, res, next) {
  res.render('sheep', { title: 'Sheep' });
});

/* GET home page. */
router.get('/wolf', function(req, res, next) {
  res.render('wolf', { title: 'Wolf' });
});

module.exports = router;
