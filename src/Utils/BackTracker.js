/**
 * This tool can track browser up (back) button press.
 * To use this, simply enable:
 * ```js
 * BackTracker.enable();
 * ```
 */
class BackTracker {
	/**
	 * Enable BackTracker
	 */
	static enable() {
		if(window._backtrack) return;

		window._backtrack = {
			stack: []
		};

		location.href = "#0";
		location.href = "#";

		window.onhashchange = function() {
			location.href = "#";
			var last = window._backtrack.stack.pop();
			if(last) if(last.finish)
				last.finish();
		};
	}

	/**
	 * Add closable item to backstack. 
	 * `item` must contain `finish()` method.
	 */
	static addToStack(item) {
		if(!window._backtrack) return;
		window._backtrack.stack.push(item);
	}
}