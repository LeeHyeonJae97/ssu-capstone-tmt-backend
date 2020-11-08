const User = require("../models/user.model.js");

// ���� �˻�
exports.findByName = (req, res) => {
	Friend.findByName(req.params.friend_name, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : User.findByName"
			});
		}

		else res.send({message: "Success : User.findByName", data: data});
	});
};

// ���� ���� ������Ʈ
exports.update = (req, res) => {
	if(!req.body) {
		res.status(400).send({
			message: "Error : User.update / Content can not be empty"
		});
	}

	User.update(req.params.uID, req.body, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error: User.update"
			});
		}
		else res.send("Success : User.update");
	});
};

// ���� ����
exports.remove = (req, res) => {
	User.remove(req.params.uID, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : User.remove"
			});
		}
		else res.send("Success : User.remove");
	});
};