import express from 'express';
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('hello world')
});

export default router;
