const passport = require('passport')
const localStrategy = require('passport-local').Strategy;
const sql = require("./db.js").pool2;

// ���ο� ���� �߰�
exports.join = (req, res, next, result) => {
	passport.authenticate('local-join', (err, user, info) => {
		if(err) result(err, null);

		else if(!user) result(new Error(info.message), null);

		else result(null, {uID: user.uID});

	})(req, res, next);
};

// ���ο� ������� ���� �߰�
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

// ���̵� �ߺ�Ȯ��
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
