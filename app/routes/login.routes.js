module.exports = router => {
	const login = require("../controllers/login.controller.js");	

	router.post("/", login.login); // ���� �α���
}