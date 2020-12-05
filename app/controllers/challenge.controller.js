const Challenge = require("../models/challenge.model.js");

// ���ο� ç���� �߰�
exports.create = (req, res) => {
	if(!req.body) {
		console.log("body is empty");
		res.status(400).send({
			message: "Error : Challenge.create / Content can not be empty"
		});
	}
	
	else {
		Challenge.create(req.params.uID, req.body, (err, data) => {
			if(err) {
				console.log(err);
				res.status(500).send({
					message: err.message || "Error : Challenge.create"
				});
			}

			else res.send({
				message: "Success : Challenge.create",
				cID: data.cID
			});
		});
	}
};

// �ʴ���� ç���� ����
exports.accept = (req, res) => {
	Challenge.accept(req.params.uID, req.params.cID, (err) => {
		if(err) {
			console.log(err);
			res.status(500).send({
				message: err.message || "Error : Challenge.accept"
			});
		}

		else res.send({
			message: "Success : Challenge.accept"
		});
	});
};

// �ʴ���� ç���� ����
exports.decline = (req, res) => {
	Challenge.decline(req.params.uID, req.params.cID, (err) => {
		if(err) {
			console.log(err);
			res.status(500).send({
				message: err.message || "Error : Challenge.decline"
			});
		}

		else res.send({
			message: "Success : Challenge.decline"
		});
	});
};

// ç���� �Ϸ�
exports.success = (req, res) => {
	Challenge.success(req.params.uID, req.params.cID, (err) => {
		if(err) {
			console.log(err);
			res.status(500).send({
				message: err.message || "Error : Challenge.success"
			});
		}

		else res.send({
			message: "Success : Challenge.success"
		});
	});
};

// ç���� ���� �Ǵ� �ߵ� ����
exports.fail = (req, res) => {
	Challenge.fail(req.params.uID, req.params.cID, (err) => {
		if(err) {
			console.log(err);
			res.status(500).send({
				message: err.message || "Error : Challenge.fail"
			});
		}

		else res.send({
			message: "Success : Challenge.fail"
		});
	});
};

// ���� �Ǵ� �ߵ� ������ ç���� ����
exports.remove = (req, res) => {
	Challenge.remove(req.params.uID, req.params.cID, (err) => {
		if(err) {
			console.log(err);
			res.status(500).send({
				message: err.message || "Error : Challenge.remove"
			});
		}

		else res.send({
			message: "Success : Challenge.remove"
		});
	})
};