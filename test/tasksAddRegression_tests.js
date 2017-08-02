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
var taskEntry, addTaskTest, siteToTest, modalTasktest, locToTest1, editTaskTest, taskEdit,
    locToTest2,teamToTest;

describe('add task regression tests', function () {
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
				   locToTest1 = res.body.locations[0].name;
				   locToTest2 = res.body.locations[4].name;
				   teamToTest = res.body.team.name;
			   }
		   });
		LoginPage.open();
		LoginPage.loginPageCheck();
		LoginPage.logIn(Users.email, Users.password);
		LoginPage.loginWait();
		WorkPage.open();
		WorkPage.workPageCheck();
		taskEntry =
			["summary", "description", "site", "addedDays", "assignee", "location", "labels"];
		taskEdit = ["addedDays", "summary", "description", "location", "assignee", "labels"];
		addTaskTest = taskInformation.addTaskData(siteToTest);
		addTaskTest.location = locToTest1;
		modalTasktest = taskInformation.addTaskData(siteToTest);
		modalTasktest.location = locToTest1;
		editTaskTest = taskInformation.editTaskValues(taskEdit, "not started", addTaskTest);
		editTaskTest.location = locToTest2;
	});
	it('can create task using every available field in quick add task form', function () {
		WorkPage.quickAddTask(taskEntry, addTaskTest)
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
	it('can create task using every available field with Add Task Modal', function () {
		WorkPage.useAddTaskModal(taskEntry, modalTasktest)
	});
	it('displays Task created toast msg upon submitting to create task from Add Task Modal',
	   function () {
		   WorkPage.createTaskToastMsg();
	   });
	it('displays the newly created task in the All Task Queue', function () {
		SideBar.useUserMenu('Sign Out');
		LoginPage.logIn(Users.email, Users.password);
		LoginPage.loginWait();
		WorkPage.open();
		WorkPage.workPageCheck();
		WorkPage.checkTaskPresent(modalTasktest, true);
	});
	it('displays the correct details for complete Task created using Add Task Modal', function () {
		WorkPage.checkTaskDetails(taskEntry, modalTasktest);
	});
	it('displays the task to edit', function () {
		SideBar.useUserMenu('Sign Out');
		LoginPage.logIn(Users.email, Users.password);
		LoginPage.loginWait();
		WorkPage.open();
		WorkPage.workPageCheck();
		WorkPage.checkTaskPresent(addTaskTest, true);
	});
	it('can edit a task', function () {
		WorkPage.editATask(taskEdit, editTaskTest);
	});
	it('displays the edited task', function () {
		SideBar.useUserMenu('Sign Out');
		LoginPage.logIn(Users.email, Users.password);
		LoginPage.loginWait();
		WorkPage.open();
		WorkPage.workPageCheck();
		WorkPage.checkTaskPresent(editTaskTest, true);
	});
	it('displays the correct details for the edited task', function () {
		WorkPage.checkTaskDetails(taskEdit, editTaskTest);
	});
})