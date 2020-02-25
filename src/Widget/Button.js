/**
 * Provides simple button widget
 */
class Button {
	get IS_VIEW() { return true; }
	/**
	 * Flat (non-filled) button style id
	 */
	static get STYLE_FLAT() { return "style-flat"; }
	/**
	 * Contained (filled) button style id
	 */
	static get STYLE_CONTAINED() { return "style-contained"; }
	/**
	 * Outlined button style id
	 */
	static get STYLE_OUTLINE() { return "style-outline"; }

	/**
	 * Returns default button style
	 */
	_getDefaultStyle() {
		return Button.STYLE_FLAT;
	}

	/**
	 * Default constructor
	 */
	constructor() {
		this.mBlock = Utils.inflate({ type: "button", class: "fw-button " + this._getDefaultStyle() });
		UnFocusService.add(this.mBlock);
		this.style = this._getDefaultStyle();
		this._reDecorate();
	}

	/**
	 * Re-install style-specific properties
	 */
	_reDecorate() {
		if(this.style == Button.STYLE_FLAT || 
			this.style == Button.STYLE_OUTLINE) {
			this.mBlock.style.backgroundColor = "";
			this.mBlock.style.color = Config.mainColor;
			this.mBlock.style.borderColor = Config.mainColor;
		} else if(this.style == Button.STYLE_CONTAINED) {
			this.mBlock.style.backgroundColor = Config.mainColor;
			this.mBlock.style.color = null;
		} else {
			Log.w("Button", "Style "+this.style+" isn't defined. Can't provide decoration!");
		}
	}

	/**
	 * Returns button block
	 */
	getBlock() {
		return this.mBlock;
	}

	/**
	 * Set text to display on button.
	 * 
	 * @param {string} value Text to display
	 * @returns {Button} self-return
	 */
	setText(value) {
		this.mBlock.innerHTML = value;
		return this;
	}

	/**
	 * Set on button click function
	 * 
	 * @param {function} fnc On click function
	 * @returns {Button} self-return
	 */
	setOnClickListener(fnc) {
		this.mBlock.onclick = fnc;
		return this;
	}

	/**
	 * Set button style. Use `Button.STYLE_*` constants.
	 * 
	 * @param {string} style Style id
	 * @returns {Button} self-return
	 */
	setStyle(style) {
		this.mBlock.className = "fw-button " + style;
		this.style = style;
		this._reDecorate();
		return this;
	}
}

