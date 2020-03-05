import { Router } from 'express';
import user from '../../mockdata/mockUser';
const router = Router();

router.get('/', (req, res) => {

  res.send(user.users());
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

