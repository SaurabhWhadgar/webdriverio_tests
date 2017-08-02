var phraseGen = require('./phraseGen');

function teamData(teamName, description, members, sites, enabled) {
	this.teamName = teamName;
	this.description = description;
	this.members = members;
	this.sites = sites;
};

module.exports = {
	newTeam(members, sites) {
		return new teamData("Team " + phraseGen.randomCompany(), phraseGen.randomPhrase(), members,
		                                                         sites)
	}
}
