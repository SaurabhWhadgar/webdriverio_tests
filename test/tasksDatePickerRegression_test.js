/**
 * Created by chrismanning on 7/14/17.
 */
var Users = require('../pages/utility/users').Users.logInUser();
var LoginPage = require('../pages/login.page');
var WorkPage = require('../pages/work.page');
var SideBar = require('../pages/sideBar')
var taskInformation = require('../pages/utility/taskInformation');
var supertest = require('supertest');
var api = supertest(browser.options.baseUrl);
var taskEntry, addTaskTest, siteToTest;

describe('add task date picker regression tests', function () {
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
			   } else {
				   siteToTest = res.body.site.name;
			   }
		   });
		LoginPage.open();
		LoginPage.loginPageCheck();
		LoginPage.logIn(Users.email, Users.password);
		LoginPage.loginWait();
		WorkPage.open();
		WorkPage.workPageCheck();
	});
	describe('add task now', function () {
		before(function () {
			taskEntry = ["now", "summary", "site"];
			addTaskTest = taskInformation.addTaskDatePickerData(0, siteToTest);
		});
		it('can create task using date picker now function', function () {
			WorkPage.quickAddTask(taskEntry, addTaskTest)
		});
		it('displays Task created toast msg upon submitting to create task', function () {
			WorkPage.createTaskToastMsg();
		});
		it('displays the newly created task in the All Task Queue', function () {
			WorkPage.checkTaskPresent(addTaskTest, true);
		});
		it('displays the correct Task details for the now task', function () {
			WorkPage.checkTaskDetails(taskEntry, addTaskTest);
		});
	});
	describe('add task today', function () {
		before(function () {
			taskEntry = ["today", "summary", "site"];
			addTaskTest = taskInformation.addTaskDatePickerData(0, siteToTest);
		});
		it('can create task using date picker today function', function () {
			WorkPage.quickAddTask(taskEntry, addTaskTest)
		});
		it('displays Task created toast msg upon submitting to create task', function () {
			WorkPage.createTaskToastMsg();
		});
		it('displays the newly created task in the All Task Queue', function () {
			SideBar.useUserMenu('Sign Out');
			LoginPage.logIn(Users.email, Users.password);
			LoginPage.loginWait();
			WorkPage.open();
			WorkPage.workPageCheck();
			WorkPage.checkTaskPresent(addTaskTest, true);
		});
		it('displays the correct Task details for the now task', function () {
			WorkPage.checkTaskDetails(taskEntry, addTaskTest);
		});
	});
	describe('add task tomorrow', function () {
		before(function () {
			taskEntry = ["tomorrow", "summary", "site"];
			addTaskTest = taskInformation.addTaskDatePickerData(1, siteToTest);
		});
		it('can create task using date picker now function', function () {
			WorkPage.quickAddTask(taskEntry, addTaskTest)
		});
		it('displays Task created toast msg upon submitting to create task', function () {
			WorkPage.createTaskToastMsg();
		});
		it('displays the newly created task in the All Task Queue', function () {
			SideBar.useUserMenu('Sign Out');
			LoginPage.logIn(Users.email, Users.password);
			LoginPage.loginWait();
			WorkPage.open();
			WorkPage.workPageCheck();
			WorkPage.checkTaskPresent(addTaskTest, true);
		});
		it('displays the correct Task details for the now task', function () {
			WorkPage.checkTaskDetails(taskEntry, addTaskTest);
		});
	});
});