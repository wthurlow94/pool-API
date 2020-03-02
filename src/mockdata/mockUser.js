import casual from 'casual';

casual.define('user', function () {
	return {
		id:casual.uuid,
		username:casual.username,
		email:casual.email
	};
});


const data = { users: [] };

function addUser () {

	data.users.push(casual.user);
return "Added User";
}

function users () {                             


	

	
	return data;

}
export default {addUser,users};


