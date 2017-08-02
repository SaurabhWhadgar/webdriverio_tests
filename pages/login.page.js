/**
 * Created by chrismanning on 7/5/17.
 */
var Page = require('./page');

class LoginPage extends Page {
	loginPageMain(){
		return "div[@class='desktoplogin']"
	}
	loginPageCheck(){
		browser.element("//"+this.loginPageMain()).waitForVisible(super.globalWait())
	};
	get emailPhoneField() {
		return browser.element("//input[@label='Email or Mobile Phone']");
	}

	get passwordField() {
		return browser.element("//input[@type='password']");
	}

	get loginButton() {
		return browser.element("//button[contains(@class,'login-form-submit')]");
	}

	get invalidCredentialsTxt() {
		return browser.element("//*[.='The username and password you entered did not match our "
		                       + "records. Please double-check and try again.']")
	}

	get appBody() {
		return browser.element("//div[@class='app-body']")
	}

	loginWait(){
		this.appBody.waitForVisible(super.globalWait());
	}

	invalidTxtWait(){
		this.invalidCredentialsTxt.waitForVisible(super.globalWait())
	}

	open() {
		super.open('login');
	}

	logIn(emailPhone,pWord){
		super.clickClearSet(this.emailPhoneField,emailPhone);
		super.clickClearSet(this.passwordField,pWord);
		this.loginButton.click();
	}

}
module.exports = new LoginPage();