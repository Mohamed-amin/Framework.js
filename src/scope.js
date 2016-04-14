'use strict';
var _ = require('lodash');
function initWatchVal() {}

function Scope(){
	this.$$watchers = [];	
}

Scope.prototype.$watch = function(watcherFn, listnerFn) {
	this.$$watchers.push({ 
		watcherFn: watcherFn,
		listnerFn: listnerFn || function(){},
		last: initWatchVal 
	});
};

Scope.prototype.$$digestOnce = function(){
	var self = this;
	var oldValue, newValue, dirty;
	_.forEach(this.$$watchers, function(watcher){
		newValue = watcher.watcherFn(self);
		oldValue = watcher.last;
		if(oldValue !== newValue){
			watcher.last = newValue;
			oldValue = oldValue === initWatchVal ? newValue : oldValue;
			watcher.listnerFn(newValue, oldValue, self);
			dirty = true;
		}
	});
	return dirty;
};

Scope.prototype.$digest = function(){
	var dirty;
	do {
		dirty = this.$$digestOnce();
	} while(dirty);
};
module.exports = Scope;