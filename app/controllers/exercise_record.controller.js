const ExerciseRecord = require("../models/exercise_record.model.js");

// 유저의 운동 기록 추가
exports.create = (req, res) => {
	if(!req.body) {
		res.status(400).send({
			message: "Error : ExerciseRecord.create / Content can not be empty"
		});
	}

	const exerciseRecord = new ExerciseRecord({
		uID: req.params.uID,
		time: req.body.time
	});

	ExerciseRecord.create(exerciseRecord, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : ExerciseRecord.create"
			});			
		}
		else res.send({message: "Success : ExerciseRecord.create", erID: data.erID});
	});
};

// 유저의 운동 기록 제거
exports.remove = (req, res) => {
	ExerciseRecord.remove(req.params.erID, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : ExerciseRecord.remove"
			});
		}
		else res.send("Success : ExerciseRecord.remove");
	});
};