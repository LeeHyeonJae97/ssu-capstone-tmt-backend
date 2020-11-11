const Login = require("../models/login.model.js");

// ·Î±×ÀÎ
exports.login = (req, res, next) => {
	if(!req.body) {
		res.status(400).send({
			message: "Error : Login.Login / Content can not be empty"
		});
	}

	Login.login(req, res, next, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Login.login"
			});
		}
		else res.send({message: "Success : Login.login", data: data});			
	});
};