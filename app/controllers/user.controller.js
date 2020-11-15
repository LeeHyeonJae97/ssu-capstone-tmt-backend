const User = require("../models/user.model.js");

// ���� �˻�
exports.findByName = (req, res) => {
	Friend.findByName(req.params.friend_name, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : User.findByName",
				state: 0
			});
		}

		else res.send({
			message: "Success : User.findByName",
			data: data,
			state: 1
		});
	});
};

// ���� ���� ������Ʈ
exports.update = (req, res) => {
	if(!req.body) {
		res.status(400).send({
			message: "Error : User.update / Content can not be empty",
			state: 0
		});
	}

	User.update(req.params.uID, req.body, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error: User.update",
				state: 0
			});
		}
		else res.send({
			message: "Success : User.update",
			state: 1
		});
	});
};

// ���� ����
exports.remove = (req, res) => {
	User.remove(req.params.uID, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : User.remove",
				state: 0
			});
		}
		else res.send({
			message: "Success : User.remove",
			state: 1
		});
	});
};