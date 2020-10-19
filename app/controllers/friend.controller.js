const Friend = require("../models/friend.model.js");

// ���ο� ģ�� �߰�
exports.add = (req, res) => {
	Friend.add({uID: req.params.uID, friendID: req.params.friendID}, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Some error occurred while adding new friend"
			});
		}

		else res.send("add a new friend");
	});
}

// ģ�� ����
exports.remove = (req, res) => {
	Friend.remove({uID: req.params.uID, friendID: req.params.friendID}, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Some error occured while removing friend"
			});
		}

		else res.send("remove a friend");
	});
}
