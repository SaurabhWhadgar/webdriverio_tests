/**
 * Created by chrismanning on 7/12/17.
 */
var Users = require('../pages/utility/users').Users.logInUser();
var LoginPage = require('../pages/login.page');
var WorkPage = require('../pages/work.page');
var SideBar = require('../pages/sideBar')
var taskInformation = require('../pages/utility/taskInformation');
var supertest = require('supertest');
var api = supertest(browser.options.baseUrl);
var taskEntry, addTaskTest, siteToTest, modalTasktest;

describe('tasks page smoke tests', function () {
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
			   }
		   });
		LoginPage.open();
		LoginPage.loginPageCheck();
		LoginPage.logIn(Users.email, Users.password);
		LoginPage.loginWait();
		WorkPage.open();
		WorkPage.workPageCheck();
		taskEntry = ["summary", "description", "site"];
		addTaskTest = taskInformation.addTaskData(siteToTest);
		modalTasktest = taskInformation.addTaskData(siteToTest);
	});
	it('can create basic task', function () {
		WorkPage.quickAddTask(taskEntry, addTaskTest);
	});
	it('displays Task created toast msg upon submitting to create task', function () {
		WorkPage.createTaskToastMsg();
	});
	it('displays the newly created task in the All Task Queue', function () {
		WorkPage.checkTaskPresent(addTaskTest, true);
	});
	it('displays the correct Task details for the basic task', function () {
		WorkPage.checkTaskDetails(taskEntry, addTaskTest);
	});
	it('can create basic task using Add Task Modal', function () {
		WorkPage.useAddTaskModal(taskEntry,modalTasktest)
	});
	it('displays Task created toast msg upon submitting to create task from Add Task Modal', function () {
		WorkPage.createTaskToastMsg();
	});
	it('displays the task created using the Add Task Modal in the all tasks queue',function () {
		SideBar.useUserMenu('Sign Out');
		LoginPage.logIn(Users.email, Users.password);
		LoginPage.loginWait();
		WorkPage.open();
		WorkPage.workPageCheck();
		WorkPage.checkTaskPresent(modalTasktest, true);
	});
	it('displays the correct details for the newly created Add Task Modal test',function () {
		WorkPage.checkTaskDetails(taskEntry, modalTasktest);
	})
})