/**
 * Created by chrismanning on 7/6/17.
 */
var Page = require('./page');

class UserProfile extends Page {

	get editProfilModalMain() {
		return super.modal("Edit Profile");
	}

	editProfilField(option) {
		return browser.element(
			"//input[@label='" + option + "'][(ancestor::" + this.editProfilModalMain + ")]");
	}

	editProfilFLName(option) {
		return browser.element(
			"//span[@id='" + option + "'][(ancestor::" + this.editProfilModalMain + ")]");
	}

	editProfileButtons(option) {
		return browser.element(
			"//button[.='" + option + "'][(ancestor::" + this.editProfilModalMain + ")]")
	}

	passwordsDontMatch() {
		browser.element(
			"//*[contains(text(),'Passwords')][contains(text(),'don')][contains(text(),'match')][(ancestor::"
			+ this.editProfilModalMain + ")]").waitForVisible(super.globalWait())
	}

	useEditProfileModal(user) {
		super.clickClearSet(this.editProfilFLName('firstName'), user['userFName']);
		super.clickClearSet(this.editProfilFLName('lastName'), user['userLName']);
		super.clickClearSet(this.editProfilField('Email'), user['userEmail']);
		super.clickClearSet(this.editProfilField('Mobile Phone'), user['userPhone']);
		super.clickClearSet(this.editProfilField('Billable Rate (Per Hour)'), user['billableRate']);
		super.clickClearSet(this.editProfilField('Internal Rate (Per Hour)'), user['internalRate']);
		this.editProfileButtons('Save').click();
	}

	updateUserPassword(oldPword, newPword, vPword) {
		this.editProfileButtons('Change Password').click();
		this.editProfilField('Current Password').waitForVisible(super.globalWait());
		super.clickClearSet(this.editProfilField('Current Password'), oldPword);
		super.clickClearSet(this.editProfilField('New Password'), newPword);
		super.clickClearSet(this.editProfilField('Re-enter New Password'), vPword);
		this.editProfileButtons('Change Password').click()
	}

	updateProfileToastMsg() {
		super.toastMsg('Profile updated').waitForVisible(super.globalWait());
	}

	updatePWordToastMsg() {
		super.toastMsg('Password updated').waitForVisible(super.globalWait());
	}

	updateBadPWordToastMsg() {
		super.toastMsg('Incorrect password').waitForVisible(super.globalWait());
	}

	get profileModalCheck() {
		return browser.element("//" + this.editProfilModalMain);
	}
}
module.exports = new UserProfile();