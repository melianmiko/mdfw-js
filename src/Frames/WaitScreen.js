/**
 * Display loading overlay
 */
class WaitScreen {
	/**
	 * Default contructor
	 */
	constructor() {
		/**
		 * Root container
		 * @type {HTMLElement}
		 */
		this.block = Utils.inflate(FWBlockSchemas.WAITSCREEN);
	}

	/**
	 * Show this overlay
	 */
	show() { document.body.appendChild(this.block); }

	/**
	 * Hide this overlay
	 */
	hide() { this.block.remove(); }
}

