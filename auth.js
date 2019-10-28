let jwtSecret = 'your_jwt_secret';
let jwt = require('jsonwebtoken');
const passport = require('passport');
require('./passport');

function generateJWTToken(user) {
	console.log("***USER***" + user);
	return jwt.sign(user, jwtSecret, {
		subject: user.username,
		expiresIn: '7d',
		algorithm: 'HS256'
	});
}

module.exports = (router) => {
	router.post('/login', (req, res) => {
		passport.authenticate('local', {session: false}, (error, user, info) => {
			if (error || !user) {
				return res.status(400).json({
					message: 'Something is not right with ' + user,
					user: user
				});
			}
			req.login(user, {session: false }, (error) => {
				if (error) {
					res.send(error);
				}
				let token = generateJWTToken(user.toJSON());
				return res.json({user,token});
			});
		})(req,res);
	});
}
