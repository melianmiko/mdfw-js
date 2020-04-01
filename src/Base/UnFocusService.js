
/**
 * This service automaticly removes focus after item click to remove click highlight.
 * @deprecated Didn't work. Will be removed!
 */
class UnFocusService {

	/**
	 * Do unFocus on block
	 * @param {HTMLElement} block Block to execute
	 */
	static _exec(block) {
		if(!Config.unfocusEnabled) return false;
		block.blur();
	}
	
	/**
	 * Register unFocus listener to element
	 * @param {HTMLElement} block Element to register
	 */
	static add(block) {
		block.addEventListener("click", function(){
			UnFocusService._exec(block);
		});
	}
}


