const Login = require("../models/login.model.js");

// ·Î±×ÀÎ
exports.login = (req, res, next) => {
	Login.login(req, res, next, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Login.login"
			});
		}
			
		else {
			Login.getInfo(data, (err, data) => {
				if(err) {
					res.status(500).send({
						message: err.message || "Error : Login.getInfo"
					});
				}
				
				else res.send({message: "Success : Login.getInfo", data});
			});
		}
	});
}