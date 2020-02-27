/**
 * Checkbox widget.
 *
 * Example:
 * ```js
 * new Checkbox().setTitle("Enable dark theme")
 *     .setChecked(true).setOnCheckedListener((isChecked) => {
 *	       localStorage.darkTheme = isChecked;
 * 	   })
 * ```
 */
class Checkbox {
	get IS_VIEW() {return true;}

	/**
	 * Default constructor
	 */
	constructor() {
		var ctx = this;
		this._root = Utils.inflate({type: "div", class: "fw-checkbox-view", childs: {
			cbIcon: {type: "i", class: "material-icons"},
			cbTitle: {type: "span", class: "label"}
		}});
		this._root.cbIcon.style.color = Config.mainColor;
		this._root.onclick = function() {
			ctx.setChecked(!ctx._isChecked);
		};
		this.setChecked(false);
	}

	/**
	 * Get view root block
	 */
	getBlock() {return this._root; }

	/**
	 * Set checkbox checked state
	 * @param status Is checked now?
	 * @return this class
	 */
	setChecked(status) {
		this._isChecked = status;
		if(status)
			this._root.cbIcon.innerHTML = "check_box";
		else
			this._root.cbIcon.innerHTML = "check_box_outline_blank";
		this._onCheckedStateChanged(this._isChecked);
		return this;
	}

	/**
	 * Set checkbox title (label)
	 * @param title Checkbox label
	 * @return this class
	 */
	setTitle(title) {
		this._root.cbTitle.innerHTML = title;
		return this;
	}

	/**
	 * Set on checked state listener function
	 * @param fnc Callback function
	 * @return this class
	 */
	setOnCheckedListener(fnc) {
		this._onCheckedStateChanged = fnc;
		return this;
	}

	/**
	 * Is checkbox checked?
	 * @return true if checked
	 */
	isChecked() {
		return this._isChecked;
	}

	_onCheckedStateChanged() {}
}