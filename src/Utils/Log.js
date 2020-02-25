/**
 * Logs provider class
 */
class Log {
	/**
	 * Send debug log
	 * @param {string} tag Class name or other identifer
	 * @param {*} data Data to logging
	 */
	static d(tag, data) {
		Log.journal += "<div>[" + tag + "] " + data + "</div>";
		//		if(!AppConfig.enableDebug) return;
		console.log("[" + tag + "]", data);
	}

	/**
	 * Send info-level log
	 * @param {string} tag Class name or other identifer
	 * @param {*} data Data to logging
	 */
	static i(tag, data) {
		Log.journal += "<div style='color:#00a'>[" + tag + "] " + data + "</div>";
		console.info("[" + tag + "]", data);
	}

	/**
	 * Send warring
	 * @param {string} tag Class name or other identifer
	 * @param {*} data Data to logging
	 */
	static w(tag, data) {
		Log.journal += "<div style='color:#aa0'>[" + tag + "] " + data + "</div>";
		console.warn("[" + tag + "]", data);
	}

	/**
	 * Send error
	 * @param {string} tag Class name or other identifer
	 * @param {*} data Data to logging
	 */
	static e(tag, data) {
		Log.journal += "<div style='color:#f00'>[" + tag + "] " + data + "</div>";
		console.error("[" + tag + "]", data);
	}
}

Log.journal = "";
