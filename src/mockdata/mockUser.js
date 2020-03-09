import casual from 'casual';
import crypto from 'crypto';



casual.define('user', function () {
	return {
		id:casual.uuid,
		username:casual.username,
		email:casual.email,
		password:""
	};
});


const data = { users: [] };

function addUser (password) {
	
	let salt = crypto.randomBytes(16).toString('base64');
	let hash = crypto.createHmac('sha512',salt).update(password).digest("base64");

	password = salt+"$"+hash;
	var user = casual.user;
	user.password = password;
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
export default {addUser,user,users,findUserByMail};


