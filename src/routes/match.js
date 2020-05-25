import { Router } from 'express';
import auth from '../controllers/auth.controller';
import matchController from '../controllers/match.controller';

const router = Router();
//get all matches
router.get('/', (req, res) => {
	

	matchController.getMatches(req,res);
	
});


//register new match
router.post('/', (req, res) => {
	

	matchController.postMatch(req,res);
//	if (user.findUserByMail(req.body.email).length >= 1) {
//		// user doesn't exist
//		res.json({"success":false,"message":"Email already exists"}).send();
//		return
		
	//}
	//res.send(user.addUser(req.body.email,req.body.password));

});

//Get Match
router.get('/:matchId', (req, res) => {
  
	matchController.getMatch(req,res);
 });


router.patch('/:matchId',  async (req,res) => {
	const data = await matchController.patchMatch(req,res);
	 res.json({
                        
                        data: data
                });

});

export default router;

