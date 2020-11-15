const Challenge = require("../models/challenge.model.js");

// ���ο� ç���� �߰�
exports.create = (req, res) => {
	if(!req.body) {
		res.status(400).send({
			message: "Error : Challenge.create / Content can not be empty",
			state: 0
		});
	}
	
	else {
		Challenge.create({uID: req.params.uID, newChallenge: req.body.newChallenge, routines: req.body.routines, friend_uIDs: req.body.friend_uIDs}, (err, data) => {
			if(err) {
				res.status(500).send({
					message: err.message || "Error : Challenge.create",
					state: 0
				});
			}

			else res.send({
				message: "Success : Challenge.create",
				cID: data.cID,
				state: 1
			});
		});
	}
};

// �ʴ���� ç���� ����
exports.accept = (req, res) => {
	Challenge.accept(req.params.uID, req.params.cID, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Challenge.accept",
				state: 0
			});
		}

		else res.send({
			message: "Success : Challenge.accept",
			state: 1
		});
	});
};

// �ʴ���� ç���� ����
exports.decline = (req, res) => {
	Challenge.decline(req.params.uID, req.params.cID, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Challenge.decline",
				state: 0
			});
		}

		else res.send({
			message: "Success : Challenge.decline",
			state: 1
		});
	});
};

// ç���� �Ϸ�
exports.success = (req, res) => {
	Challenge.success(req.params.uID, req.params.cID, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Challenge.success",
				state: 0
			});
		}

		else res.send({
			message: "Success : Challenge.success",
			state: 1
		});
	});
};

// ç���� ���� �Ǵ� �ߵ� ����
exports.fail = (req, res) => {
	Challenge.fail(req.params.uID, req.params.cID, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Challenge.fail",
				state: 0
			});
		}

		else res.send({
			message: "Success : Challenge.fail",
			state: 1
		});
	});
};

// ���� �Ǵ� �ߵ� ������ ç���� ����
exports.remove = (req, res) => {
	Challenge.remove(req.params.uID, req.params.cID, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Challenge.remove",
				state: 0
			});
		}

		else res.send({
			message: "Success : Challenge.remove",
			state: 1
		});
	})
};