/**
 * Screen part
 */
class Fragment {
	// Can be used as view
	get IS_VIEW() { return true; }

	/**
	 * Default constructor for Fragment
	 * @param {*} data Anything taht you want give for `onCreate` method
	 */
	constructor(data) {
		var t = this;
		this.onInit();
		/**
		 * Constructor data backup
		 */
		this._bundle = data;
		/**
		 * Fragment root block
		 * @type {HTMLElement}
		 */
		this._activity_root = Utils.inflate({type: "div" , class: "fragment"});
		/**
		 * Callback object
		 */
		 this._callback = {};
	}

	/**
	 * Remove all actions from action bar
	 */
	wipeActions() {
		try {
			this._callback.wipeActions();
		} catch(e) {
			console.warn("Callback can't wipe actions");
		}
	}

	/**
	 * Add action to activity topbar.
	 * @param {MenuItem} item Item to add
	 */
	addAction(item) {
		try {
			this._callback.addAction(item);
		} catch(e) {
			console.warn("Callback can't add actions");
		}
	}

	/**
	 * Use item as screen home action.
	 * @param {MenuItem} item Item
	 */
	setHomeAction(item) {
		try {
			this._callback.setHomeAction(item);
		} catch(e) {
			console.warn("Callback can't set home action");
		}
	}

	/**
	 * Enable back button as home action.
	 */
	setHomeAsUpAction() {
		try {
			this._callback.setHomeAsUpAction();
		} catch(e) {
			console.warn("Callback can't set home action as home");
		}
	}

	/**
	 * Set screen title in action bar
	 * @param {string} title Title
	 */
	setTitle(title) {
		try {
			this._callback.setTitle(title);
		} catch(e) {
			console.warn("Callback can't set title");
		}
	}

	/**
	 * Add automatic call to `onUpdate` in interval
	 * 
	 * @todo Remove old timer before install new
	 * @param {number} timer Refresh time in ms
	 */
	doAutoUpdate(timer) {
		let c = this;
		c._refresh_timer = setInterval(function () {
			c.onUpdate();
		}, timer);
	}

	/**
	 * Append view to screen.
	 * 
	 * If `view.IS_FIXED_VIEW == true`, view will be added to callback screen
	 * 
	 * @param {View} view View to append
	 */
	appendView(view) {
		if(!view.IS_VIEW) return false;
		if(view.IS_FIXED_VIEW) try {
				this._callback.appendView(view);
			} catch(e) {
				console.warn("Callback can't add view");
			}
		else
			this._activity_root.appendChild(view.getBlock());
	}

	/**
	 * Remove all activity contents, except config and fixed views
	 */
	wipeContents() {
		this._activity_root.innerHTML = "";
	}

	// Events
	/**
	 * Event listener, calls on fragment building
	 * @param {*} data User-rpovided data from constructor
	 */
	onCreate(data) {
		Log.w("Screen", "onCreate is not overriden!");
	}

	/**
	 * Event listener, calls on fragment refresh or manually
	 */
	onUpdate() { }

	/**
	 * Build fragment and return root block
	 */
	getBlock() {
		this.onCreate(this._bundle);
		this.onUpdate();
		return this._activity_root;
	}
}
