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
	 * Get default main color (ignore settings override)
	 */
	static get defaultColor() {
		return Config._mainColor;
	}

	/**
	 * Accent background color. This is mainColor with lightness 0.95
	 */
	static get accentBackgroundColor() {
		// TODO: Make color darker for black theme
		return Utils.setHexLightLevel(Config.mainColor, 0.9);
	}

	/**
	 * Setter of main accent color from framework skin
	 */
	static set mainColor(c) {
		Config._mainColor = c;
		ColorFix.execute();
	}
}

