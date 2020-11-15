const Challenge = require("../models/challenge.model.js");

// 새로운 챌린지 추가
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

// 초대받은 챌린지 수락
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

// 초대받은 챌린지 거절
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

// 챌린지 완료
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

// 챌린지 실패 또는 중도 포기
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

// 실패 또는 중도 포기한 챌린지 삭제
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