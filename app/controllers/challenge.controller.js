const Challenge = require("../models/challenge.model.js");

// 새로운 챌린지 추가
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

// 초대받은 챌린지 수락
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

// 초대받은 챌린지 거절
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

// 챌린지 완료
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

// 챌린지 실패 또는 중도 포기
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

// 실패 또는 중도 포기한 챌린지 삭제
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