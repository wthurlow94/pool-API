import { Router } from 'express';
import auth from '../../controller/auth.controller.js';
import user from '../../mockdata/mockUser';
const router = Router();
//login
router.get('/', (req, res) => {
	

	let token = req.headers["authorization"];
	var json = auth.validateToken(token);
	

	if (json.status === true) {
		
		res.json(json).send(user.users);
	} else {
		res.json(json).send();
	}
});


//register new user
router.post('/', (req, res) => {
	
	res.send(user.addUser(req.body.password));

});

//Get User
router.get('/:userId', (req, res) => {
  

	let token = req.headers["authorization"];
	var json = auth.validateToken(token);
	

	if (json.status === true) {
		
		res.json(json).send(user.user(req.body.id));
	} else {
		res.json(json).send();
	}
 });

export default router;

