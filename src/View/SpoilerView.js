/**
 * Expandable row view.
 */
class SpoilerView extends RowView {
	/**
	 * Default constructor
	 */
	constructor() {
		super();

		var ctx = this;
		this.contents = Utils.inflate({type: "div"});
		this.contents.style.display = "none";
		this._icon = "keyboard_arrow_down";
		this._click = function() {
			ctx.toggle();
		}
	}

	getBlock() {
		this.row = super.getBlock();
		var b = Utils.inflate({type: "div"});
		b.appendChild(this.row);
		b.appendChild(this.contents);
		return b;
	}

	/**
	 * Append view to expandable container
	 * @param {View} v view to append
	 */
	appendView(v) {
		return this.contents.appendView(v);
	}

	/**
	 * Toggle contents visiblilty
	 */
	toggle() {
		if(this.contents.style.display == "none") {
			// Show!
			this.contents.style.display = "";
			this._icon = "keyboard_arrow_up";

			var b = super.getBlock();
			this.row = this.row.replaceWith(b);
			this.row = b;
		} else {
			// Hide!
			this.contents.style.display = "none";
			this._icon = "keyboard_arrow_down";

			var b = super.getBlock();
			this.row = this.row.replaceWith(b);
			this.row = b;
		}
	}
}

