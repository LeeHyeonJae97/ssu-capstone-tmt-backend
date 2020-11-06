const Challenge = require("../models/challenge.model.js");

// ���ο� ç���� �߰�
exports.create = (req, res) => {
	if(!req.body) {
		res.status(400).send({
			message: "Error : Challenge.create / Content can not be empty"
		});
	}
	
	else {
		Challenge.create({uID: req.params.uID, newChallenge: req.body.newChallenge, routines: req.body.routines, friend_uIDs: req.body.friend_uIDs}, (err, data) => {
			if(err) {
				res.status(500).send({
					message: err.message || "Error : Challenge.create"
				});
			}

			else res.send({message: "Success : Challenge.create", cID: data.cID});
		});
	}
};

// �ʴ���� ç���� ����
exports.accept = (req, res) => {
	Challenge.accept(req.params.uID, req.params.cID, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Challenge.accept"
			});
		}

		else res.send("Success : Challenge.accept");
	});
};

// �ʴ���� ç���� ����
exports.decline = (req, res) => {
	Challenge.decline(req.params.uID, req.params.cID, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Challenge.decline"
			});
		}

		else res.send("Success : Challenge.decline");
	});
};

// ç���� �Ϸ�
exports.success = (req, res) => {
	Challenge.success(req.params.uID, req.params.cID, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Challenge.success"
			});
		}

		else res.send("Success : Challenge.success");
	});
};

// ç���� ���� �Ǵ� �ߵ� ����
exports.fail = (req, res) => {
	Challenge.fail(req.params.uID, req.params.cID, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Challenge.fail"
			});
		}

		else res.send("Success : Challenge.fail");
	});
};

// ���� �Ǵ� �ߵ� ������ ç���� ����
exports.remove = (req, res) => {
	Challenge.remove(req.params.uID, req.params.cID, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Challenge.remove"
			});
		}

		else res.send("Success : Challenge.remove");
	})
};