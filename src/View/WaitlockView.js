/**
 * Spin animation activity lock view.
 */
class WaitlockView {
	get IS_VIEW() { return true; }
	get IS_FIXED_VIEW() { return true; }

	/**
	 * Default constructor.
	 * @param {Screen} ctx Context screen
	 */
	constructor(ctx) {
		this.ctx = ctx;
		this.block = Utils.inflate({type: "div", class: "fw-waitlock-view"});
		this.block.appendView(new Spinner());
	}

	getBlock() {return this.block;}

	/**
	 * Show widget
	 */
	show() {
		this.ctx._activity_contents.scrollTop = 0;
		this.block.classList.add("show");
	}

	/**
	 * Hide widget
	 */
	hide() {
		this.block.classList.remove("show");
	}
}
