module.exports = router => {
	const users = require("../controllers/user.controller.js");
	const exerciseRecords = require("../controllers/exercise_record.controller.js");
	const challenge = require("../controllers/challenge.controller.js");
	const friend = require("../controllers/friend.controller.js");

	// 유저의 모든 정보를 받아온다.
	router.get("/:uID", users.findById);

	// 유저 검색
	router.get("/find/:uName", users.findByName);

	// 새로운 유저 추가
	router.post("/", users.create);

	// 유저의 정보 업데이트
	router.put("/:uID", users.update);

	// 유저 삭제
	router.delete("/:uID", users.remove);

	// 유저의 운동 기록 추가
	router.post("/exercise_record/:uID", exerciseRecords.create);

	// 유저의 운동 기록 삭제
	router.delete("/exercise_reccord/:uID", exerciseRecords.remove);

	// 유저의 챌린지 수행 기록 추가
	// + exercisrRecords.create 그대로 쓰면 될 것 같은데 어떻게 호출??
	//router.post("/challenge/:cID/:erID", challenge.createRecord);

	// 챌린지 승낙
	router.put("/challenge_invite/:uID/:cID", challenge.accept);

	// 챌린지 거절
	//router.delete("/challenge_invite/:uID/:cID", challenge.decline);

	// 유저가 생성한 챌린지 추가
	router.post("/challenge/:uID", challenge.create);

	// 챌린지 완료
	//router.put("/challenge/:uID/:cID", challenge.finish);

	// 챌린지 중도 포기
	//router.delete("/challenge/:uID/:cID", challenge.remove);

	// 친구 추가
	router.post("/friend/:uID/:friendID", friend.add);

	// 친구 제거
	router.delete("/friend/:uID/:friendID", friend.remove);
}