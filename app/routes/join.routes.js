module.exports = router => {
	const join = require("../controllers/join.controller.js");
	
	router.post("/", join.join); // ȸ������

	router.get("/doublecheck/:id", join.doublecheck); // ���̵� �ߺ�Ȯ��
}