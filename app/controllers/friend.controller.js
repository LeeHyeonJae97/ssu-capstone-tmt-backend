const Friend = require("../models/friend.model.js");

// ģ�� ��� ����
exports.find = (req, res) => {
	Friend.find(req.params.uID, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Friend.find",
				state: 0
			});
		}
		else res.send({
			message: "Success : Friend.find",
			data: data,
			state: 1
		});		
	})
};

// ģ�� ����
exports.remove = (req, res) => {
	Friend.remove(req.params.uID, req.params.friend_uID, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Friend.remove",
				state: 0
			});
		}
		
		else res.send({
			message: "Success : Friend.remove",
			state: 1
		});
	});
};

// ģ�� �߰� ��û
exports.request = (req, res) => {
	Friend.request({uID: req.params.uID, friend_uID: req.params.friend_uID}, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Friend.request",
				state: 0
			});
		}
		else res.send({
			message: "Success : Friend.request",
			state: 1
		});
		
	});
};

// ģ�� ��û ����
exports.accept = (req, res) => {
	Friend.accept(req.params.uID, req.params.friend_uID, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Friend.accept",
				state: 0
			});
		}

		else res.send({
			message: "Success : Friend.accept",
			state: 1
		});
	});
};

// ģ�� ��û ����
exports.decline = (req, res) => {
	Friend.decline(req.params.uID, req.params.friend_uID, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Friend.decline",
				state: 0
			});			
		}

		else res.send({
			message: "Success : Friend.decline",
			state: 1
		});
	});
};
