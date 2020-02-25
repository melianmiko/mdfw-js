/**
 * Row widget, great way to provide item in list
 */
class RowView {
	get IS_VIEW() { return true; }

	/**
	 * Constructor :-)
	 */
	constructor() {
		this._title = "";
		this._icon = "";
		this._subtitle = "";
		this._click = null;
		this._longtap = null;
	}

	/**
	 * Set item title.
	 * 
	 * @param {string} title Title value
	 * @returns {RowView} self-return
	 */
	setTitle(title) {
		this._title = title;
		return this;
	}

	/**
	 * Set item summary, second level information
	 * 
	 * @param {string} title Summary value
	 * @returns {RowView} self-return
	 */
	setSummary(title) {
		this._subtitle = title;
		return this;
	}

	/**
	 * Set item icon.
	 * 
	 * @param {string} icon Icon name from material.io/icons
	 * @returns {RowView} self-return
	 */
	setIcon(icon) {
		this._icon = icon;
		return this;
	}

	/**
	 * Add secondary action.
	 * 
	 * @param {string} title Accesibility name
	 * @param {string} icon Icon name from material.io/icons
	 * @param {function} click On click function
	 * @returns {RowView} self-return
	 */
	setAction(title,icon,click) {
		this._action = {t: title, i: icon, c: click};
		return this;
	}

	/**
	 * Set on click function
	 * 
	 * @param {function} c Function
	 * @returns {RowView} self-return
	 */
	setOnClickListener(c) {
		this._click = c;
		return this;
	}

	/**
	 * Set long touch event listner
	 * 
	 * @param {function} c Function
	 * @returns {RowView} self-return
	 */
	setOnLongTouchListener(c) {
		this._longtap = c;
		return this;
	}

	/**
	 * Build and get block!
	 */
	getBlock() {
		let b = Utils.inflate({ type: "div", class: "fw-rowview", childs: {
			box_a: {type: "div"},
			box_b: {type: "div", class: "text"},
			box_c: {type: "div"}
		} }), ctx = this;

		UnFocusService.add(b);

		b.onclick = this._click;
		b.onlongtap = this._longtap;
		if(this._title) b.box_b.appendChild(Utils.inflate({
			type: "div", class: "title", inner: this._title
		}));

		if(this._subtitle) {
			b.classList.add("twoline");
			b.box_b.appendChild(Utils.inflate({
				type: "div", class: "summary", inner: this._subtitle
			}));
		}

		if(this._icon) {
			b.box_a.className = "icon";
			b.box_a.appendView(new IconView(this._icon));
		}

		if(this._action) {
			b.box_c.className = "action";
			b.box_c.appendView(new IconView(this._action.i).disableColor());
			b.box_c.onclick = function(event){
				event.preventDefault();
				event.stopPropagation();
				ctx._action.c();
			}
			b.box_c.title = this._action.t;
		}

		return b;
	}
}

