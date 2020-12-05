module.exports = router => {
	const users = require("../controllers/user.controller.js");
	const exerciseRecords = require("../controllers/exercise_record.controller.js");
	const challenge = require("../controllers/challenge.controller.js");
	const friend = require("../controllers/friend.controller.js");
	const alarm = require("../controllers/alarm.controller.js");
	
	router.get("/:uID", users.findById); // 유저 검색 (ID)
	
	router.put("/:uID", users.update); // 유저의 정보 업데이트
	
	router.delete("/:uID", users.remove); // 유저 삭제

	router.get("/find/:uName", users.findByName); // 유저 검색 (이름)

	router.get("/exercise_record/:uID", exerciseRecords.findById); // 유저의 운동 기록 조회
		
	router.post("/exercise_record", exerciseRecords.create); // 유저의 운동 기록 추가
	
	router.post("/challenge/:uID", challenge.create); // 유저가 생성한 챌린지 추가
	
	router.put("/challenge/invite/:uID/:cID", challenge.accept); // 챌린지 초대 승낙
	
	router.delete("/challenge/invite/:uID/:cID", challenge.decline); // 챌린지 초대 거절
	
	router.put("/challenge/success/:uID/:cID", challenge.success); // 챌린지 완료
		
	router.put("/challenge/fail/:uID/:cID", challenge.fail); // 챌린지 실패 또는 중도 포기

	router.delete("/challenge/:uID/:cID", challenge.remove); // 실패 또는 중도 포기한 챌린지 삭제

	router.get("/friend/:uID", friend.find); // 친구 목록 갱신
	
	router.delete("/friend/:uID/:friend_uID", friend.remove); // 친구 제거
	
	router.post("/friend/request/:uID/:friend_uID", friend.request); // 친구 추가 요청	 

	router.put("/friend/request/:uID/:friend_uID", friend.accept); // 친구 요청 수락

	router.delete("/friend/request/:uID/:friend_uID", friend.decline) // 친구 요청 거절

	router.put("/alarm/:uID", alarm.update); // 알람 수정

	









	// 유저의 챌린지 수행 기록 삭제
	// 유저의 운동 기록 삭제
	//router.delete("/exercise_reccord/:uID", exerciseRecords.remove);
}