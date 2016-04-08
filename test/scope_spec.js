var Scope = require('../src/scope');

describe("Scope",function(){
	it('Can be contstructed and used as an object', function(){
		var scope = new Scope;
		scope.aProperty = 1;
		expect(scope.aProperty).toBe(1);
	});
});