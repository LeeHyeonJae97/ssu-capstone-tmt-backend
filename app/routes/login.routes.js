module.exports = router => {
	const login = require("../controllers/login.controller.js");
	
	router.get("/:id/:pw", login.login); // ���� �α���
}
	