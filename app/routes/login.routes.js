module.exports = router => {
	const login = require("../controllers/login.controller.js");	

	router.post("/", login.login); // 유저 로그인
}