/**
 * Primitive layout. This is a simple `div` block with some additional
 * functions.
 */
class LinearLayout {
	/**
	 * View flag
	 */
	get IS_VIEW() {return true;}

	/**
	 * Default constructor
	 */
	constructor() {
		/**
		 * View root block
		 */
		this._root = Utils.inflate({type: "div"});
	}

	/**
	 * Get block function
	 */
	getBlock() {
		return this._root;
	}

	/**
	 * Append view to layout
	 */
	appendView(view) {
		return this._root.appendView(view);
	}

	/**
	 * Set visibility
	 */
	setVisible(visible) {
		this._root.style.display = (visible ? "" : "none");
	}
}