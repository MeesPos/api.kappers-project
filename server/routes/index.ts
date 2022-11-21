import express, {Express, Request, Response} from 'express';
var router = express.Router();


/* GET home page. */
router.get('/', function(req: Request, res: Response, next) {
  res.send('hello world')
});

export default router;
