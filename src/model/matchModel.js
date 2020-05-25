//Todo: UPDATE ALL REFERENCES TO DATA
import mongoose from 'mongoose';


var matchSchema = mongoose.Schema({
	p1id: {
		type: mongoose.Schema.Types.ObjectId,
		required:true,
		ref: 'user'
	},
	p2id: {
		type: mongoose.Schema.Types.ObjectId,
		required:true,
		ref: 'user'
	},
	mid: {
		type: mongoose.Schema.Types.ObjectId,
		required:true
	},
	started: {
		type: Date,
		required:true
	},
	ended: {
		type: Date
	},
	winnerID: {
		type: mongoose.Schema.Types.ObjectId
	}
	
});

var Match = mongoose.model('match', matchSchema);

var get = function (callback, limit) {
    Match.find(callback).limit(limit);
}


export default {Match, get};


