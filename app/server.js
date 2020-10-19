const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const user_router = express.Router();
//const challenge_router = express.Router();

app.use(bodyParser.json());

// ��Ʈ ������ ����
app.get('/', (req, res) => {
	res.json({ message: 'welcome' });
});

// �����
require("./routes/user.routes.js")(user_router);
//require("./routes/challenge.routes.js")(challenge_router);

app.use("/users", user_router);
//app.use("/challenge", challenge_router);

app.listen(3000, () => {
	console.log('server is running on port 3000');
});