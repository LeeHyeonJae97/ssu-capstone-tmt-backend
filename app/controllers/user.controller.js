const User = require("../models/user.model.js");

// 유저 검색 (ID)
exports.findById = (req, res) => {
	User.findById(req.params.uID, (err, data) => {
		if(err) {
			console.log(err);
			res.status(500).send({
				message: err.message || "Error : User.findById"
			});
		}

		else res.send({
			message: "Success : User.findById",
			data: data
		});
	})
}

// 유저 검색 (이름)
exports.findByName = (req, res) => {
	User.findByName(req.params.uName, (err, data) => {
		if(err) {
			console.log(err);
			res.status(500).send({
				message: err.message || "Error : User.findByName"
			});
		}

		else res.send({
			message: "Success : User.findByName",
			data: data
		});
	});
};

// 유저 정보 업데이트
exports.update = (req, res) => {
	if(!req.body) {
		console.log("body is empty");
		res.status(400).send({
			message: "Error : User.update / Content can not be empty"
		});
	}

	User.update(req.params.uID, req.body, (err) => {
		if(err) {
			console.log(err);
			res.status(500).send({
				message: err.message || "Error: User.update"
			});
		}
		else res.send({
			message: "Success : User.update"
		});
	});
};

// 유저 삭제
exports.remove = (req, res) => {
	User.remove(req.params.uID, (err) => {
		if(err) {
			console.log(err);
			res.status(500).send({
				message: err.message || "Error : User.remove"
			});
		}
		else res.send({
			message: "Success : User.remove"
		});
	});
};