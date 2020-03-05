import { Router } from 'express';
import jwt from 'jsonwebtoken';
import user from '../../mockdata/mockUser';
const router = Router();

router.get('/', (req, res) => {
	

	let token = req.headers["authorization"]
	console.log(token);
	if (token.startsWith("Bearer ")) {
		token = token.slice(7,token.length);
	}


	if (token) {
		jwt.verify(token, process.env.JWTSECRET, (err,decoded) => {
		
			if (err) {
				res.json({success:false,message:"Invalid Token"}).send();
			} else {
				req.decoded = decoded;
				console.log(decoded);
				res.send(user.users())
			}
		});

	} else {
		res.json({success:false,message:"Missing Token"}).send();
	}

//  res.send(user.users());
});


router.post('/', (req, res) => {
	
	console.log(req.body);
	res.send(user.addUser(req.body.password));

});


router.get('/:userId', (req, res) => {
  console.log("Get user" + req.params.userId);
  res.send("Get user" + req.params.userId);
});

export default router;

