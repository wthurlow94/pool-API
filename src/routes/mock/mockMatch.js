import { Router } from 'express';
import match from '../../mockdata/mockMatch';
const router = Router();

router.get('/', (req, res) => {

  res.send(match.matches());
});


router.post('/', (req, res) => {
	//todo: token check
	res.json(match.addMatch(req.body.p1, req.body.p2)).send();

});


router.get('/:userId', (req, res) => {
  console.log("Get user" + req.params.userId);
  res.send("Get user" + req.params.userId);
});

export default router;

