import casual from 'casual';
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

function addUser (email, password) {
	//todo: move password functionality to an external util
	let salt = crypto.randomBytes(16).toString('base64');
	let hash = crypto.createHmac('sha512',salt).update(password).digest("base64");

	password = salt+"$"+hash;
	var user = casual.user;
	user.password = password;
	user.email = email;
	data.users.push(user);
	return user;
}

function users () {                             
	return data;

}


function user (id) {
	var found = {}

	found = data.users.filter(user => user["id"] === id);
	return found;
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


	var newEloWnr = winner.elo + (16 * (1 - expectedScoreWnr));
	var newEloLsr = loser.elo  + (16 * (1 - expectedScoreLsr));

	winner.elo = Math.floor(newEloWnr);
	loser.elo = Math.floor(newEloLsr);

	data.users[idxWinner] = winner;
	data.users[idxLoser] = loser;
	
	return {"success": true, "message":"ELO Updated for both players"}

}

function findUserById (id) {
	return data.users.filter(user => user["id"] === id);
}

export default {addUser,user,users,findUserByMail,findUserById,updateELO};


