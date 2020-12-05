const User = require("../models/user.model.js");

// ���� �˻� (ID)
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

// ���� �˻� (�̸�)
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

// ���� ���� ������Ʈ
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

// ���� ����
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