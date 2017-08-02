/**
 * Created by chrismanning on 7/12/17.
 */
var phraseGen = require('./phraseGen');
var displayDates = require('./displayDates');
var Misc = require('./misc');

var user1 = "Test User1";
var user2 = "Test User3";
var days = 3;
var assignee = "Test User3";
var location = "Suite 900"
var labels = ["label 1", "label 2", "label 3", "label 4"];
var site = "site 3";
var daysEdit = 15;
var assigneeEdit = "Test User4";
var labelEdit = ["label 5", "label 6", "label 7", "label 8"];
var locationEdit = "Suite 901";
var comment = phraseGen.randomPhrase();
var minUnits = ["00", "15", "30", "45"];
var periodUnits = ["AM", "PM"];

function displayDate(days, stripZero) {
	return displayDates.displayDate(days, stripZero);
};

function taskData(summary, description, location, locationOption, labels, assignee, addedDays,
                  displayDate, site, taskDetailsSummary, taskDetailsDescription,
                  existingCommentAuthor, existingCommentDateTime, existingCommentText, taskStatus,
                  flag) {
	this.summary = summary;
	this.description = description;
	this.location = location;
	this.locationOption = locationOption;
	this.labels = labels;
	this.assignee = assignee;
	this.addedDays = addedDays;
	this.displayDate = displayDate;
	this.site = site;
	this.taskDetailsSummary = taskDetailsSummary;
	this.taskDetailsDescription = taskDetailsDescription;
	this.existingCommentAuthor = existingCommentAuthor;
	this.existingCommentDateTime = existingCommentDateTime;
	this.existingCommentText = existingCommentText;
	this.taskStatus = taskStatus;
	this.flag = flag;
};

function cloneTaskData(obj) {
	return new taskData(obj["summary"], obj["description"], obj["location"], obj["location"],
	                    obj["labels"], obj["assignee"], obj["addedDays"], obj["displayDate"],
	                    obj["summary"], obj["description"]);
};

module.exports = {
	addTaskData(site) {
		var addTask = new taskData(phraseGen.randomPhrase(), phraseGen.randomPhrase(), location,
		                           location, labels, assignee, days, displayDate(days, false),
		                           site);
		addTask.requesterInput = phraseGen.randomName();
		addTask.blockTime = [Misc.getRandomIntInclusive(1, 12).toString().trim(),
		                     minUnits[Misc.getRandomIntInclusive(0, 3)],
		                     periodUnits[Misc.getRandomIntInclusive(0, 1)]];
		addTask.blockDate = displayDates.blockTaskDate(days);
		addTask.blockDisplayTime =
			addTask.blockTime[0] + ':' + addTask.blockTime[1] + ' ' + addTask.blockTime[2];
		return addTask;
	},

	addTaskDatePickerData(daysAdded,site) {
		return new taskData(phraseGen.randomPhrase(), phraseGen.randomPhrase(), location, location,
		                    labels, assignee, daysAdded, displayDate(daysAdded, false),site);
	},

	editTaskValues(value, status, obj) {
		var editTaskTest = cloneTaskData(obj);
		for (var count = 0; count < value.length; count++) {
			if (value[count] == "summary") {
				editTaskTest.summary = phraseGen.randomPhrase();
			} else if (value[count] == "description") {
				editTaskTest.description = phraseGen.randomPhrase();
			} else if (value[count] == "location" || value[count] == "locationOption") {
				editTaskTest.location = locationEdit;
				editTaskTest.locationOption = locationEdit;
			} else if (value[count] == "addedDays") {
				editTaskTest.addedDays = daysEdit;
				editTaskTest.displayDate =
					displayDates.displayDate(editTaskTest["addedDays"], false)
				editTaskTest.displayDateAlt =
					displayDates.commentDate(editTaskTest["addedDays"], true);
			} else if (value[count] == "assignee") {
				editTaskTest.assignee = assigneeEdit;
			} else if (value[count] == "labels") {
				editTaskTest.labels = labelEdit;
			}
		}
		editTaskTest.requesterInput = obj.requesterInput;
		editTaskTest.blockDate = obj.blockDate;
		editTaskTest.blockTime = obj.blockTime;
		editTaskTest.blockDisplayTime = obj.blockDisplayTime;
		editTaskTest.existingCommentAuthor = user2;
		editTaskTest.existingCommentDateTime = displayDates.commentDate(0, false);
		editTaskTest.existingCommentText = comment;
		editTaskTest.taskStatus = status;
		if (editTaskTest["taskStatus"] == "blocked") {
			editTaskTest.flag = "taskBlocked"
		} else if (editTaskTest["taskStatus"] == "Complete") {
			editTaskTest.flag = "taskComplete"
		} else if (editTaskTest["taskStatus"] == "canceled") {
			editTaskTest.flag = "taskCanceled"
		} else {
		}

		return editTaskTest;
	}
}