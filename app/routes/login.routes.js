module.exports = router => {
	const login = require("../controllers/login.controller.js");
	
	router.get("/:id/:pw", login.login); // 유저 로그인
}
	