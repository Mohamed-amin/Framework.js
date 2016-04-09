'use strict';
var _ = require('lodash');
function initWatchVal() {}

function Scope(){
	this.$$watchers = [];	
}

Scope.prototype.$watch = function(watcherFn, listnerFn) {
	this.$$watchers.push({watcherFn:watcherFn, listnerFn:listnerFn, last:initWatchVal});
};

Scope.prototype.$digest = function(){
	var self = this;
	var oldValue, newValue;
	_.forEach(this.$$watchers, function(watcher){
		newValue = watcher.watcherFn(self);
		oldValue = watcher.last;
		console.info(newValue, oldValue, self);
		if(oldValue !== newValue){
			watcher.last = newValue;
			oldValue = oldValue === initWatchVal ? newValue : oldValue;
			watcher.listnerFn(newValue, oldValue, self);
		}
	});
};

module.exports = Scope;