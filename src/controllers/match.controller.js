//import User from '../../services/mock/mockUser'
import auth from '../controllers/auth.controller'
import Match from '../model/matchModel'
import User from '../model/userModel'
import mongoose from 'mongoose'
//Get all users
//

function getMatches (req,res) {
 Match.get(function (err, matches) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Matches retrieved successfully",
            data: matches
        })
    });
}


// Register new match
function postMatch (req, res) {
    //Do both Players exist?
	
    //Is there an existing, unended match between these two players?
	
    //If not create the new match.
    var match = new Match.Match();
    match.mid = new mongoose.Types.ObjectId;
    match.p1id = req.body.p1id;
    match.p2id = req.body.p2id;
    match.started = Date.now();
    
    match.save(function (err,match) {
	if (err)
	    res.json(err);
	else
	res.json({
            message: 'New Match started!',
            data: match
        });
    });
};



function getMatch (req,res) {

	//var json = auth.validateToken(req);

//	if (json.success == true) {
		Match.Match.findById(req.params.matchId, function (err, match) {
        		if (err)
           			res.send(err);
        		res.json({
		            message: 'Match details loading..',
        		    data: match
   			     });
 			});
//	}

	
}


async function patchMatch (req,res) {
	
	const session = await mongoose.startSession();
	session.startTransaction();
	try {
		const opts = { session, new:true}
	

		//should update this to find
		// _id : req.params.matchId,
		// ended: {$exists: false}
		const matchDoc = await Match.Match.findById(
			req.params.matchId,
			{},
			opts).exec();
		if(matchDoc == null){
			return {message: "Match does not exist"}
		}

		if(matchDoc["ended"]){
			return {message: "Match has already ended"}
		}

		matchDoc.winnerID = req.body.winnerID;
		matchDoc.ended = Date.now();

		await matchDoc.save(opts);

		const winnerDoc = await User.User.findById(
			req.body.winnerID,
			{},
			opts).exec();
		

		const loserDoc = await User.User.findById(
			req.body.winnerID == matchDoc.p1id ? matchDoc.p2id : matchDoc.p1id ,
			{},
			opts).exec();
	
		const elo = await updateELO(winnerDoc.elo, loserDoc.elo);
		
		winnerDoc.elo = elo.winnerELO;
		loserDoc.elo = elo.loserELO;

		await winnerDoc.save(opts);
		await loserDoc.save(opts);

		var data = {};
		data.match = matchDoc;
		data.winner = winnerDoc;
		data.loser = loserDoc;
	
	await session.commitTransaction();
	session.endSession();
	return data;
	} catch (err) {
		await session.abortTransaction();
		session.endSession();
		console.log( err );
	}
	//Get the match object
	//Update and save it
}

//return an array of User Objects
async function updateELO (winnerElo, loserElo) {
 
        //first grab the winner and losers
      //  const winner = await User.findById(winnerId).session(session);
       // const loser = await User.findById(loserId).session(session);
        
	var eXWinner = 1 / (1 + (10 ^ ((loserElo - winnerElo) / 400)));
        var eXLoser  = 1 / (1 + (10 ^ ((winnerElo - loserElo) / 400)));
        
	var newELOWin = Math.floor(winnerElo + (32 * (1 - eXWinner)));
        var newELOLose = Math.floor(loserElo + (32 * (0 - eXLoser)));
        
	//Update Winner and loser
        

	return {winnerELO: newELOWin, loserELO: newELOLose};
}




export default {getMatches, postMatch, getMatch, patchMatch,updateELO};
