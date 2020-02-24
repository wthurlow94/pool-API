import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  console.log("Get Users");
  res.send("Get Users");
});

//create new user
router.post('/', (req,res) => {
	// step one
	// Check to see if the username already exists
	// if it does then return an error message as a response "Username already exists"

	// step two
	// Generate Insert SQL - use stored Proc?
	
	// step three - on creation completion - respond with userID

	res.send(req.body.username +" "+req.body.password);
});



router.get('/:userId', (req, res) => {
  console.log("Get user" + req.params.userId);
  res.send("Get user" + req.params.userId);
});

export default router;
