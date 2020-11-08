const Join = require("../models/join.model.js");

// ���ο� ���� �߰�
exports.join = (req, res) => {
	if(!req.body) {
		res.status(400).send({
			message: "Error : Join.join / Content can not be empty"
		});
	}

	Join.create(req.body.info, req.body.id, req.body.pw, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Join.join"
			});
		}
		else res.send({message: "Success : Join.join", uID: data.uID});
	});
};

// ���̵� �ߺ�Ȯ��
exports.doublecheck = (req, res) => {
	Join.doublecheck(req.params.id, (err) => {
		if(err) {
			if(err.message == "id is double") res.send({message: err.message});
		
			else {
				res.status(500).send({
					message: err.message || "Error : Join.doublecheck"
				});
			}
		}

		else res.send({message: "Success : Join.doublecheck"});
	});
};