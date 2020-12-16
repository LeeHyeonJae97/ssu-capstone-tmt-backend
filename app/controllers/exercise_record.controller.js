const ExerciseRecord = require("../models/exercise_record.model.js");

exports.findById = (req, res) => {
	ExerciseRecord.findById(req.params.uID, (err, data) => {
		if(err) {
			console.log(err);
			res.status(500).send({
				message: err.message || "Error : ExerciseRecord.findById"
			});
		}
		else res.send({
			message: "Success : ExerciseRecord.findById",
			data: data
		});
	});
};

// ������ � ��� �߰�
exports.create = (req, res) => {
	if(!req.body) {
		console.log("body is empty");
		res.status(400).send({
			message: "Error : ExerciseRecord.create / Content can not be empty"
		});
	}

	ExerciseRecord.create(req.body, (err) => {
		if(err) {
			console.log(err);
			res.status(500).send({
				message: err.message || "Error : ExerciseRecord.create"
			});			
		}
		else res.send({
			message: "Success : ExerciseRecord.create"
		});
	});
};