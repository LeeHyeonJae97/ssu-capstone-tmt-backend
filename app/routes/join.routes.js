module.exports = router => {
	const join = require("../controllers/join.controller.js");	
	
	router.post("/", join.join); // 회원가입

	router.get("/doublecheck/:id", join.doublecheck); // 아이디 중복확인

	router.get("/auth/:phone_number", join.auth); // 휴대폰 인증

	router.get("/authCheck/:phone_number/:content", join.authCheck); // 휴대폰 인증 확인
}