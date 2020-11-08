module.exports = router => {
	const passport = require('passport');
	const session = require('express-session');
	const login = require("../controllers/login.controller.js");	
	
	router.use(
		session({
			resave: false,
			saveUninitialized: false,
			secret: "pyh",
			cookie: {
				httpOnly: true,
				secure: false
			}
		})
	);

	router.use(passport.initialize());
	router.use(passport.session());

	router.post("/", login.login); // 유저 로그인
}