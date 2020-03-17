const assert = require('assert');
const userController = require('../controllers/mock/user.controller');

describe('User', function() {
	var createUserReq
	beforeEach(function() {
		createUserReq = {
			"body":{
				"email":"foobar",
				"password":"foobar"
		}
		}
		
	});
	//todo: test the service not the controller
		
	describe('#createUserSuccess()', function() {
		it('should create a new user successfully', function() {

			console.log(createUserReq.body);
			response = userController.default.postUser.call(createUserReq);
			assert.equals(response.success, true);
		});

		});
	});
