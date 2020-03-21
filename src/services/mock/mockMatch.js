import casual from 'casual';
import user from './mockUser'
casual.define('match', function () {
	
	return {
		mid:casual.integer(1,1000),
		p1:"",
		p2:"",
		started: "",
		ended: "",
		winner: ""
	};
});


const data = { matches: [] };

function addMatch (p1,p2) {
	
	//check players exist
	
	if (user.findUserById(p1).length < 1) {
		//p1 doesn't exist	
		return {"success": false, "message":"Player One does not exist"};
	}
	
	if (user.findUserById(p2).length < 1) {
		//p2 doesn't exist
		return {"success": false, "message":"Player Two does not exist"};
	}

	//both users exists
	
	var newMatch = casual.match;
	newMatch.p1 = p1;
	newMatch.p2 = p2;
	//todo: Date Formatting
	newMatch.started = Date.now();
	
	data.matches.push(newMatch);
	return {"success": true, "message":"Added match: "+newMatch.mid, "match":newMatch};
}

function matches () {                             
	
	return data;

}

function findMatchById (id) {
	return data.matches.filter(match => match["mid"] === id);
}


function resultMatch(matchId, winnerId) {
	
	//check the match exists and grab it
	var matches = findMatchById(parseInt(matchId));

	if (matches.length < 1) {
		return {"success":false, "message":"Match does not exist"}
	}
	
	var matchToRes = matches[0];
	var indexOfMatch = data.matches.indexOf(matchToRes);
	var p1 = matchToRes.p1
	var p2 = matchToRes.p2
	//id doesn't match either of the players
	if (p1 != winnerId && p2 != winnerId) {
			
		return {"success":false,"message":"Winner is not a player in this match"}

	}
	var loserId;
	if (p1 == winnerId) {
		loserId = p2;
	} else {
		loserId = p1;
	}

	//check whether it's been resulted already?
	
	if (matchToRes.ended != "") {
		return {"success":false, "message":"Match has ended"};
	}

	
	//set the winner, and update the match reference
	
	matchToRes.winner = winnerId;
	// todo: Date formatting
	matchToRes.ended = Date.now();
	data.matches[indexOfMatch] = matchToRes;

	
	//return the match object with the result
	//return the ELO ratings for the two players
	
	var json = {"success":true, "message": "Match Resulted", "match":matchToRes};
	json.elos = user.updateELO(winnerId,loserId);
	return json;


	//return messages;

}

export default {addMatch,matches,resultMatch};


