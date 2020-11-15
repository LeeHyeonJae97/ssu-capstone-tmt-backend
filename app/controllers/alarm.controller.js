const Alarm = require("../models/alarm.model.js");

// 알람 내용 수정
exports.update = (req, res) => {
	if(!req.body) {
		res.status(400).send({
			message: "Error : Alarm.update / Content can not be empty",
			state: 0
		});
	}

	else {
		Alarm.update(req.params.uID, req.body.alarm, (err) => {
			if(err) {
				res.status(500).send({
					message: err.message || "Error : Alarm.update",
					state: 0
				});
			}

			else res.send({
				message: "Success : Alarm.update",
				state: 1
			});
		});
	}
}