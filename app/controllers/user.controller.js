const User = require("../models/user.model.js");

// 유저의 모든 정보를 받아온다.
exports.findById = (req, res) => {
	User.findById(req.params.uID, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Some error occurred while finding user."
			});
		}

		else res.send(data);		
	});
};

// 유저 검색
// 친구의 ID 포함 각종 정보 전달
exports.findByName = (req, res) => {
	Friend.findByName(req.params.friend_name, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Some error occured while finding user by name"
			});
		}

		else res.send(data);
	});
}

// 새로운 유저 추가
exports.create = (req, res) => {
	// body에 아무런 정보도 없는 경우
	if(!req.body) {
		res.status(400).send({
			message: "Content can not be empty"
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

	// 생성한 정보를 토대로 데이터베이스에 저장
	User.create(user, (err, data) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Some error occurred while creating new user."
			});
		}
		else res.send(data.uID);
	});
};

// 유저 정보 업데이트
exports.update = (req, res) => {
	User.update(req.params.uID, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Some error occured while updating the user."
			});
		}
		else res.send("update a user");
	});
};

// 유저 삭제
exports.remove = (req, res) => {
	User.remove(req.params.uID, (err) => {
		if(err) {
			res.status(500).send({
				message: err.message || "Some error ocuured while removing the user"
			});
		}
		else res.send("remove a user");
	});
};