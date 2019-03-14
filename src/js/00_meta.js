/**
 * Global framework configuration class
 */
class Config {
	/**
	 * Framework version property
	 */
	static get FW_VERSION() {return "1.0";}
	/**
	 * Initialize static properties
	 * @returns {void}
	 */
	static _init() {
		Config.mainColor = "#009999";

		/**
		 * Toggle boolean for global unfocus service (see UnFocusService class)
		 * @type {boolean}
		 */
		Config.unfocusEnabled = true;
	}

	/**
	 * Getter of main accent color from framework skin
	 */
	static get mainColor() {
		if(localStorage.fw_main_color) return localStorage.fw_main_color;
		return Config._mainColor;
	}

	/**
	 * Setter of main accent color from framework skin
	 */
	static set mainColor(c) {
		Config._mainColor = c;
		ColorFix.execute();
	}
}

/**
 * Framework block schemas. Private class.
 */
class FWBlockSchemas {
	/**
	 * Activty (screen) schema
	 */
	static get ACTIVITY() {
		return {
			class: "fw-screen", type: "div", childs: {
				root: { type: "div", class: "fw-root-container" , childs: {
					topbar: {type: "div", class: "fw-topbar", childs: {
						container: {
							type: "div", class: "container", childs: {
								z_home: { type: "div", class: "zone-home" },
								z_left: { type: "div", class: "zone-left" },
								z_title: { type: "div", class: "zone-title" },
								z_right: { type: "div", class: "zone-left" }
							}
						}
					}},
					contents: {type: "div", class: "box-contents", childs: {
						tbh_fixed: {type: "div", class: "fw-topbar-holder"},
						holder: {type: "div", class: "holder", childs: {
							tbh_scroll: {type: "div", class: "fw-topbar-holder"},
							container: {type: "div", class: "container"}
						}}
					}}
				}}
			}
		};
	}
	/**
	 * Waitscreen block schema
	 */
	static get WAITSCREEN() {
		return {
			type: "div",
			class: "fw-spinactivity", childs: {
				spinner: { type: "div", class: "fw-spinner", inner: "Please wait..." }
			}
		};
	}

	/**
	 * Pager schema
	 */
	static get PAGER_SCHEMA() {
		return {type: "div", class: "fw-pager-view", childs: {
			wrapper: {type: "div", class: "fw-pager-wrapper"}
		}};
	}

	/**
	 * Page schema
	 */
	static get PAGE_SCHEMA() {
		return {type: "div", class: "fw-page", childs: {
			container: {type: "div", class: "container", childs: {
				filler: {type: "div", class: "filler"},
				contents: {type: "div", class: "page-contents"}
			}}
		}};
	}
}
