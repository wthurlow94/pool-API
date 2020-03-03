import casual from 'casual';

casual.define('match', function () {
	var winnerID = casual.uuid;
	return {
		matchid:casual.uuid,
		playeroneid:winnerID,
		player2id:casual.uuid,
		started: 123,
		ended: 321,
		winner: winnerID
	};
});


const data = { matches: [] };

function addMatch () {

	data.matches.push(casual.match);
return "Added match";
}

function matches () {                             
	
	return data;

}
export default {addMatch,matches};


