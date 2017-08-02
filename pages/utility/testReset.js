/**
 * Created by chrismanning on 7/7/17.
 */
var supertest = require('supertest');
var api = supertest("http://localhost:3000");

// let siteToTest;
// let teamToTest;
// let clientToTest;
// let locToTest1;
// let locToTest2;

class TestReset {
	static resetTestData() {
		api.post('/api/testReset/users?team=CuaFrmxSTKNaxqctb&site=YTdopSSK7Pu9JP6Pm')
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
				   console.log("fixtures reset and responce body = ", res.body)
				   // siteToTest = res.body.site.name;
				   // teamToTest = res.body.team.name;
				   // clientToTest = res.body.client.name;
				   // locToTest1 = res.body.locations[0].name;
				   // locToTest2 = res.body.locations[1].name;
				   return {
					   siteToTest: res.body.site.name, teamToTest: res.body.team.name, clientToTest: res.body.client.name,
					   locToTest1: res.body.locations[0].name, locToTest2: res.body.locations[1].name
				   };
			   }
		   });
	}
}
module.exports = TestReset