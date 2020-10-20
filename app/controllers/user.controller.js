const User = require("../models/user.model.js");

// 유저의 모든 정보를 받아온다.
exports.findById = (req, res) => {
	User.findById(req.params.uID, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : User.findById"
			});
		}

		else res.send({message: "Success : User.findById", data: data});
	});
};

// 유저 검색
exports.findByName = (req, res) => {
	Friend.findByName(req.params.friend_name, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : User.findByName"
			});
		}

		else res.send({message: "Success : User.findByName", data: data});
	});
}

// 새로운 유저 추가
exports.create = (req, res) => {
	if(!req.body) {
		res.status(400).send({
			message: "Error : User.create / Content can not be empty"
		});
	}

	// 유저 정보 생성
	const user = new User({
		name: req.body.name
		//email: req.body.email,
		//phone_number: req.body.phone_number,
		//age: req.body.age,
		//height: req.body.height,
		//weight: req.body.weight
	});

	User.create(user, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : User.create"
			});
		}
		else res.send({message: "Success : User.create", uID: data.uID});
	});
};

// 유저 정보 업데이트
exports.update = (req, res) => {
	User.update(req.params.uID, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error: User.update"
			});
		}
		else res.send("Success : User.update");
	});
};

// 유저 삭제
exports.remove = (req, res) => {
	User.remove(req.params.uID, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Error : User.remove"
			});
		}
		else res.send("Success : User.remove");
	});
};