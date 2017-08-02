/**
 * Created by chrismanning on 7/5/17.
 */
var Users = require('../pages/utility/users').Users.logInUser();
var LoginPage = require('../pages/login.page');
var SideBar = require('../pages/sideBar');

describe('log in page',function () {
	it('log in page loads',function () {
		LoginPage.open();
		LoginPage.loginPageCheck();
	})
	it('can log in using email',function () {
		LoginPage.logIn(Users.email, Users.password);
	});
	it('displays app body upon email log in',function () {
		LoginPage.loginWait();
	});
	it('can log out of FlyWheel',function () {
		SideBar.useUserMenu('Sign Out');
	});
	it('cannot log in using made up credentials',function () {
		LoginPage.logIn('made','up');
		LoginPage.invalidTxtWait();
	});
	it('can log in using phone number',function () {
		LoginPage.logIn(Users.phone,Users.password);
	});
	it('displays app body upon email log in',function () {
		LoginPage.loginWait();
	});
});