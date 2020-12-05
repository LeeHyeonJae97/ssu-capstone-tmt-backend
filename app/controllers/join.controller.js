const Join = require("../models/join.model.js");

// ���ο� ���� �߰�
exports.join = (req, res, next) => {
	if(!req.body) {
		console.log("body is empty");
		res.status(400).send({
			message: "Error : Join.join / Content can not be empty"
		});
	}
	
	Join.join(req, res, next, (err, data) => {
		if(err) {
			console.log(err);
			res.status(500).send({
				message: err.message || "Error : Join.join"
			});
		}
		else  {
			res.send({
				message: "Success : Join.join",
				uID: data.uID
			});
		}
	})			
};

// ���̵� �ߺ�Ȯ��
exports.doublecheck = (req, res) => {
	Join.doublecheck(req.params.id, (err) => {
		if(err) {
			console.log(err);

			if(err.message == "id is double") {
				res.send({
					message: err.message
				});
			}
		
			else {
				res.status(500).send({
					message: err.message || "Error : Join.doublecheck"
				});
			}
		}

		else res.send({
			message: "Success : Join.doublecheck"
		});
	});
};

// �޴��� ����
exports.auth = (req, res) => {
	Join.auth(req.params.phone_number, (err) => {
		if(err) {
			console.log(err);
			res.status(500).send({
				message: err.message || "Error : Join.auth"
			});
		}
		else res.send({
			message: "Success : Join.auth"
		});	
	});
};

// �޴��� ���� Ȯ��
exports.authCheck = (req, res) => {
	Join.authCheck(req.params.phone_number, req.params.content, (err) => {
		if(err) {
			console.log(err);
			res.status(500).send({
				message: err.message || "Error : Join.authCheck"
			});
		}
		else res.send({ 
			message: "Success : Join.authCheck"
		});
	});
};