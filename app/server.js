const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
//const sens = require('node-sens');

const app = express();

app.use(bodyParser.json());	
app.use(passport.initialize());

// �α���
const login_router = express.Router();
require("./routes/login.routes.js")(login_router);
app.use("/login", login_router);

// ȸ������
const join_router = express.Router();
require("./routes/join.routes.js")(join_router);
app.use("/join", join_router);

// ���� ����
const user_router = express.Router();
require("./routes/user.routes.js")(user_router);
app.use("/user", user_router);

//**
// ������ȣ�� Math.random()����ؼ� �׳� �������� ����
// ����� �ؼ� ������ȣ ��û�ϴ� �� ����� client�� �������� ������ ������ȣ �Ѱ��ش�.
// ������ �ۿ� ����� �Է��ߴ��� �Ѱܹ��� ������ȣ�� ��
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