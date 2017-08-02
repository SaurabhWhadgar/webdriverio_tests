var Users = require('../pages/utility/users').USER_LIST;
var LoginPage = require('../pages/login.page');
var WorkPage = require('../pages/work.page');
var SideBar = require('../pages/sideBar')
var taskInformation = require('../pages/utility/taskInformation');
var phraseGen = require('../pages/utility/phraseGen');
var supertest = require('supertest');
var api = supertest(browser.options.baseUrl);
var taskEntry, addTaskTest, siteToTest, status, changeStatusTaskTest,taskEdit,editTaskStatusTest;

describe('Task Status Tests', function () {
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
		LoginPage.logIn(Users[0].email, Users[0].password);
		LoginPage.loginWait();
		WorkPage.open();
		WorkPage.workPageCheck();
	});
	describe('in progress tests', function () {
		before(function () {
			status = "In Progress";
			taskEntry = ["summary", "site", "assignee"];
			addTaskTest = taskInformation.addTaskData(siteToTest);
			addTaskTest.assignee = Users[7].userName;
			changeStatusTaskTest = taskInformation.editTaskValues([""], status, addTaskTest);
			taskEdit = ["assignee"];
			editTaskStatusTest =
				taskInformation.editTaskValues(taskEdit, "On Hold", changeStatusTaskTest);
			editTaskStatusTest.assignee = Users[6].userName;
			WorkPage.quickAddTask(taskEntry, addTaskTest);
			WorkPage.checkTaskPresent(addTaskTest, true);
		});
		it('can change task status to In Progress',function () {
			WorkPage.changeTaskStatus(status);
		});
		it('does not display in progress task in the closed queue',function () {
			SideBar.useUserMenu('Sign Out');
			LoginPage.logIn(Users[0].email, Users[0].password);
			LoginPage.loginWait();
			WorkPage.open();
			WorkPage.workPageCheck();
			WorkPage.chooseTaskQueue('CLOSED');
			WorkPage.checkTaskPresent(changeStatusTaskTest, false);
		});
		it('does display in progress task in the open queue',function () {
			SideBar.useUserMenu('Sign Out');
			LoginPage.logIn(Users[0].email, Users[0].password);
			LoginPage.loginWait();
			WorkPage.open();
			WorkPage.workPageCheck();
			WorkPage.checkTaskPresent(changeStatusTaskTest, true);
		});
		it('displays the correct status for in progress task in task queue',function () {
			WorkPage.taskInQueueStatus(changeStatusTaskTest);
		});
		it('can edit a task assignee', function () {
			WorkPage.editATask(taskEdit, editTaskStatusTest);
		});
		it('displays task whose assignee has been changed as on hold',function () {
			WorkPage.taskInQueueStatus(editTaskStatusTest);
		});
	});
	describe('complete task tests',function () {
		before(function () {
			status = 'Complete';
			changeStatusTaskTest = taskInformation.editTaskValues([""], status, addTaskTest);
		});
		it('can complete a task',function () {
			WorkPage.changeTaskStatus(status);
		});
		it('does not display complete task in the open queue',function () {
			SideBar.useUserMenu('Sign Out');
			LoginPage.logIn(Users[0].email, Users[0].password);
			LoginPage.loginWait();
			WorkPage.open();
			WorkPage.workPageCheck();
			WorkPage.checkTaskPresent(changeStatusTaskTest, false);
		});
		it('does display complete task in the closed queue',function () {
			SideBar.useUserMenu('Sign Out');
			LoginPage.logIn(Users[0].email, Users[0].password);
			LoginPage.loginWait();
			WorkPage.open();
			WorkPage.workPageCheck();
			WorkPage.chooseTaskQueue('CLOSED');
			WorkPage.checkTaskPresent(changeStatusTaskTest, true);
		});
		it('displays the correct status for complete task in task queue',function () {
			WorkPage.taskInQueueStatus(changeStatusTaskTest);
		});
	})
});