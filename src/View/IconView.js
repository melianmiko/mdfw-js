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
