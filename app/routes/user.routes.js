module.exports = router => {
	const users = require("../controllers/user.controller.js");
	const exerciseRecords = require("../controllers/exercise_record.controller.js");
	const challenge = require("../controllers/challenge.controller.js");
	const friend = require("../controllers/friend.controller.js");
	const alarm = require("../controllers/alarm.controller.js");

	router.get("/find/:uName", users.findByName); // ���� �˻�
	
	router.put("/:uID", users.update); // ������ ���� ������Ʈ
	
	router.delete("/:uID", users.remove); // ���� ����
		
	router.post("/exercise_record", exerciseRecords.create); // ������ � ��� �߰�
	
	router.post("/challenge/:uID", challenge.create); // ������ ������ ç���� �߰�
	
	router.put("/challenge/invite/:uID/:cID", challenge.accept); // ç���� �ʴ� �³�
	
	router.delete("/challenge/invite/:uID/:cID", challenge.decline); // ç���� �ʴ� ����
	
	router.put("/challenge/success/:uID/:cID", challenge.success); // ç���� �Ϸ�
		
	router.put("/challenge/fail/:uID/:cID", challenge.fail); // ç���� ���� �Ǵ� �ߵ� ����

	router.delete("/challenge/:uID/:cID", challenge.remove); // ���� �Ǵ� �ߵ� ������ ç���� ����
	
	router.post("/friend/:uID/:friend_uID", friend.add); // ģ�� �߰�	 
	
	router.delete("/friend/:uID/:friend_uID", friend.remove); // ģ�� ����

	router.put("/alarm/:uID", alarm.update); // �˶� ����

	









	// ������ ç���� ���� ��� ����
	// ������ � ��� ����
	//router.delete("/exercise_reccord/:uID", exerciseRecords.remove);
}