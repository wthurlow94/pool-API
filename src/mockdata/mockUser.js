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
	console.log(password);
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

function findUserByMail (mail) {

	var found = {};

	found = data.users.find(function(user) {
		if (user.email === mail) {
			console.log(user.email);
			console.log(mail);
			return user;
		} 
		return {};
	});


	return found;
}
export default {addUser,users,findUserByMail};


