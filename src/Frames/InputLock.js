
/**
 * Transparent overlay to lock touch (mouse) input.
 */
class InputLock {
	/**
	 * Default contructor
	 */
	constructor() {
		this.blk = Utils.inflate({ type: "div", class: "fw-inputlock" });
	}

	/**
	 * Enable this overlay
	 */
	enable() { document.body.appendChild(this.blk); }

	/**
	 * Remove this overlay
	 */
	disable() { this.blk.remove(); }
}
