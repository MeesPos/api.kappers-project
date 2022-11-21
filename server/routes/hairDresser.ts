import { Router, Request, Response } from 'express';
var router = Router();


router.get('/', function(req: Request, res: Response, next) {
  res.send('Marjolein knip knip');
});

export default router;
