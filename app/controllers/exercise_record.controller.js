const ExerciseRecord = require("../models/exercise_record.model.js");

// ������ � ��� �߰�
exports.create = (req, res) => {
	// body�� �ƹ��� ������ ���� ���
	if(!req.body) {
		res.status(400).send({
			message: "Content can not be empty"
		});
	}

	// ������ � ��� ���� ����
	const exerciseRecord = new ExerciseRecord({
		uID: req.params.uID,
		time: req.body.time
	});

	// ������ ������ ���� �����ͺ��̽��� ����
	ExerciseRecord.create(exerciseRecord, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Some error occurred while creating new exercise record"
			});			
		}
		else res.send("create a new exercise record " + data.erID);
	});
};

// ������ � ��� ����
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