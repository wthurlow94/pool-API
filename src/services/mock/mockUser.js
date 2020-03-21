import casual from 'casual';
//const casual = require('casual');
//const crypto = require('crypto');
import crypto from 'crypto';



casual.define('user', function () {
	return {
		id:casual.integer(1,1000),
		email:"",
		password:"",
		elo:400

	};
});


const data = { users: [] };
var testUser = casual.user;
testUser.email = "foo";
testUser.password = "pass";
data.users.push(testUser);











function createUser (email, password) {
	//todo: move password functionality to an external util
	//let salt = crypto.randomBytes(16).toString('base64');
	//let hash = crypto.createHmac('sha512',salt).update(password).digest("base64");

	//password = salt+"$"+hash;
	var user = casual.user;
	user.password = password;
	user.email = email;
	data.users.push(user);
	return {"success":true,"message":"User Created " + user.id, "user":user};
}

function getUsers () {                             
	return data.users;

}



function findUserByMail (mail) {

	var found = {};
	
	found = data.users.filter(user => user["email"] === mail);
	
	
	return found;
}



function updateELO (winnerId, loserId) {
	var winner = findUserById(winnerId)[0];
	var loser  = findUserById(loserId)[0];

	var idxWinner = data.users.indexOf(winner);
	var idxLoser = data.users.indexOf(loser);

	var expectedScoreWnr = 1 / (1 + (10 ^ ((loser.elo - winner.elo) / 400)));
        var expectedScoreLsr = 1 / (1 + (10 ^ ((winner.elo - loser.elo) / 400)));


	var newEloWnr = winner.elo + (32 * (1 - expectedScoreWnr));
	var newEloLsr = loser.elo  + (32 * (0 - expectedScoreLsr));

	winner.elo = Math.floor(newEloWnr);
	loser.elo = Math.floor(newEloLsr);

	data.users[idxWinner] = winner;
	data.users[idxLoser] = loser;
	
	return [{'winnerId':winner.id,'winnerELO':winner.elo},{'loserID':loser.id,'loserELO':loser.elo}]

}

function findUserById (id) {
	return data.users.filter(user => user["id"] === id);
}

export default {createUser,getUsers,findUserByMail,findUserById,updateELO};


