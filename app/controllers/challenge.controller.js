const Challenge = require("../models/challenge.model.js");

// ���ο� ç���� �߰�
exports.create = (req, res) => {
	// body�� �ƹ��� ������ ���� ���
	if(!req.body) {
		res.status(400).send({
			message: "Content can not be empty"
		});
	}
	
	else {		
		// ç���� ����
		const challenge = new Challenge({
			name: req.body.name,
			description: req.body.description,
			//calorie_consume: req.body.calorie_consume,
			//start_datetime: req.body.start_datetime,
			//finish_datetime: req.body.finish_datetime,
			//perform_day: req.body.perform_day
		});

		// ç���� ������ �����ͺ��̽��� �߰�
		Challenge.create({newChallenge: challenge, newGoingOn: {uID: req.params.uID}, friendIDs: req.body.friendIDs}, (err) => {
			if(err) {
				res.status(500).send({
					message: err.message || "Some error occured while creating new challenge"
				});
			}

			else res.send("create a new challenge");
		});
	}
};

exports.accept = (req, res) => {
	// body�� �ƹ��� ������ ���� ���
	if(!req.body) {
		res.status(400).send({
			message: "Content can not be empty"
		});
	}
	
	else {
		// invited���� ������ �� goingon�� �߰�
		Challenge.accept({uID: req.params.uID, cID: req.params.cID}, (err) => {
			if(err) {
				res.status(500).send({
					message: err.message || "Some error occured while accepting new challenge"
				});
			}

			else res.send("accept new challenge");
		});
	}
};