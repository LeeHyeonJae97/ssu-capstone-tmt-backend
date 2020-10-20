const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const user_router = express.Router();

app.use(bodyParser.json());

// 扼快泼
require("./routes/user.routes.js")(user_router);

app.use("/users", user_router);

// 风飘 其捞瘤 立加
app.get('/', (req, res) => {
	res.json({ message: 'welcome' });
});

app.listen(3000, () => {
	console.log('server is running on port 3000');
});