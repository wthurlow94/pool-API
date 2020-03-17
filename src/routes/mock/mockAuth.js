import { Router } from 'express';
import 'dotenv/config'
import crypto from 'crypto';
import mockUser from '../../services/mock/mockUser';
import jwt from 'jsonwebtoken';

const router = Router();


router.post('/', (req, res) => {
	

// Find user by req.body.email
	
	
	var userArr = mockUser.findUserByMail(req.body.email);
	if (userArr.length < 1) {
		res.status(404).send({});
                console.log("unsuccessful login");
	} else {
		let user = userArr[0];
		let passwordFields = user.password.split('$');
		let salt = passwordFields[0];

		let newHash = crypto.createHmac('sha512',salt).update(req.body.password).digest("base64");

		if (newHash === passwordFields[1]) {
			
			// generate and return token
			//
			//
			let token = jwt.sign(
				{
				email: user.email
					},
				process.env.JWTSECRET,
				{ 
				expiresIn: '24h' 
				}
			); 
			
			console.log("successful login");
			res.json({
				success: true,
				message: 'Authentication successful',
				token: token
			});
		} else {
			res.status(400).send({});	
		}	
	}

});


router.get('/:userId', (req, res) => {


  res.send("Get user" + req.params.userId);
});

export default router;

