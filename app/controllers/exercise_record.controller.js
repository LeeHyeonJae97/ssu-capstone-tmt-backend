const ExerciseRecord = require("../models/exercise_record.model.js");

// 유저의 운동 기록 추가
exports.create = (req, res) => {
	if(!req.body) {
		res.status(400).send({
			message: "Error : ExerciseRecord.create / Content can not be empty"
		});
	}

	ExerciseRecord.create(req.body, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : ExerciseRecord.create"
			});			
		}
		else res.send({message: "Success : ExerciseRecord.create"});
	});
};

/*
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
*/