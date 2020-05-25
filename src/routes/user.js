import { Router } from 'express';
import auth from '../controllers/auth.controller';
import userController from '../controllers/user.controller';

const router = Router();
//get all users
router.get('/', (req, res) => {
	

	userController.getUsers(req,res);
	
});


//register new user
router.post('/', (req, res) => {
	

	userController.postUser(req,res);
//	if (user.findUserByMail(req.body.email).length >= 1) {
//		// user doesn't exist
//		res.json({"success":false,"message":"Email already exists"}).send();
//		return
		
	//}
	//res.send(user.addUser(req.body.email,req.body.password));

});

//Get User
router.get('/:userId', (req, res) => {
  
	userController.getUser(req,res);
 });

export default router;

