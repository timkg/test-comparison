var PupSub = require('../../lib/pubsub').PubSub;

var messages = [];

var pubsub = new PupSub();
var emitter = {
	emit: function(msg) {
		pubsub.publish('message', msg);
	}
};

var listener = {
	timesBeingCalled: 0
	, listen: function() {
		pubsub.subscribe('message', function(message) {
			messages.push(message);
			this.timesBeingCalled += 1;
		}, this);
	}
};

listener.listen();


exports.test_listenersReactToEvents = function(test) {
	emitter.emit('my name is emitter');
	test.equal(listener.timesBeingCalled, 1);
	test.done();
};

exports.test_publishersCanPassArgumentsToListeners = function(test) {
	emitter.emit('my name is emitter');
	test.equal(messages[0], 'my name is emitter');
	test.done();
};