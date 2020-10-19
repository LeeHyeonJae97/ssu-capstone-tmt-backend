const ExerciseRecord = require("../models/exercise_record.model.js");

// 유저의 운동 기록 추가
exports.create = (req, res) => {
	// body에 아무런 정보도 없는 경우
	if(!req.body) {
		res.status(400).send({
			message: "Content can not be empty"
		});
	}

	// 유저의 운동 기록 정보 생성
	const exerciseRecord = new ExerciseRecord({
		uID: req.params.uID,
		time: req.body.time
	});

	// 생성한 정보를 토대로 데이터베이스에 저장
	ExerciseRecord.create(exerciseRecord, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Some error occurred while creating new exercise record"
			});			
		}
		else res.send("create a new exercise record " + data.erID);
	});
};

// 유저의 운동 기록 제거
exports.remove = (req, res) => {
	ExerciseRecord.remove(req.params.erID, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Some error occurred while removing exercise record"
			});
		}
		else res.send("remove exercise record");
	});
};