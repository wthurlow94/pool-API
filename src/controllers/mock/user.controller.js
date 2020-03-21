import userService from '../../services/mock/mockUser'
import auth from '../../controllers/auth.controller'

//Get all users
function getUsers (req) {

	//validate the users token	
    var json = auth.validateToken(req);
    	//if their token is valid append the users to the json object
    if (json.success === true) {
	    json.values = userService.getUsers();
    }

	// return auth success with Array of users OR auth error message
    return json;
}


// Register new user
function postUser (req) {
	//check user exists already	
	if (userService.findUserByMail(req.body.email).length > 0) {

		return {"success":false,"message":"Email already exists"}
	}
	var password = auth.hashPassword(String(req.body.password));
	return userService.createUser(req.body.email, password);
	
}



function getUser (req) {

	var json = auth.validateToken(req);

	if (json.success == true) {
		userValue = userService.findUserById(parseInt(req.params.userId));
		if (userValue.length < 1) {
			json.success = false;
			json.message = "No User found with id " + req.params.userId
		} else {

		
			json.value = user[0];
		}
	}

	return json;
}



export default {getUsers, postUser, getUser};
