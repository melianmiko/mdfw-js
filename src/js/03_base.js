
/**
 * Screen class. This class provides basics of application screen.
 * Do not use directly! Create your own class that extends this and
 * inside him provide manipulations. Example:
 * 
 * ```js
 * class MyGreatScreen extends Screen {
 *   onCreate(data) {
 *     // Do screen filling here!
 *     this.appendView(new TextView("title", "Hello"))
 *   }
 * }
 * ```
 * 
 * To start a screen: `new MyGreatScreen().start()`
 */
class Screen {
	/**
	 * Root scren mode. This mode will disable open/close animations.
	 * See `Screen.setMode(mode)`.
	 */
	static get MODE_ROOT() { return 1; }
	/**
	 * Default screen mode. See `Screen.setMode(mode)`.
	 */
	static get MODE_DEFAULT() { return 0; }
	/**
	 * Fade in/out duration
	 * @deprecated Will be moved to Config
	 */
	static get FADE_DURATION() { return 350; }
	/**
	 * Actionbar scroll mode: hide on scroll.
	 * See `Screen.setScrollMode(mode)`.
	 */
	static get AB_MODE_HIDE() {return 1;}
	/**
	 * Actionbar scroll mode: do not hide on scroll.
	 * See `Screen.setScrollMode(mode)`.
	 */
	static get AB_MODE_NONE() {return 0;}

	/**
	 * Default constructor for Screen
	 * @param {*} data Anything taht you want give for `onCreate` method
	 */
	constructor(data) {
		var t = this;
		this.onInit();
		/**
		 * Current activity mode. See `Screen.setMode(mode)`.
		 * @type {number}
		 */
		this._activity_mode = 0;
		/**
		 * SetInterval return code for timer reset
		 */
		this._refresh_timer = false;
		/**
		 * Constructor data backup
		 */
		this._bundle = data;
		/**
		 * Activity root block
		 * @type {HTMLElement}
		 */
		this._activity_root = Utils.inflate(FWBlockSchemas.ACTIVITY);
		/**
		 * Activity actionbar root block
		 * @type {HTMLElement}
		 */
		this._activity_ab_root = this._activity_root.root.topbar;
		/**
		 * Symlink to activity contents
		 * @type {HTMLElement}
		 */
		this._activity_contents = this._activity_root.root.contents.holder;
		/**
		 * Action bar title
		 * @type {string}
		 */
		this._ab_title = "";
		/**
		 * Left zone action bar items
		 * @type {MenuItem[]}
		 */
		this._ab_left = [];
		/**
		 * Right zone action bar items
		 * @type {MenuItem[]}
		 */
		this._ab_right = [];
		/**
		 * Current action bar scroll mode.
		 * See `Screen.setScrollMode(mode)`
		 */
		this._ab_scrollmod = 0;

		this._activity_contents.addEventListener("scroll", function(){
			t._ab_scrolltrg();
		});
		this.initScrollMode();
	}

	/**
	 * Set action bar behavior on page scroll.
	 * 
	 * Use `Screen.AB_MODE_*` constants to provide mode.
	 * Default mode is `AB_MODE_NONE`.
	 * 
	 * @param {number} m Scrool mode.
	 */
	setScrollMode(m) {
		this._ab_scrollmod = m;
		this.initScrollMode();
	}

	/**
	 * Initialize selected scroll mode
	 */
	initScrollMode() {
		/**
		 * Previout scroll offset
		 * @type {number}
		 */
		this._ab_scm_prev_scy = this.getScrollerBlock().scrollTop;
		if(this._ab_scrollmod == Screen.AB_MODE_HIDE) {
			// Use dynamic holder
			this._activity_root.root.contents.tbh_fixed.classList.add("hide");
			this._activity_root.root.contents.holder.tbh_scroll.classList.remove("hide");
		} else {
			// Use fixed holder
			this._activity_root.root.contents.tbh_fixed.classList.remove("hide");
			this._activity_root.root.contents.holder.tbh_scroll.classList.add("hide");
		}
		this._ab_scrolltrg();
	}

	/**
	 * Calls on scroll to provide ActionBar scroll mode
	 */
	_ab_scrolltrg() {
		var df = this.getScrollerBlock().scrollTop-this._ab_scm_prev_scy;

		this._activity_ab_root.className = "fw-topbar";

		if(this.getScrollerBlock().scrollTop > 16) 
			this._activity_ab_root.className += " mode-elevate";

		if(df > 0 && this._ab_scrollmod == Screen.AB_MODE_HIDE) {
			// Down. Hide.
			this._activity_ab_root.className += " hide";
		}

		this._ab_scm_prev_scy = this.getScrollerBlock().scrollTop;
	}

	/**
	 * Add icon to left action bar zone
	 * @param {MenuItem} item Item to add
	 * @deprecated Left zone will be removed!
	 */
	addLeftIcon(item) {
		this._ab_left[this._ab_left.length] = item;
		this._rebuildActionbar();
	}

	/**
	 * Remove all actions from action bar
	 */
	wipeActions() {
		this._ab_right = [];
		this._rebuildActionbar();
	}

	/**
	 * Add icon to right action bar zone
	 * @param {MenuItem} item Item to add
	 * @deprecated Use addAction instance of this!
	 */
	addRightIcon(item) {
		Log.w("Screen", "addRightIcon is deprecated!");
		this.addAction(item);
	}

	/**
	 * Add action to activity topbar.
	 * @param {MenuItem} item Item to add
	 */
	addAction(item) {
		this._ab_right[this._ab_right.length] = item;
		this._rebuildActionbar();
	}

	/**
	 * Use item as screen home action.
	 * @param {MenuItem} item Item
	 */
	setHomeAction(item) {
		this._activity_ab_root.container.z_home.innerHTML = "";

		if(!item) return;
		let b = item.inflate();
		this._activity_ab_root.container.z_home.appendChild(b);
	}

	/**
	 * Enable back button as home action.
	 */
	setHomeAsUpAction() {
		let c = this;
		this.setHomeAction(new MenuItem("Back", "arrow_back", function () {
			c.finish();
		}));
	}

	/**
	 * Set screen title in action bar
	 * @param {string} title Title
	 */
	setTitle(title) {
		this._ab_title = title;
		this._rebuildActionbar();
	}

	/**
	 * Re-generate action bar block contents
	 */
	_rebuildActionbar() {
		let root = this._activity_ab_root;

		// title
		root.container.z_title.innerHTML = this._ab_title;

		// Leftframe
		root.container.z_left.innerHTML = "";
		for (var a in this._ab_left)
			root.container.z_left.appendChild(this._ab_left[a].inflate());

		// Rightframe
		root.container.z_right.innerHTML = "";
		for (var a in this._ab_right)
			root.container.z_right.appendChild(this._ab_right[a].inflate());
	}

	/**
	 * Add style class to activity.
	 * @deprecated
	 * @param {string} style Style name
	 */
	addStyle(style) {
		this._activity_root.classList.add("activity-style-" + style);
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
	 * If `view.IS_FIXED_VIEW == true`, view will be added to relative zone.
	 * 
	 * @param {View} view View to append
	 */
	appendView(view) {
		if(!view.IS_VIEW) return false;
		if(view.IS_FIXED_VIEW)
			this._activity_root.root.appendChild(view.getBlock());
		else
			this._activity_contents.container.appendChild(view.getBlock());
	}

	/**
	 * Set activity mode.
	 * 
	 * Use `Screen.MODE_*` constants to set mode.
	 * Default mode is `MODE_DEFAULT` (0).
	 * 
	 * @param {number} mode Activity mode ID
	 */
	setMode(mode) { this._activity_mode = mode; }

	/**
	 * Returns activity contents root block
	 * @deprecated
	 */
	getRootBlock() {
		Log.w("Screen", "getRootBlock method is deprecated and will be removed!")
		return this._activity_contents.container;
	}
	
	/**
	 * Returns scrolling block from activity.
	 * Used to setup onScroll listeners.
	 * 
	 * @returns {HTMLElement}
	 */
	getScrollerBlock() {
		return this._activity_contents;
	}

	/**
	 * Remove all activity contents, except config and fixed views
	 */
	wipeContents() {
		this._activity_contents.container.innerHTML = "";
	}

	// Events
	/**
	 * Event listener, calls on screen start
	 * @param {*} data User-rpovided data from constructor
	 */
	onCreate(data) {
		Log.w("Screen", "onCreate is not overriden!");
	}

	/**
	 * Event listener, calls on screen refresh or manually
	 */
	onUpdate() { }
	/**
	 * Event listener, calls before screen construct
	 */
	onInit() { }
	/**
	 * Event listener, calls on screen destroy. Must return a boolean.
	 * 
	 * If returns `false`, screen finish will be cancelled.
	 * 
	 * @returns {boolean} is finish allowed?
	 */
	onFinish() {
		// Always allow
		return true;
	}

	// Actions
	/**
	 * Do screen destory
	 */
	finish() {
		let context = this, il = new InputLock();
		if (this.onFinish()) {
			// Finish allowed. Breaking...
			clearInterval(context._refresh_timer);
			il.enable();
			Utils.timer(50).then(function () {
				context._activity_root.classList.remove("show");
				return Utils.timer(Screen.FADE_DURATION);
			}).then(function () {
				il.disable();
				context._activity_root.remove();
			});
		}
	}

	/**
	 * Do activity build and display
	 */
	start() {
		let context = this, il = new InputLock;
		this.onCreate(this._bundle);
		this.onUpdate();

		il.enable();
		document.body.appendChild(this._activity_root);
		Utils.timer(50).then(function () {
			context._activity_root.classList.add("show");
			if (context._activity_mode == Screen.MODE_ROOT)
				context._activity_root.classList.add("noanim");
			return Utils.timer(Screen.FADE_DURATION);
		}).then(function () {
			il.disable();
		});
	}
}

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
