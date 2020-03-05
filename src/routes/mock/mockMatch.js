import { Router } from 'express';
import match from '../../mockdata/mockMatch';
const router = Router();

router.get('/', (req, res) => {

  res.send(match.matches());
});


router.post('/', (req, res) => {
	
	res.send(match.addMatch());

});


router.get('/:userId', (req, res) => {
  console.log("Get user" + req.params.userId);
  res.send("Get user" + req.params.userId);
});

export default router;

