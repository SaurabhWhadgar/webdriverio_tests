'use strict';

var phraseGen = require('./phraseGen');

function userData(username, userFName, userLName, userEmail, userPhone, enabled, role, teams,
                  disabledMsg1, disabledMsg2) {
	this.username = username;
	this.userFName = userFName;
	this.userLName = userLName;
	this.userEmail = userEmail;
	this.userPhone = userPhone;
	this.enabled = enabled;
	this.role = role;
	this.teams = teams;
	this.disabledMsg1 = disabledMsg1;
	this.disabledMsg2 = disabledMsg2;
};

function cloneUserData(obj) {
	return new userData(obj["username"], obj["userFName"], obj["userLName"], obj["userEmail"],
	                    obj["userPhone"], obj["enabled"], obj["role"], obj["teams"],
	                    obj["disabledMsg1"], obj["disabledMsg2"])
}

module.exports = {

	addUserData(role, team) {
		var randomFName = phraseGen.randomFName();
		var randomLName = phraseGen.randomLName();
		var user = new userData()
		user.username = randomFName + " " + randomLName;
		user.userFName = randomFName;
		user.userLName = randomLName;
		user.userEmail = phraseGen.randomString(6) + "@guerrillamail.com";
		user.userPhone = "214" + phraseGen.randomInt(7);
		user.enabled = "Pending Invite";
		user.role = role;
		user.teams = team;
		user.billableRate = phraseGen.getRandomIntInclusive(1, 100).toString();
		user.internalRate = phraseGen.getRandomIntInclusive(1, 100).toString();
		user.password = phraseGen.randomString(8);
		return user;
	},
	editUserData(obj,toEdit,role,team){
		var randomFName = phraseGen.randomFName();
		var randomLName = phraseGen.randomLName();
		var editUser = cloneUserData(obj);
		for (var count = 0; count < toEdit.length; count++) {
			if(toEdit[count] === "userFName") {
				editUser[toEdit[count]] = randomFName;
				editUser.username = randomFName + " " + editUser["userLName"];
			} else if (toEdit[count] === "userLName") {
				editUser[toEdit[count]] = randomLName;
				editUser.username = editUser["userFName"] + " " + randomLName;
			} else if (toEdit[count] === "userEmail") {
				editUser[toEdit[count]] = phraseGen.randomString(6) + "@guerrillamail.com";
			} else if (toEdit[count] === "userPhone") {
				editUser[toEdit[count]] = "214" + phraseGen.randomInt(7);
			} else if (toEdit[count] === "billableRate") {
				editUser[toEdit[count]] = phraseGen.getRandomIntInclusive(1, 100).toString();
			} else if (toEdit[count] === "internalRate") {
				editUser[toEdit[count]] = phraseGen.getRandomIntInclusive(1, 100).toString();
			} else if (toEdit[count] === "password") {
				editUser[toEdit[count]] = phraseGen.randomString(8);
			} else if (toEdit[count] === "role") {
				editUser.role = role;
			} else if (toEdit[count] === "teams") {
				editUser.teams = team;
			}
		}
		return editUser;
	}

	, tu001() {
		var tu001 = new userData();
		tu001.username = "Test User1";
		tu001.userFName = "Test";
		tu001.userLName = "User1";
		tu001.userEmail = "testuser1@guerrillamailblock.com";
		tu001.userPhone = "2148675309";
		tu001.enabled = "Disable User";
		tu001.role = "Member";
		tu001.teams = [team];
		return tu001;
	}, tu002() {
		var tu002 = new userData();
		tu002.username = "Test User2";
		tu002.userFName = "Test";
		tu002.userLName = "User2";
		tu002.userEmail = "testuser2@guerrillamailblock.com";
		tu002.userPhone = "8178675309";
		tu002.enabled = "Account Disabled";
		tu002.role = "Member";
		tu002.teams = [team];
		tu002.disabledMsg1 = "open tasks assigned to Test User2.";
		tu002.disabledMsg2 = "Review";
		return tu002;
	}, tu003(team, site) {
		var tu002 = new userData();
		tu002.username = "Test User3";
		tu002.userFName = "Test";
		tu002.userLName = "User3";
		tu002.userEmail = "testuser33@guerrillamailblock.com";
		tu002.userPhone = "15125550157";
		tu002.enabled = "Account Disabled";
		tu002.role = "Follower";
		tu002.teams = [team];
		tu002.sites = [site];
		tu002.disabledMsg1 = "open tasks assigned to Test User2.";
		tu002.disabledMsg2 = "Review";
		return tu002;
	}, tu004(team, site) {
		var tu002 = new userData();
		tu002.username = "Test User4";
		tu002.userFName = "Test";
		tu002.userLName = "User4";
		tu002.userEmail = "testuser4@guerrillamailblock.com";
		tu002.userPhone = "12025550146";
		tu002.enabled = "Account Disabled";
		tu002.role = "Account Admin";
		tu002.teams = [team];
		tu002.sites = [site];
		tu002.disabledMsg1 = "open tasks assigned to Test User2.";
		tu002.disabledMsg2 = "Review";
		tu002.password = 'tu4'
		return tu002;
	}, tu005(team, site) {
		var tu002 = new userData();
		tu002.username = "Test User5";
		tu002.userFName = "Test";
		tu002.userLName = "User5";
		tu002.userEmail = "testuser5@guerrillamailblock.com";
		tu002.userPhone = "15125550159";
		tu002.enabled = "Account Disabled";
		tu002.role = "Account Admin";
		tu002.teams = [team];
		tu002.sites = [site];
		tu002.disabledMsg1 = "open tasks assigned to Test User2.";
		tu002.disabledMsg2 = "Review";
		return tu002;
	}, tu006(team, site) {
		var tu002 = new userData();
		tu002.username = "Test User6";
		tu002.userFName = "Test";
		tu002.userLName = "User6";
		tu002.userEmail = "testuser6@guerrillamailblock.com";
		tu002.userPhone = "15125550187";
		tu002.enabled = "Account Disabled";
		tu002.role = "Site Admin";
		tu002.teams = [team];
		tu002.sites = [site];
		tu002.disabledMsg1 = "open tasks assigned to Test User2.";
		tu002.disabledMsg2 = "Review";
		return tu002;
	}, tu007(team, site) {
		var tu002 = new userData();
		tu002.username = "Test User7";
		tu002.userFName = "Test";
		tu002.userLName = "User7";
		tu002.userEmail = "testuser7@guerrillamailblock.com";
		tu002.userPhone = "15125550187";
		tu002.enabled = "Account Disabled";
		tu002.role = "Basic Member";
		tu002.teams = [team];
		tu002.sites = [site];
		tu002.disabledMsg1 = "open tasks assigned to Test User2.";
		tu002.disabledMsg2 = "Review";
		return tu002;
	}
}
