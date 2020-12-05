const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const sql = require("./db.js").pool2;
const sens = require('node-sens');

// 새로운 유저 추가
exports.join = (req, res, next, result) => {
	passport.authenticate('local-join', (err, user, info) => {
		if(err) result(err, null);

		else if(!user) result(new Error(info.message), null);

		else result(null, {uID: user.uID});

	})(req, res, next);
};

// 새로운 사용자의 정보 추가
passport.use('local-join', new localStrategy(
	{
		usernameField: "id",
		passwordField: "pw",
		passReqToCallback: true
    },
	async (req, id, pw, done) => {
		try {
			const conn = await sql.getConnection(async conn => conn);

			try {
				await conn.beginTransaction();
								
				let res = await conn.query("select id from users where id = ?", id);
				if(res[0].length) throw new Error("id is double");

				res = await conn.query("insert into users SET ?", {id: req.body.id, pw: req.body.pw, name: req.body.name, email: req.body.email,
					phone_number: req.body.phone_number, birth_date: req.body.birth_date, height: req.body.height, weight: req.body.weight, profile_image: req.body.profile_image});
				let uID = res[0].insertId;

				await conn.query("insert into alarms SET ?", {uID: uID});

				await conn.commit();
				done(null, {uID: uID});				
			}
			catch(err) {
				await conn.rollback();
				done(err, false);
			}
			finally {
				conn.release();
			}
		}
		catch(err) {
			done(err, false);
		}
    })
);

// 아이디 중복확인
exports.doublecheck = async (id, result) => {
	try {
		const conn = await sql.getConnection(async conn => conn);

		try {
			let res = await conn.query("select id from users where id = ?", id);
			if(res[0].length) throw new Error("id is double");

			else result(null);
		}
		catch(err) {
			result(err);
		}
		finally {
			conn.release();
		}
	}
	catch(err) {
		result(err);
	}
};

// 휴대폰 인증
const ncp = new sens.NCPClient({
	phoneNumber: '01046762951',
	serviceId: 'ncp:sms:kr:261568520921:leehyeonjae',
	secretKey: 'HFMPlyxQry4K4huaeDpxP5qHRxrq3sDem4qaxdgt',
	accessKey: 'WdgolbzatS4hPPdg5Jgd'
});
const auths = new Array();

exports.auth = async (phone_number, result) => {
	const content = Math.floor(Math.random() * (9999 - 1000) + 1000).toString();	
	const authRes = await ncp.sendSMS({
		to: phone_number.toString(),
		content: 'AUTH : ' + content
	});	

	auths.push({
		phone_number: phone_number,
		content: content
	});

	console.log(auths);

	result(null);
}

exports.authCheck = (phone_number, content, result) => {
	for(i = 0; i < auths.length; i++) {
		if(auths[i].phone_number === phone_number && auths[i].content === content.toString()) {
			auths.splice(i, 1);
			console.log(auths);
			result(null);
			return;
		}
	}
	console.log(auths);

	result(new Error('Wrong auth check'))
}