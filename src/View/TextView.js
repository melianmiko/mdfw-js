/**
 * Simple text display widget.
 * 
 * @todo Add configuration methods
 */
class TextView {
	get IS_VIEW() { return true; }

	/**
	 * Build new view
	 * @param {string} style TextView style name
	 * @param {string} value Text to display
	 */
	constructor(style, value) {
		this.blk = Utils.inflate({ type: "div", inner: value, class: "fw-textview-style "+style});
	}

	/**
	 * Returns block
	 */
	getBlock() {
		return this.blk;
	}

	/**
	 * Set new text
	 */
	 setText(text) {
	 	this.blk.innerHTML = text;
	 }
}
