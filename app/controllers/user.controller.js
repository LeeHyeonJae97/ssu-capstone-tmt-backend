const User = require("../models/user.model.js");

// ������ ��� ������ �޾ƿ´�.
exports.findById = (req, res) => {
	User.findById(req.params.uID, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Some error occurred while finding user."
			});
		}

		else res.send(data);		
	});
};

// ���� �˻�
// ģ���� ID ���� ���� ���� ����
exports.findByName = (req, res) => {
	Friend.findByName(req.params.friend_name, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Some error occured while finding user by name"
			});
		}

		else res.send(data);
	});
}

// ���ο� ���� �߰�
exports.create = (req, res) => {
	// body�� �ƹ��� ������ ���� ���
	if(!req.body) {
		res.status(400).send({
			message: "Content can not be empty"
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

	// ������ ������ ���� �����ͺ��̽��� ����
	User.create(user, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Some error occurred while creating new user."
			});
		}
		else res.send(data.uID);
	});
};

// ���� ���� ������Ʈ
exports.update = (req, res) => {
	User.update(req.params.uID, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Some error occured while updating the user."
			});
		}
		else res.send("update a user");
	});
};

// ���� ����
exports.remove = (req, res) => {
	User.remove(req.params.uID, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Some error ocuured while removing the user"
			});
		}
		else res.send("remove a user");
	});
};