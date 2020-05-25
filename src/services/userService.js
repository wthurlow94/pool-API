//Todo: UPDATE ALL REFERENCES TO DATA
import mongoose from 'mongoose';


var userSchema = mongoose.Schema({
	id: {
		type: Number,
		required:true
	},
	email: 	{
		type: String,
		required: true
	},
	hash: {
		type: String,
		required: true
	},
	elo: {
		type: Number,
		default: 400
	}
	
});



function createUser (email, password) {	
	//var userDocument = {};
	//userDocument.id = utils.getMaxUserID()++;
	//userDocument.email = email;
//	userDocument.hash =  password.split("$")[1];
	
	//MongoDB.collection("Users").Push("userDocument");
//	return {"success":true,"message":"User Created " + userDocument.id, "user: " +userDocument};
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
//todo: update this
	
	return data.users.filter(user => user["id"] === id);
}


//var User = mongoose.model('user',userSchema);

export default {};


