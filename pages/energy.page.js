/**
 * Created by chrismanning on 7/11/17.
 */
var Page = require('./page');

class EnergyPage extends Page{
	energyPageMain(){
		return super.mainTab('Energy');
	}
	energyPageCheck(){
		browser.element("//"+this.energyPageMain()).waitForVisible(super.globalWait())
	}
}
module.exports = new EnergyPage();