import casual from 'casual';
import user from './mockUser'
casual.define('match', function () {
	
	return {
		matchid:casual.integer(1,1000),
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
	return {"success": true, "message":"Added match"};
}

function matches () {                             
	
	return data;

}
export default {addMatch,matches};


