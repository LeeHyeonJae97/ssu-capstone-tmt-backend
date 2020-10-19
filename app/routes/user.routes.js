module.exports = router => {
	const users = require("../controllers/user.controller.js");
	const exerciseRecords = require("../controllers/exercise_record.controller.js");
	const challenge = require("../controllers/challenge.controller.js");
	const friend = require("../controllers/friend.controller.js");

	// ������ ��� ������ �޾ƿ´�.
	router.get("/:uID", users.findById);

	// ���� �˻�
	router.get("/find/:uName", users.findByName);

	// ���ο� ���� �߰�
	router.post("/", users.create);

	// ������ ���� ������Ʈ
	router.put("/:uID", users.update);

	// ���� ����
	router.delete("/:uID", users.remove);

	// ������ � ��� �߰�
	router.post("/exercise_record/:uID", exerciseRecords.create);

	// ������ � ��� ����
	router.delete("/exercise_reccord/:uID", exerciseRecords.remove);

	// ������ ç���� ���� ��� �߰�
	// + exercisrRecords.create �״�� ���� �� �� ������ ��� ȣ��??
	//router.post("/challenge/:cID/:erID", challenge.createRecord);

	// ç���� �³�
	router.put("/challenge_invite/:uID/:cID", challenge.accept);

	// ç���� ����
	//router.delete("/challenge_invite/:uID/:cID", challenge.decline);

	// ������ ������ ç���� �߰�
	router.post("/challenge/:uID", challenge.create);

	// ç���� �Ϸ�
	//router.put("/challenge/:uID/:cID", challenge.finish);

	// ç���� �ߵ� ����
	//router.delete("/challenge/:uID/:cID", challenge.remove);

	// ģ�� �߰�
	router.post("/friend/:uID/:friendID", friend.add);

	// ģ�� ����
	router.delete("/friend/:uID/:friendID", friend.remove);
}