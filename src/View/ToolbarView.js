/**
 * Toolbar widget.
 */
class ToolbarView {
	get IS_VIEW(){return true;}

	/**
	 * Default constuctor
	 */
	constructor() {
		this.block = Utils.inflate({type: "div", class: "fw-toolbar"})
	}

	getBlock() {return this.block;}

	/**
	 * Remove all content from toolbar
	 */
	wipe() {
		this.block.innerHTML = "";
	}

	/**
	 * Add new icon to toolbar
	 * 
	 * @param {string} title Title
	 * @param {string} icon Icon name by material.io/icons
	 * @param {function} click onclick function
	 */
	add(title, icon, click) {
		var i = new IconView(icon).disableColor().getBlock();
		i.title = title;
		i.onclick = click;
		this.block.appendChild(i);
		return this;
	}

	/**
	 * Add whitespace to toolbar
	 */
	addSeparator() {
		this.block.appendChild(Utils.inflate({type: "a"}));
		return this;
	}
}
