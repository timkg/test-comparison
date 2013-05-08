(function() {
	
	function PubSub() {
		this._handlers = {};
	}

	PubSub.prototype.publish = function(event, args) {
		if (!this._handlers[event]) { return; }
		var args = Array.prototype.splice.call(arguments, 1);

		this._handlers[event].forEach(function(listener) {
			listener.callback.apply(listener.context, args);
		});
	}

	PubSub.prototype.subscribe = function(event, fn, context) {
		if (typeof fn !== 'function') { throw new TypeError("subscriber needs to be a function") }
		if (!this._handlers[event]) { this._handlers[event] = []; }

		this._handlers[event].push({
			callback: fn
			, context: (context || this)
		});
	}

	exports.PubSub = PubSub;
	
} ());