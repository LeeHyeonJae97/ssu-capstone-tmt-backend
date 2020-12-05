const Alarm = require("../models/alarm.model.js");

// 알람 내용 수정
exports.update = (req, res) => {
	if(!req.body) {
		console.log("body is empty");
		res.status(400).send({
			message: "Error : Alarm.update / Content can not be empty"
		});
	}

	else {
		Alarm.update(req.params.uID, req.body.alarm, (err) => {
			if(err) {
				console.log(err);
				res.status(500).send({
					message: err.message || "Error : Alarm.update"
				});
			}

			else {
				res.send({				
					message: "Success : Alarm.update"
				});
			}
		});
	}
}