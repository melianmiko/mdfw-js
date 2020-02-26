// /**
//  * Screen with bottom navigation on mobile (or left side for desktop)
//  */
// class BottomNavigationScreen extends Screen {
// 	/**
// 	 * Bottom navigation layout
// 	 */
// 	static get BN_LAYOUT() {return {type: "div", class: "fw-bns-root", contains: {
// 		fragmentHost: {type: "div", class: "fragment-host"},
// 		menuHost: {type: "div", class: "extended-menu", contains: {
// 			navTopBox: {type: "div"},
// 			desktopOnlyMenu: {type: "div", class: "fw-nav-menu desktop-menu"},
// 			extendedMenu: {type: "div", class: "fw-nav-menu"},
// 			navBottomBox: {type: "div"}
// 		}},
// 		bottomNav: {type: "div", class: "bottom-nav"}
// 	}}};

// 	/**
// 	 * Default constructor
// 	 */
// 	constructor() {
// 		super();
// 		/**
// 		 * Bottom nav icons limit
// 		 */
// 		this._bn_icons_limit = 4;
// 		/**
// 		 * Is extended menu icon visible?
// 		 */
// 		this._bn_show_extended = true;
// 		/**
// 		 * Current fragment
// 		 */
// 		this._current = -1;
// 		/**
// 		 * Page fragments array
// 		 */
// 		this._pages = [];
// 		/**
// 		 * Page fragment titles array
// 		 */
// 		this._page_titles = [];
// 		/**
// 		 * Page fragment icons array
// 		 */
// 		this._page_icons = [];
// 		/**
// 		 * Host root
// 		 */
// 		this._host = Utils.inflate(BottomNavigationScreen.BN_LAYOUT);
// 	}

// 	/**
// 	 * Do activity build and display
// 	 */
// 	 start() {
// 	 	// Create BottomNavigationScreen
// 	 	this.addMod(new WideScreenMod());

// 	 	// Do default screen creation
// 	 	super.start();
// 	 }

// 	 /**
// 	  * Add fragment to iterator
// 	  */
// 	addFragment(fragment, title, icon) {
// 		var id = this._pages.length;
// 		this._pages[id] = fragment;
// 		this._page_titles[id] = title;
// 		this._page_icons[id] = icon;

// 		if(this._current < 0) openFragment(0);
// 		_rebuildMenus();
// 		return id;
// 	 }

// 	 /**
// 	  * Navigate to fragment with id
// 	  */
// 	 openFragment(id) {
// 	 	this._current = id;
// 	 	this._host.fragmentHost.innerHTML = "";

// 	 	var fragment = new this._pages[id];
// 	 	this._host.fragmentHost.appendView(fragment);

// 	 	this._rebuildMenus();
// 	 }

// 	 /**
// 	  * Rebuild navigation menus
// 	  */
// 	 _rebuildMenus() {
	 	
// 	 }

// 	 /**
// 	  * Set bottom navigation icons limit.
// 	  * Default: 4
// 	  */
// 	 setIconsLimit(limit) {
// 	 	this._bn_icons_limit = limit;
// 	 	this._rebuildMenus();
// 	 }

// 	 /**
// 	  * Show extended menu icon in bottom navigation
// 	  * Default: true
// 	  */
// 	 setShowExtendedMenuIcon(bool) {
// 	 	this._bn_show_extended = bool;
// 	 	this._rebuildMenus();
// 	 }

// 	/**
// 	 * Append view to screen.
// 	 * Disabled for this screen type
// 	 */
// 	appendView() {
// 		console.warn("You can't directly append views to BottomNavigationScreen");
// 	}
// }
