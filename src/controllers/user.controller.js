//import User from '../../services/mock/mockUser'
import auth from '../controllers/auth.controller'
import User from '../model/userModel'
import mongoose from 'mongoose'
//Get all users
function getUsers (req,res) {
 User.get(function (err, users) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    });
}


// Register new user
function postUser (req, res) {
    var user = new User.User();
    user.id = new mongoose.Types.ObjectId;
    user.email = req.body.email;
    user.hash = auth.hashPassword(String(req.body.password)).split("$")[1];
    user.save(function (err) {
	if (err)
	    res.json(err);
	else
	res.json({
            message: 'New User created!',
            data: user
        });
    });
};



function getUser (req,res) {

	//var json = auth.validateToken(req);

//	if (json.success == true) {
		User.User.findById(req.params.userId, function (err, user) {
        		if (err)
           			res.send(err);
        		res.json({
		            message: 'User details loading..',
        		    data: user
   			     });
 			});
//	}

	
}



export default {getUsers, postUser, getUser};
