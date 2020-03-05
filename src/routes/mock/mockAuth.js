import { Router } from 'express';
import crypto from 'crypto';
import mockUser from '../../mockdata/mockUser';
const router = Router();


router.post('/', (req, res) => {
	

// Find user by req.body.email
	
	
	var userArr = mockUser.findUserByMail(req.body.email);
	if (userArr.length < 1) {
		res.status(404).send({})
                console.log("successful login");
	} else {
		let user = userArr[0];
		let passwordFields = user.password.split('$');
		let salt = passwordFields[0];

		let newHash = crypto.createHmac('sha512',salt).update(req.body.password).digest("base64");

		if (newHash === passwordFields[1]) {
			console.log("successful login");
			res.status(200).send(user);
		} else {
			res.status(400).send({});	
		}	
	}

});


router.get('/:userId', (req, res) => {
  console.log("Get user" + req.params.userId);
  res.send("Get user" + req.params.userId);
});

export default router;

