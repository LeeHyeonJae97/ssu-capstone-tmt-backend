const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const sql = require("./db.js").pool2;

exports.login = (req, res, next, result) => {
	// 로그인
	passport.authenticate('local-login', (err, user, info) => {
		if(err) result(err, null);

		else if(!user) result(new Error(info.message), null);		

		else {			
			req.logIn(user, (err) => {
				if(err) { next(err); }

				else result(null, user.uID);				
			});
		}
	})(req, res, next);
};

exports.getInfo = async (uID, result) => {
	// 정보 GET
	try {
		const conn = await sql.getConnection(async conn => conn);

		try {
			// 유저 정보
			let [rows_users, fields_users] = await conn.query("select * from users where uID = ?", uID);
			if(!rows_users.length) throw new Error("No AffectedRows");

			// 운동기록
			let [rows_exercise_records, fields_exercise_reocrds] = await conn.query("select * from exercise_records where uID = ?", uID);						

			// 진행 중인 챌린지 정보
			let [rows_goingon, fields_goingon] = await conn.query("select cID from goingon where uID = ?", uID);
			if(rows_goingon.length) {			
				for(i = 0; i < rows_goingon.length; i++) {
					[rows_goingon[i], fields_goingon[i]] = await conn.query("select * from challenges where cID = ?", rows_goingon[i].cID);
				}
			}

			// 완료한 챌린지 정보
			let [rows_success, fields_success] = await conn.query("select cID from success where uID = ?", uID);
			if(rows_success.length) {
				for(i = 0; i < rows_success.length; i++) {
					[rows_success[i], fields__success[i]]  = await conn.query("select * from challenges where cID = ?", rows_success[i].cID);
				}
			}

			// 실패한 챌린지 정보
			let [rows_failed, fields_failed] = await conn.query("select cID from failed where uID = ?", uID);
			if(rows_failed.length) {
				for(i = 0; i < rows_failed.length; i++) {
					[rows_failed[i], fields_failed[i]]  = await conn.query("select * from challenges where cID = ?", rows_failed[i].cID);
				}
			}

			// 초대받은 챌린지 정보
			let [rows_invited, fields_invited] = await conn.query("select cID from invited where uID = ?", uID);
			if(rows_invited.length) {			
				for(i = 0; i< rows_invited.length; i++) {
					[rows_invited[i], fields_invited[i]]  = await conn.query("select * from challenges where cID = ?", rows_invited[i].cID);
				}
			}

			// 친구 정보
			let [rows_friends, fields_friends] = await conn.query("select friend_uID from friends where uID = ?", uID);			
			if(rows_friends.length) {
				for(i = 0; i < rows_friends.length; i++) {
					[rows_friends[i], fields_friends[i]] = await conn.query("select * from users where uID = ?", rows_friends[i].friend_uID);
				}
			}

			result(null, {users: rows_users, exercise: rows_exercise_records, goingon: rows_goingon, success: rows_success, failed: rows_failed, invited: rows_invited, friends: rows_friends});			
		}
		catch(err) {
			result(err, null);
		}
		finally {
			conn.release();
		}
	}
	catch(err) {
		result(err, null);
	}
};

passport.serializeUser((user, done) => {
    console.log("passport session save: ", user.id)
    done(null, user.id);
});

 passport.deserializeUser((id, done) => {
	console.log("asdjkl");
    console.log("passport session get id: ", id);
    done(null,id);
});

passport.use('local-login', new localStrategy(
	{
		usernameField: "id",
		passwordField: "pw",
		passReqToCallback: true
	},
	async (req, id, pw, done) => {
		try {
			const conn = await sql.getConnection(async conn => conn);			

			try {
				let [rows, fields] = await conn.query("select * from login where id = ? and pw = ?", [id, pw]);								

				if(rows.length) {
					done(null, rows[0])
				}
				else {
					done(null, false, {message: "Error : your login info is not found"})
				}
			}
			catch(err) {
				done(null, false, err);
			}
			finally {
				conn.release();
			}
		}
		catch(err) {
			done(null, false, err);
		}
	}
));