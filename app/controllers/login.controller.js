const Login = require("../models/login.model.js");

// ·Î±×ÀÎ
exports.login = (req, res) => {
	Login.login(req.params.id, req.params.pw, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Login.login"
			});
		}
			
		else res.send({message: "Success : Login.login", data});
	})
}