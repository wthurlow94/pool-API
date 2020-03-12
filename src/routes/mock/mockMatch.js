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


router.patch('/:matchId', (req,res) => {
	res.json(match.resultMatch(req.params.matchId, req.body.winnerId)).send();
	
});


router.get('/:matchId', (req, res) => {
  console.log("Get match" + req.params.userId);
  res.send("Get match" + req.params.userId);
});

export default router;

