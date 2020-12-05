const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');

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

app.get('/', (req, res) => {
	res.send({
		message: 'welcome'
	});
})

app.listen(3000, () => {
	console.log('server is running on port 3000');	
	console.log();
});