import jwt from 'jsonwebtoken'
import crypto from 'crypto';
function validateToken (req) {
	var decoded;

        let token = req.headers["authorization"];

	// Does the token exist?
	//
	if (token) {
		
		//is the header correctly formatted?
		if (token.startsWith("Bearer ")) {

			token = token.slice(7, token.length);
			jwt.verify(token, process.env.JWTSECRET, (err,decoded) => {
				if (err) {
					return {success:false,message:"Token is not valid"}
				}
				decoded = decoded;
			});

		} else {
			return {success:false,message:"Missing 'Bearer ' in Auth header"}
		}


	} else {
		return {success:false,message:"Missing Token"}
	}


	return {success:true, message:"Token is valid", decoded:decoded}

}

function hashPassword (password) {
	//let salt = crypto.randomBytes(16).toString('base64');
	//let hash = crypto.createHmac('sha512',salt).update(password).digest("base64");


	let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512',salt).update(password).digest("base64");


	return  salt + "$" + hash;

}



export default {validateToken, hashPassword};
