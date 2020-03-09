import jwt from 'jsonwebtoken'

function validateToken (token) {

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
			});

		} else {
			return {success:false,message:"Missing 'Bearer ' in Auth header"}
		}


	} else {
		return {success:false,message:"Missing Token"}
	}


	return {success:true, message:"Token is valid"}

}

export default {validateToken};
