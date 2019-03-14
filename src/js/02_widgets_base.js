
/**
 * Simple icon widget
 */
class IconView {
	get IS_VIEW() { return true; }

	/**
	 * Constuct new icon view widget
	 * @param {string} icon Icon identifer from material design icon font
	 */
	constructor(icon) {
		this.iconName = icon;
	}

	/**
	 * Disable icon coloring. Useful if you need another color.
	 * @returns {IconView} callback
	 */
	disableColor() {
		this.nocolor = true;
		return this;
	}

	/**
	 * Create and returns IconView block.
	 * @returns {HTMLElement}
	 */
	getBlock() {
		let i = document.createElement("i");
		i.className = "material-icons";
		if(!this.nocolor) i.style.color = Config.mainColor;
		i.innerHTML = this.iconName;
		return i;
	}
}

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
		this.blk = Utils.inflate({ type: "div", inner: value, class: "fw-textview-style-" + style });
	}

	/**
	 * Returns block
	 */
	getBlock() {
		return this.blk;
	}
}
