const Friend = require("../models/friend.model.js");

// 货肺款 模备 眠啊
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

// 模备 力芭
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
