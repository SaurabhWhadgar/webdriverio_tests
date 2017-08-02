  /**
 * Created by chrismanning on 7/6/17.
 */
var Users = require('../pages/utility/users').USER_LIST;
var LoginPage = require('../pages/login.page');
var SideBar = require('../pages/sideBar');
var UserProfile = require('../pages/userProfile');
var userData = require('../pages/utility/userData');
var supertest = require('supertest');
var api = supertest(browser.options.baseUrl);
var siteToTest;
var teamToTest;
var clientToTest;
var locToTest1;
var locToTest2;
var tu4;
var updateUser;

describe('user profile modal', function () {
	before(function () {
		api.post('/api/testReset/users?team=' + browser.options.testTeam + '&site='
		         + browser.options.testSite)
		   .set('Accept', 'application/json')
		   .send({})
		   .expect('Content-Type', /json/)
		   .expect(200)
		   .end(function (err, res) {
			   if (err) {
				   console.log("error = " + err + " & res = " + res)
				   throw new Error(" no responce from spectrum: " + err.stack + "\n -----------");
			   }
			   else {
				   siteToTest = res.body.site.name;
				   teamToTest = res.body.team.name;
				   clientToTest = res.body.client.name;
				   locToTest1 = res.body.locations[0].name;
				   locToTest2 = res.body.locations[1].name;
				   tu4 = userData.tu004(teamToTest, siteToTest);
				   updateUser = userData.addUserData("Admin", [teamToTest]);
			   }
		   });
		LoginPage.open();
		LoginPage.loginPageCheck();
		LoginPage.logIn(Users[1].email, Users[1].password);
		LoginPage.loginWait();
	});
	it('can open user profile', function () {
		SideBar.useUserMenu('Your Profile');
	});
	it('displays user profile menu', function () {
		UserProfile.profileModalCheck.waitForVisible(30000)
	});
	it('clears email field', function () {
		UserProfile.useEditProfileModal(updateUser);
	});
	it('displays the Profile updated toast msg', function () {
		UserProfile.updateProfileToastMsg();
	});
	it('cannot log in using old email', function () {
		SideBar.useUserMenu('Sign Out');
		LoginPage.logIn(Users[1].email, Users[1].password);
		LoginPage.invalidTxtWait();
	});
	it('cannot log in using old phone', function () {
		LoginPage.logIn(Users[1].phone, Users[1].password);
		LoginPage.invalidTxtWait();
	});
	it('can log in using new email', function () {
		LoginPage.logIn(updateUser['userEmail'], tu4['password']);
		LoginPage.loginWait();
	});
	it('can log in using new phone', function () {
		SideBar.useUserMenu('Sign Out');
		LoginPage.logIn(updateUser['userPhone'], tu4['password']);
		LoginPage.loginWait();
	});
	it('can change password', function () {
		SideBar.useUserMenu('Your Profile');
		UserProfile.updateUserPassword(tu4['password'], updateUser['password'],
		                               updateUser['password']);
	});
	it('displays Password updated toast msg', function () {
		UserProfile.updatePWordToastMsg();
	});
	it('cannot log in using old password', function () {
		UserProfile.editProfileButtons('Cancel').click();
		SideBar.useUserMenu('Sign Out');
		LoginPage.logIn(updateUser['userPhone'], tu4['password']);
		LoginPage.invalidTxtWait();
	});
	it('can log in using updated password', function () {
		LoginPage.logIn(updateUser['userPhone'], updateUser['password']);
		LoginPage.loginWait();
	});
	it('cannot change password when incorrect current password entered', function () {
		SideBar.useUserMenu('Your Profile');
		UserProfile.updateUserPassword(tu4['password'], updateUser['password'],
		                               updateUser['password']);
		UserProfile.updateBadPWordToastMsg();
	});
	it('cannot change password when new passwords do not match', function () {
		UserProfile.updateUserPassword(updateUser['password'], 'foo', 'bar');
		UserProfile.passwordsDontMatch();
	});
})