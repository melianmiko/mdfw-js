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
		this.block = Utils.inflate({
			type: "div",
			class: "fw-spinactivity", childs: {
				spinner: { type: "div", class: "fw-spinner", inner: "Please wait..." }
			}
		});
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

