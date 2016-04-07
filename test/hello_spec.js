var sayHello = require('../src/hello.js');

describe("hello", function(){
	it("say hello", function(){
		expect(sayHello()).toBe("Hello, World");
	});
});