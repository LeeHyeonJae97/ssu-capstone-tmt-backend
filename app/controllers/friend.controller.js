const Friend = require("../models/friend.model.js");

// ���ο� ģ�� �߰�
exports.add = (req, res) => {
	Friend.add({uID: req.params.uID, friendID: req.params.friend_uID}, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Friend.add"
			});
		}

		else res.send("Success : Friend.add");
	});
}

// ģ�� ����
exports.remove = (req, res) => {
	Friend.remove(req.params.uID, req.params.friend_uID, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Friend.remove"
			});
		}
		
		else res.send("Success : Friend.remove");
	});
}
