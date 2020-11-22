const Join = require("../models/join.model.js");

// 새로운 유저 추가
exports.join = (req, res, next) => {
	if(!req.body) {
		res.status(400).send({
			message: "Error : Join.join / Content can not be empty",
			state: 0
		});
	}
	
	Join.join(req, res, next, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : Join.join",
				state: 0
			});
		}
		else  {
			console.log(data);
			console.log(data.uID);
			res.send({
				message: "Success : Join.join",
				uID: data.uID,
				state: 1
			});
		}
	})			
};

// 아이디 중복확인
exports.doublecheck = (req, res) => {
	Join.doublecheck(req.params.id, (err) => {
		if(err) {
			if(err.message == "id is double") {
				res.send({
					message: err.message,
					state: 0
				});
			}
		
			else {
				res.status(500).send({
					message: err.message || "Error : Join.doublecheck",
					state: 0
				});
			}
		}

		else res.send({
			message: "Success : Join.doublecheck",
			state: 1
		});
	});
};