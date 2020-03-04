import { Router } from 'express';
import crypto from 'crypto';
import user from '../../mockdata/mockUser';
const router = Router();


router.post('/', (req, res) => {
	

// Find user by req.body.email
	var user2 = {};
	console.log(req.body.email);
	user2 = user.findUserByMail(req.body.email);
	console.log(user2);
	if (user2 == {}) {
		res.status(400).send({});
		return
	}

	let passwordFields = user2.password.split('$');
	let salt = passwordFields[0];

	let newHash = crypto.createHmac('sha512',salt).update(req.body.password).digest("base64");

	if (newHash === passwordFields[1]) {
		console.log("successful login");
		res.status(200).send(user2);
	} else {
		res.status(400).send({});
	
	}	

});


router.get('/:userId', (req, res) => {
  console.log("Get user" + req.params.userId);
  res.send("Get user" + req.params.userId);
});

export default router;

