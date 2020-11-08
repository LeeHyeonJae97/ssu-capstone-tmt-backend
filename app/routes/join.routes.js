module.exports = router => {
	const join = require("../controllers/join.controller.js");
	
	router.post("/", join.join); // 회원가입

	router.get("/doublecheck/:id", join.doublecheck); // 아이디 중복확인
}