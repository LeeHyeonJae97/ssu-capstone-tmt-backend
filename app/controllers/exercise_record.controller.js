const ExerciseRecord = require("../models/exercise_record.model.js");

// 유저의 운동 기록 추가
exports.create = (req, res) => {
	if(!req.body) {
		res.status(400).send({
			message: "Error : ExerciseRecord.create / Content can not be empty",
			state: 0
		});
	}

	ExerciseRecord.create(req.body, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : ExerciseRecord.create",
				state: 0
			});			
		}
		else res.send({
			message: "Success : ExerciseRecord.create",
			state: 1
		});
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