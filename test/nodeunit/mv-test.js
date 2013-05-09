var Model = require('../../lib/mv').Model;
var View = require('../../lib/mv').View;

var model, view;

exports.setUp = function(done) {
	model = new Model();
	view = new View(model);
	done();
};

exports.modelExtendsPubSub = function(test) {
	test.equal(typeof model.publish, 'function');
	test.equal(typeof model.subscribe, 'function');
	test.done();
};


exports.viewListensToModelChange = function(test) {
	view.onModelChange(function() {
		this.elm = '<h2>' + this.model.id + '</h2>';
	});
	model.set('id', '1');
	test.equal(view.elm, '<h2>1</h2>');
	test.done();
};

exports.modelSendsPropertiesOnChange = function(test) {
	view.onModelChange(function(args) {
		test.equal(args.id, '1');
		test.done();
	});
	model.set('id', '1');
};