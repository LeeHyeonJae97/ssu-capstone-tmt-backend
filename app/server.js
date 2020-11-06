const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// 로그인
const login_router = express.Router();
require("./routes/login.routes.js")(login_router);
app.use("/login", login_router);

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