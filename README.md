test-comparison
===============

A comparison of various assertion libraries, test frameworks, and test runners. This is very much a work in progress. For now I'm only testing a simple pubsub implementation in pure JS, but this will evolve to async calls and dom manipulation. Let's see which framework will prove the most useful.

## test/assert
Only using node's plain assert module. No setup, no watcher, no runner, no config, no reporter.

- **Approach:** Include everything you need in a file and act upon your production code. Make assertions using [node's assert module](http://nodejs.org/api/assert.html).

- **What do we get:** A failed assertion will throw an AssertionError and thus kill the node process. The callstack is logged to the console.

- **Thoughts:** The total lack of positive feedback when all assertions pass is troubling. The test file quickly degrades into a total mess. Constantly switching to the terminal to run "node test.js" is distracting.

## test/nodeunit
Using nodeunit to test dom-independent functionality. Nodeunit uses node's assert module, but gives us some additional functionality.
- **Approach:** <code>npm install nodeunit</code>. No need to require nodeunit in your test files. Write each test as an <code>export</code> function. Pass 'test' as arg to those functions. Use node's assert methods, but as instance methods of <code>test</code>, not <code>assert</code>. There is no need to <code>require('assert')</code>. Call <code>test.done()</code> at the end of each test function. Install node's command-line reporter by going to its node_modules folder and running <code>sudo make install</code>. Run the runner via <code>nodeunit testfile.js</code>. If you define setUp and tearDown methods, accept some randomly named argument (I use "done"), and call it when done.

- **What do we get:** a way to structure our test files. A reporter with feedback about successes and failures. A way to handle async tests via the test.done callback - not yet exemplified here.

- **Thoughts:** Quick and simple. There are multiple formatters and the possibility to run in the browser. Need to try it out in the browser. No support for multiple servers, but other projects deal with that. Good reuse of node/CommonJS "infrastructure" (exports format, assert methods).