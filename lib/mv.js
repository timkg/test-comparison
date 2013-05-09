var PubSub = require('./pubsub').PubSub;

function Model() {}
Model.prototype = new PubSub();
Model.prototype.publishChange = function(hash) {
	this.publish('changed', hash);
};
Model.prototype.set = function(attrName, value) {
	if (typeof attrName !== 'string') { throw new TypeError("attrName needs to be a string"); }

	this[attrName] = value;
	var responseHash = {};
	responseHash[attrName] = value;
	this.publishChange(responseHash);
};

function View(model) {
	this.model = model;
};
View.prototype = {};
View.prototype.onModelChange = function(fn) {
	this.model.subscribe('changed', fn, this);
};

exports.Model = Model;
exports.View = View;