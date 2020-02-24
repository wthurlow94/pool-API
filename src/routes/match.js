import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  console.log("Get match");
  res.send("Get match");
});


//create new match
router.post('/', (req,res) => {
	
});


//result a match
router.patch('/:matchId', (req,res) => {

});

router.get('/:matchId', (req, res) => {
  console.log("Get match" + req.params.userId);
  res.send("Get match" + req.params.userId);
});

export default router;
