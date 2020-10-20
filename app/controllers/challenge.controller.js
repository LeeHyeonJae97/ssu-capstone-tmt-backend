const Challenge = require("../models/challenge.model.js");

// 새로운 챌린지 추가
exports.create = (req, res) => {
	if(!req.body) {
		res.status(400).send({
			message: "Error : Challenge.create / Content can not be empty"
		});
	}
	
	else {		
		const challenge = new Challenge({
			name: req.body.name,
			description: req.body.description,
			//calorie_consume: req.body.calorie_consume,
			//start_datetime: req.body.start_datetime,
			//finish_datetime: req.body.finish_datetime,
			//perform_day: req.body.perform_day
		});

		Challenge.create({newChallenge: challenge, newGoingOn: {uID: req.params.uID}, friendIDs: req.body.friendIDs}, (err, data) => {
			if(err) {
				res.status(500).send({
					message: err.message || "Error : Challenge.create"
				});
			}

			else res.send({message: "Success : Challenge.create", cID: data.cID});
		});
	}
};

// 초대받은 챌린지 수락
exports.accept = (req, res) => {
	if(!req.body) {
		res.status(400).send({
			message: "Error : Challenge.accept / Content can not be empty"
		});
	}
	
	else {
		Challenge.accept({uID: req.params.uID, cID: req.params.cID}, (err) => {
			if(err) {
				res.status(500).send({
					message: err.message || "Error :Challenge.accept"
				});
			}

			else res.send("Success : Challenge.accept");
		});
	}
};