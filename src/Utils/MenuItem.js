/**
 * This class provide items for actionbar
 */
class MenuItem {
	/**
	 * Create new MenuItem
	 * 
	 * @param {string} title Accesibility name for icon
	 * @param {string} icon Icon name (from material.io/icons palette)
	 * @param {function} click On click function
	 */
	constructor(title, icon, click) {
		/**
		 * Item acessibility title.
		 * @type {string}
		 */
		this.title = title;
		/**
		 * Item icon, by material.io/icons
		 * @type {string}
		 */
		this.icon = icon;
		/**
		 * Item click listener
		 * @type {function}
		 */
		this.click = click;
	}

	/**
	 * Built and returns item
	 */
	inflate() {
		let i = (new IconView(this.icon)).getBlock();
		let b = document.createElement("a");
		b.className = "ab-btn";
		b.appendChild(i);
		b.title = this.title;
		b.onclick = this.click;
		return b;
	}
}
