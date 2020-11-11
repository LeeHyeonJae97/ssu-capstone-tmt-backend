const Friend = require("../models/friend.model.js");

// ģ�� ��� ����
exports.find = (req, res) => {
	Friend.find(req.params.uID, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Friend.find"
			});
		}
		else res.send({message: "Success : Friend.find", data: data});		
	})
};

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
};

// ģ�� �߰� ��û
exports.request = (req, res) => {
	Friend.request({uID: req.params.uID, friend_uID: req.params.friend_uID}, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Friend.request"
			});
		}
		else res.send("Success : Friend.request");
		
	});
};

// ģ�� ��û ����
exports.accept = (req, res) => {
	Friend.accept(req.params.uID, req.params.friend_uID, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Friend.accept"
			});
		}

		else res.send("Success : Friend.accept");
	});
};

// ģ�� ��û ����
exports.decline = (req, res) => {
	Friend.decline(req.params.uID, req.params.friend_uID, (err) => {
		if(err) {
			res.status(500).send( {
				message: err.message || "Error : Friend.decline"
			});			
		}

		else res.send("Success : Friend.decline");
	});
};
