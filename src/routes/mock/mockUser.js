import { Router } from 'express';
import user from '../../mockdata/mockUser';
const router = Router();

router.get('/', (req, res) => {

  res.send(user.users());
});


router.post('/', (req, res) => {
	
	res.send(user.addUser());

});


router.get('/:userId', (req, res) => {
  console.log("Get user" + req.params.userId);
  res.send("Get user" + req.params.userId);
});

export default router;

