const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
//const sens = require('node-sens');

const app = express();

app.use(bodyParser.json());	
app.use(passport.initialize());

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

//**
// 인증번호는 Math.random()사용해서 그냥 무작위로 생성
// 라우팅 해서 인증번호 요청하는 걸 만들고 client에 무작위로 생성된 인증번호 넘겨준다.
// 유저가 앱에 제대로 입력했는지 넘겨받은 인증번호와 비교
/*
const ncp = new sens.NCPClient({
	phoneNumber: '01046762951',
	serviceId: 'ncp:sms:kr:261568520921:leehyeonjae',
	secretKey: 'HFMPlyxQry4K4huaeDpxP5qHRxrq3sDem4qaxdgt',
	accessKey: 'WdgolbzatS4hPPdg5Jgd'
});

app.get('/', async (req, res) => {
	const authRes = await ncp.sendSMS({
		to: '01046762951',
		content: 'hihi'
	});
	
	res.send(authRes);
	console.log(authRes);
});
*/
//**

app.get('/', async (req, res) => {
	res.send({
		message: 'welcome'
	});
})

app.listen(3000, () => {
	console.log('server is running on port 3000');
});