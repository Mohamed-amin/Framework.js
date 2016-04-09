var Scope = require('../src/scope');

describe("Scope",function(){
	it('Can be contstructed and used as an object', function(){
		var scope = new Scope();
		scope.aProperty = 1;
		expect(scope.aProperty).toBe(1);
	});
});
describe('Digest',function(){
	var scope;
	beforeEach(function() {
	    scope = new Scope();
	});

	it('Call the listner function of a watch on first $digest', function(){
		var watcherFn = function(){return 'blah blah';};
		var listnerFn = jasmine.createSpy();
		scope.$watch(watcherFn, listnerFn);

		scope.$digest();

		expect(listnerFn).toHaveBeenCalled();
	});

	it('Calls the watcher funcion with scope as parameter', function(){
		var watcherFn = jasmine.createSpy();
		var listnerFn = function(){};
		scope.$watch(watcherFn, listnerFn);

		scope.$digest();

		expect(watcherFn).toHaveBeenCalledWith(scope);
	});

	it('Calls the listner function when the scope value changes', function(){
		scope.someValue = 'first';
		scope.counter = 0;
		scope.$watch(
			function(scope){ return scope.someValue;},
			function(newValue, oldValue, scope){ scope.counter++;}
		);

		expect(scope.counter).toBe(0);
		scope.$digest();
		expect(scope.counter).toBe(1);
		scope.$digest();
		expect(scope.counter).toBe(1);
		scope.someValue = 'Random updated value';
		scope.$digest();
		expect(scope.counter).toBe(2);
	});

	it('Calls listener when the watcher value first time is undifined', function(){
		scope.counter = 0;
		scope.$watch(
			function(scope){ return scope.someValue;},
			function(newValue, oldValue, scope){scope.counter++;}
		);
		scope.$digest();
		expect(scope.counter).toBe(1);
	});
	
	it("calls listener with new value as old value the first time", function() {
	    scope.someValue = 123;
	    var oldValueGiven;
	    scope.$watch(
	        function(scope) { return scope.someValue; },
	        function(newValue, oldValue, scope) { oldValueGiven = oldValue; }
	    );
	    scope.$digest();
	    expect(oldValueGiven).toBe(123);
	});

});
