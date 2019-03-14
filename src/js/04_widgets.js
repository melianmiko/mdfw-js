/**
 * Text input widget. Based on HTML Input.
 */
class TextInputView {
	get IS_VIEW() { return true; }
	/**
	 * Default contructor
	 */
    constructor() {
        this.block = Utils.inflate({type: "div", class: "fw-listitem textedit", childs: {
            titlebx: {type: "div", class: "item-title"},
            editor: {type: "input", class: "input"}
        }});
    }

	/**
	 * Mark input as readonly
	 */
	makeReadonly() {
		this.block.editor.setAttribute("readonly", "true");
        this.block.classList.add("readonly");
        return this;
    }
	
	/**
	 * Remove readonly mark
	 */
	unmakeReadonly() {
		this.block.editor.setAttribute("readonly", "false");
		this.block.classList.remove("readonly");
        return this;
    }

	/**
	 * Set placeholder text
	 * 
	 * @param {string} s Placeholder text
	 */
	setHolder(s) {
        this.block.editor.placeholder = s;
        return this;
    }

	/**
	 * Get block.
	 */
    getBlock() {return this.block;}

	/**
	 * Get value of input
	 * @returns {string} value
	 */
    toString() {
        return this.block.editor.value;
	}
	
	/**
	 * Set input type.
	 * 
	 * Use any HTML4-5 compitable input type as parameter.
	 * @param {string} type Input type
	 * @returns {TextInputView} Callback
	 */
	setType(type) {
		this.block.editor.type = type;
		return this;
	}

	/**
	 * Set value to input
	 * 
	 * @param {string} value Value
	 */
    fromString(value) {
        this.block.editor.value = value;
        return this;
    }

	/**
	 * Set input title
	 * 
	 * @param {string} title Title
	 */
    setTitle(title) {
        this.block.titlebx.innerHTML = title;
        return this;
    }

	/**
	 * Remove block.
	 */
    remove() {
        this.block.remove();
    }
}

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
	setOnLongToucListener(c) {
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

/**
 * SubHeader is view (widget) that provides list separator with title.
 */
class SubHeader {
	get IS_VIEW() { return true; }
	/**
	 * Constructor
	 * @param {string} text Header value
	 */
	constructor(text) {
		this.text = text;
	}
	/**
	 * Build and return HTMLElement
	 */
	getBlock() {
		var d = Utils.inflate({type: "div", class: "fw-listheader"});
		d.innerHTML = this.text;
		d.style.color = Config.mainColor;
		return d;
	}
}

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
		if(this.style == Button.STYLE_FLAT) {
			this.mBlock.style.backgroundColor = "";
			this.mBlock.style.color = Config.mainColor;
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

/**
 * Spin animation view widget
 */
class SpinnerView {
	get IS_VIEW() {return true;}

	constructor() {}

	getBlock() {
		var b = Utils.inflate({type: "div", class: "fw-spinner"});
		b.style.color = Config.mainColor;
		return b;
	}
}

/**
 * Spin animation activity lock view.
 */
class WaitlockView {
	get IS_VIEW() { return true; }
	get IS_FIXED_VIEW() { return true; }

	/**
	 * Default constructor.
	 * @param {Screen} ctx Context screen
	 */
	constructor(ctx) {
		this.ctx = ctx;
		this.block = Utils.inflate({type: "div", class: "fw-waitlock-view"});
		this.block.appendView(new SpinnerView());
	}

	getBlock() {return this.block;}

	/**
	 * Show widget
	 */
	show() {
		this.ctx._activity_contents.scrollTop = 0;
		this.block.classList.add("show");
	}

	/**
	 * Hide widget
	 */
	hide() {
		this.block.classList.remove("show");
	}
}

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

