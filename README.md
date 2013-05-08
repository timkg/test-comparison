test-comparison
===============

A comparison of various assertion libraries, test frameworks, and test runners. This is very much a work in progress. For now I'm only testing a simple pubsub implementation in pure JS, but this will evolve to async calls and dom manipulation. Let's see which framework will prove the most useful.

## test/node-assert
Only using node's plain assert module. No setup, no watcher, no runner, no config, no reporter.

- **Approach:** Include everything you need in a file and act upon your production code. Make assertions using [node's assert module](http://nodejs.org/api/assert.html).

- **What do we get:** A failed assertion will throw an AssertionError and thus kill the node process. The callstack is logged to the console.

- **Thoughts:** The total lack of positive feedback when all assertions pass is troubling. The test file quickly degrades into a total mess. Constantly switching to the terminal to run "node test.js" is distracting.