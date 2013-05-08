var PubSub = require('../../lib/pubsub.js').PubSub;
var assert = require('assert');

assert.equal(typeof PubSub, 'function', 'it returns a PubSub constructor function');

var pub = new PubSub();

assert.equal(typeof pub.publish, 'function', 'instances expose a publish() method');
assert.equal(typeof pub.subscribe, 'function', 'instances expose a subscribe() method');

// declare a model that will publish 'changed' events
var model = {
	state: 'model'
	, changed: function() {
		pub.publish('changed', this.state);
	}
};

// declare views that will listen to 'changed' events and populate an elm
var elm = '';
var view = {
	render: function(state) {
		elm += 'view1' + state;
	}
};
pub.subscribe('changed', function(state) {
	this.render(state);
}, view);

var anotherElm = '';
var anotherView = {
	render: function(state) {
		anotherElm += 'view2' + state;
	}
}

// trigger event
model.changed();

// the first view reacted, the other not
assert.equal(elm, 'view1model', 'view handler reacted to model event and updated elm');
assert.equal(anotherElm, '', 'only declared handlers act');

// second view starts listening
pub.subscribe('changed', function(state) {
	this.render(state);
}, anotherView);

// trigger event
model.changed();

// first view reacted twice, second once
assert.equal(elm, 'view1modelview1model', 'listener called twice when event published twice');
assert.equal(anotherElm, 'view2model', 'we can register more than one subscriber for a single event');