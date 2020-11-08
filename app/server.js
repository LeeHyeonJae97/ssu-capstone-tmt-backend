const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const app = express();

app.use(bodyParser.json());	
app.use(
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
app.use(passport.initialize());
app.use(passport.session());

// 로그인
const login_router = express.Router();
require("./routes/login.routes.js")(login_router);
app.use("/login", login_router);

// 회원가입
const join_router = express.Router();
require("./routes/join.routes.js")(join_router);
app.use("/join", join_router);

// 유저 정보
const user_router = express.Router();
require("./routes/user.routes.js")(user_router);
app.use("/user", user_router);

app.get('/', (req, res) => {
	res.json({ message: 'welcome' });
});

app.listen(3000, () => {
	console.log('server is running on port 3000');
});