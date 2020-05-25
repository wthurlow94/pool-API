//Todo: UPDATE ALL REFERENCES TO DATA
import mongoose from 'mongoose';


var userSchema = mongoose.Schema({
	id: {
		type: mongoose.Schema.Types.ObjectId,
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

var User = mongoose.model('user',userSchema);

var get = function (callback, limit) {
    User.find(callback).limit(limit);
}


export default {User, get};


