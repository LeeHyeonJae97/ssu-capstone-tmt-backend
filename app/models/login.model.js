const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const sql = require("./db.js").pool2;

// 로그인
exports.login = (req, res, next, result) => {
	passport.authenticate('local-login', (err, user, info) => {
		if(err) result(err, null);

		else if(!user) result(new Error(info.message), null);		

		else result(null, user);
		
	})(req, res, next);
};

// 로그인한 유저의 정보 전달
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

			// 친구 요청 정보
			let [rows_friend_request, fields_friend_request] = await conn.quest("select uID from request where friend_uID = ?", uID);
			if(rows_friend_request.length) {
				for(i = 0; i < rows_friend_request; i++) {
					[rows_friend_request[i], fields_friend_request[i]] = await conn.query("select * from users where uID = ?", rows_friend_request[i].uID);
				}
			}

			result(null, {users: rows_users, exercise: rows_exercise_records, goingon: rows_goingon, success: rows_success, failed: rows_failed, invited: rows_invited, friends: rows_friends, request: rows_friend_request});
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

// 사용자 인증
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
				let [rows, fields] = await conn.query("select uID from users where id = ? and pw = ?", [id, pw]);		

				if(rows.length) {
					let uID = rows[0].uID;

					// 유저 정보				
					let [rows_users, fields_users] = await conn.query("select uID, name, email, phone_number, birth_date, height, weight, profile_image, public from users where uID = ?", uID);
					if(!rows_users.length) throw new Error("No AffectedRows");

					// 운동기록
					let [rows_exercise_records, fields_exercise_records] = await conn.query("select * from exercise_records where uID = ?", uID);						

					// 진행 중인 챌린지 정보
					//let rows_goingonRoutine = new Array();
					let [rows_goingon, fields_goingon] = await conn.query("select cID from goingon where uID = ?", uID);					
					if(rows_goingon.length) {			
						for(i = 0; i < rows_goingon.length; i++) {
							let [rows_goingonRoutine, fields_goingonRoutine] = await conn.query("select eID, target_total_count from routines where cID = ?", rows_goingon[i].cID);
							[rows_goingon, fields] = await conn.query("select * from challenges where cID = ?", rows_goingon[i].cID);
							
							rows_goingon[i] = {challenge: rows_goingon[i], routine: rows_goingonRoutine};					
						}
					}

					// 완료한 챌린지 정보
					//let rows_successRoutine = new Array();
					let [rows_success, fields_success] = await conn.query("select cID from success where uID = ?", uID);
					if(rows_success.length) {
						for(i = 0; i < rows_success.length; i++) {
							let [rows_successRoutine, fields_successRoutine] = await conn.query("select eID, target_total_count from routines where cID = ?", rows_success[i].cID);
							[rows_success, fields_success]  = await conn.query("select * from challenges where cID = ?", rows_success[i].cID);

							rows_success[i] = {challenge: rows_success[i], routine: rows_successRoutine};
						}
					}

					// 실패한 챌린지 정보
					//let rows_failedRoutine = new Array();
					let [rows_failed, fields_failed] = await conn.query("select cID from failed where uID = ?", uID);
					if(rows_failed.length) {
						for(i = 0; i < rows_failed.length; i++) {
							let [rows_failedRoutine, fields_failedRoutine] = await conn.query("select eID, target_total_count from routines where cID = ?", rows_failed[i].cID);
							[rows_failed, fields_failed]  = await conn.query("select * from challenges where cID = ?", rows_failed[i].cID);

							rows_failed[i] = {challenge: rows_failed[i], routine: rows_failedRoutine};
						}
					}

					// 초대받은 챌린지 정보
					//let rows_invitedRoutine = new Array();
					let [rows_invited, fields_invited] = await conn.query("select cID from invited where uID = ?", uID);
					if(rows_invited.length) {			
						for(i = 0; i< rows_invited.length; i++) {
							let [rows_invitedRoutine, fields_invitedRoutine] = await conn.query("select eID, target_total_count from routines where cID = ?", rows_invited[i].cID);
							[rows_invited, fields_invited] = await conn.query("select * from challenges where cID = ?", rows_invited[i].cID);

							rows_invited[i] = {challenge: rows_invited[i], routine: rows_invitedRoutine};
						}
					}

					// 친구 정보
					let [rows_friends, fields_friends] = await conn.query("select friend_uID from friends where uID = ?", uID);			
					if(rows_friends.length) {
						for(i = 0; i < rows_friends.length; i++) {
							let [rows_friendPublic, fields_friendPublic] = await conn.query("select public from users where uID = ?", rows_friends[i].friend_uID);

							if(rows_friendPublic[0].public) {							
								let [rows_friendInfo, fields_friendInfo] = await conn.query("select * from users where uID = ?", rows_friends[i].friend_uID);
								rows_friends[i] = rows_friendInfo[0];
							}
							else
								rows_friends[i] = {uID: rows_friends[i].friend_uID};
						}
					}

					// 받은 친구 요청 정보
					let [rows_requested, fields_requested] = await conn.query("select uID from request where friend_uID = ?", uID);
					if(rows_requested.length) {
						for(i = 0; i < rows_requested.length; i++) {
							let [rows_friendPublic, fields_friendPublic] = await conn.query("select public from users where uID = ?", rows_requested[i].uID);

							if(rows_friendPublic[0].public) {							
								let [rows_friendInfo, fields_friendInfo] = await conn.query("select * from users where uID = ?", rows_requested[i].uID);
								rows_requested[i] = rows_friendInfo[0];
							}
							else
								rows_requested[i] = {uID: rows_requested[i].uID};
						}
					}
					
					// 보낸 친구 요청 정보
					let [rows_request, fields_request] = await conn.query("select friend_uID from request where uID = ?", uID);
					if(rows_request.length) {
						for(i = 0; i < rows_request.length; i++) {
							let [rows_friendPublic, fields_friendPublic] = await conn.query("select public from users where uID = ?", rows_request[i].friend_uID);

							if(rows_friendPublic[0].public) {							
								let [rows_friendInfo, fields_friendInfo] = await conn.query("select * from users where uID = ?", rows_request[i].friend_uID);
								rows_request[i] = rows_friendInfo[0];
							}
							else
								rows_request[i] = {uID: rows_request[i].friend_uID};
						}
					}

					// 알람 정보
					let [rows_alarm, fields_alarm] = await conn.query("select time, active from alarms where uID = ?", uID);
					
					// 모든 운동 정보
					let [rows_exercise, fields_exercise] = await conn.query("select * from exercises");

					done(null, {users: rows_users[0], exercise_records: rows_exercise_records, goingon: rows_goingon, success: rows_success, failed: rows_failed,
						invited: rows_invited, friends: rows_friends, requested: rows_requested, request: rows_request, alarm: rows_alarm, exercises: rows_exercise});
				}
				else {
					done(null, false, {message: "Error : your login info is not found"})
				}
			}
			catch(err) {
				done(err, false);
			}
			finally {
				conn.release();
			}
		}
		catch(err) {
			done(err, false);
		}
	}
));