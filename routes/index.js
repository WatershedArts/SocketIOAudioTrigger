var express = require('express');
var router = express.Router();
router.get('/', (req, res) => res.render('index'));

router.get('/controller', function(req, res, next) {
  res.render('controller', { title: 'Controller' });
});

router.get('/listener1', function(req, res, next) {
  res.render('listener1', { title: 'Listener 1' });
});

router.get('/listener2', function(req, res, next) {
  res.render('listener2', { title: 'Listener 2' });
});

module.exports = router;
