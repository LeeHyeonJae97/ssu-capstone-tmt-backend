module.exports = router => {
	const join = require("../controllers/join.controller.js");	
	
	router.post("/", join.join); // ȸ������

	router.get("/doublecheck/:id", join.doublecheck); // ���̵� �ߺ�Ȯ��

	router.get("/auth/:phone_number", join.auth); // �޴��� ����

	router.get("/authCheck/:phone_number/:content", join.authCheck); // �޴��� ���� Ȯ��
}