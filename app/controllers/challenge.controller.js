const Challenge = require("../models/challenge.model.js");

// 새로운 챌린지 추가
exports.create = (req, res) => {
	// body에 아무런 정보도 없는 경우
	if(!req.body) {
		res.status(400).send({
			message: "Content can not be empty"
		});
	}
	
	else {		
		// 챌린지 생성
		const challenge = new Challenge({
			name: req.body.name,
			description: req.body.description,
			//calorie_consume: req.body.calorie_consume,
			//start_datetime: req.body.start_datetime,
			//finish_datetime: req.body.finish_datetime,
			//perform_day: req.body.perform_day
		});

		// 챌린지 정보를 데이터베이스에 추가
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
	// body에 아무런 정보도 없는 경우
	if(!req.body) {
		res.status(400).send({
			message: "Content can not be empty"
		});
	}
	
	else {
		// invited에서 제거한 뒤 goingon에 추가
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