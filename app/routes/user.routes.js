module.exports = router => {
	const users = require("../controllers/user.controller.js");
	const exerciseRecords = require("../controllers/exercise_record.controller.js");
	const challenge = require("../controllers/challenge.controller.js");
	const friend = require("../controllers/friend.controller.js");
	const alarm = require("../controllers/alarm.controller.js");
	
	router.get("/:uID", users.findById); // ���� �˻� (ID)
	
	router.put("/:uID", users.update); // ������ ���� ������Ʈ
	
	router.delete("/:uID", users.remove); // ���� ����

	router.get("/find/:uName", users.findByName); // ���� �˻� (�̸�)

	router.get("/exercise_record/:uID", exerciseRecords.findById); // ������ � ��� ��ȸ
		
	router.post("/exercise_record", exerciseRecords.create); // ������ � ��� �߰�
	
	router.post("/challenge/:uID", challenge.create); // ������ ������ ç���� �߰�
	
	router.put("/challenge/invite/:uID/:cID", challenge.accept); // ç���� �ʴ� �³�
	
	router.delete("/challenge/invite/:uID/:cID", challenge.decline); // ç���� �ʴ� ����
	
	router.put("/challenge/success/:uID/:cID", challenge.success); // ç���� �Ϸ�
		
	router.put("/challenge/fail/:uID/:cID", challenge.fail); // ç���� ���� �Ǵ� �ߵ� ����

	router.delete("/challenge/:uID/:cID", challenge.remove); // ���� �Ǵ� �ߵ� ������ ç���� ����

	router.get("/friend/:uID", friend.find); // ģ�� ��� ����
	
	router.delete("/friend/:uID/:friend_uID", friend.remove); // ģ�� ����
	
	router.post("/friend/request/:uID/:friend_uID", friend.request); // ģ�� �߰� ��û	 

	router.put("/friend/request/:uID/:friend_uID", friend.accept); // ģ�� ��û ����

	router.delete("/friend/request/:uID/:friend_uID", friend.decline) // ģ�� ��û ����

	router.put("/alarm/:uID", alarm.update); // �˶� ����

	









	// ������ ç���� ���� ��� ����
	// ������ � ��� ����
	//router.delete("/exercise_reccord/:uID", exerciseRecords.remove);
}