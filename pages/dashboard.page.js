/**
 * Created by chrismanning on 7/11/17.
 */
var Page = require('./page');

class DashboardPage extends Page{
	dashboardPageMain(){
		return super.mainTab('Dashboard');
	}
	dashboardPageCheck(){
		browser.element("//"+this.dashboardPageMain()).waitForVisible(super.globalWait())
	}
}
module.exports = new DashboardPage();