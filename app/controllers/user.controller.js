const User = require("../models/user.model.js");

// ������ ��� ������ �޾ƿ´�.
exports.findById = (req, res) => {
	User.findById(req.params.uID, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : User.findById"
			});
		}

		else res.send({message: "Success : User.findById", data: data});
	});
};

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
}

// ���ο� ���� �߰�
exports.create = (req, res) => {
	if(!req.body) {
		res.status(400).send({
			message: "Error : User.create / Content can not be empty"
		});
	}

	// ���� ���� ����
	const user = new User({
		name: req.body.name
		//email: req.body.email,
		//phone_number: req.body.phone_number,
		//age: req.body.age,
		//height: req.body.height,
		//weight: req.body.weight
	});

	User.create(user, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : User.create"
			});
		}
		else res.send({message: "Success : User.create", uID: data.uID});
	});
};

// ���� ���� ������Ʈ
exports.update = (req, res) => {
	User.update(req.params.uID, (err) => {
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