import { Router } from 'express';
import auth from '../../controllers/auth.controller.js';
import user from '../../services/mock/mockUser';
import userController from '../../controllers/mock/user.controller';

const router = Router();
//get all users
router.get('/', (req, res) => {
	


	res.json(userController.getUsers(req)).send();
	
});


//register new user
router.post('/', (req, res) => {
	

	res.json(userController.postUser(req)).send();
//	if (user.findUserByMail(req.body.email).length >= 1) {
//		// user doesn't exist
//		res.json({"success":false,"message":"Email already exists"}).send();
//		return
		
	//}
	//res.send(user.addUser(req.body.email,req.body.password));

});

//Get User
router.get('/:userId', (req, res) => {
  
	res.json(userController.getUser(req)).send();
 });

export default router;

