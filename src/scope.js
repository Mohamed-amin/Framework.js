'use strict';
var _ = require('lodash');

function Scope(){
	this.$$watchers = [];	
}

Scope.prototype.$watch = function(watcherFn, listnerFn) {
	this.$$watchers.push({watcherFn:watcherFn, listnerFn:listnerFn});
};

Scope.prototype.$digest = function(){
	var self = this;
	var oldValue, newValue;
	_.forEach(this.$$watchers, function(watcher){
		newValue = watcher.watcherFn(self);
		oldValue = watcher.last;
		
		if(oldValue !== newValue){
			watcher.last = newValue;
			watcher.listnerFn(newValue, oldValue, self);
		}
	});
};

module.exports = Scope;