
/**
 * Framework utilities.
 */
class Utils {
	/**
	 * Generate HTMLElement by user-provide schema
	 * @param {object} data Structure for block generation
	 * @returns {HTMLElement}
	 */
	static inflate(data) {
		var block = document.createElement(data.type);
		if (data.class) block.className = data.class;
		if (data.id) block.id = data.id;
		if (data.inner) block.innerHTML = data.inner;
		if (data.height) block.style.height = data.height;
		if (data.color) block.style.color = data.color;

		if (data.childs) for (var a in data.childs)
			block[a] = block.appendChild(Utils.inflate(data.childs[a]));

		// Block-view hook
		block.IS_VIEW = true;
		block.getBlock = function() {return this;}
		block.appendView = function(v) {
			if(!v.IS_VIEW) Log.w("HTMLInflatorView", "Not a view!");
			this.appendChild(v.getBlock());
			return this;
		}

		// Install addons
		Utils.addLongTouchEvent(block);

		return block;
	}

	/**
	 * Create promise with timeout
	 * @param {number} time Wait time in ms
	 */
	static timer(time) {
		return new Promise(function (resolve) {
			setTimeout(function () {
				resolve();
			}, time);
		});
	}

	/**
	 * Add LongTouch listener to block
	 * 
	 * @param {HTMLElement} block Block to use
	 */
	static addLongTouchEvent(block) {
		var timer = -1;

		var supportsPassive = false;
		try {
		  var opts = Object.defineProperty({}, 'passive', {
		    get: function() {
		      supportsPassive = true;
		    }
		  });
		  window.addEventListener("testPassive", null, opts);
		  window.removeEventListener("testPassive", null, opts);
		} catch (e) {}

		block.onlongtap = null;
		block.addEventListener("touchstart",function(e){
			if(!block.onlongtap) return true;
			timer = setTimeout(function(e){
				if(block.onlongtap) block.onlongtap(e);
			}, 500);
			return !block.onlongtap;
		}, supportsPassive ? {passive: true} : false);
		block.addEventListener("touchmove", function(){
			if(timer) clearTimeout(timer);
		}, supportsPassive ? {passive: true} : false);
		block.addEventListener("touchend", function(){
			if(timer) clearTimeout(timer);
			return !block.onlongtap;
		});
		block.oncontextmenu = function(e){
			if(block.onlongtap) block.onlongtap(e);
			return !block.onlongtap;
		}
	}
}

/**
 * Display loading overlay
 */
class WaitScreen {
	/**
	 * Default contructor
	 */
	constructor() {
		/**
		 * Root container
		 * @type {HTMLElement}
		 */
		this.block = Utils.inflate(FWBlockSchemas.WAITSCREEN);
	}

	/**
	 * Show this overlay
	 */
	show() { document.body.appendChild(this.block); }

	/**
	 * Hide this overlay
	 */
	hide() { this.block.remove(); }
}

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

/**
 * This service automaticly removes focus after item click to remove click highlight.
 * @deprecated Didn't work. Will be removed!
 */
class UnFocusService {

	/**
	 * Do unFocus on block
	 * @param {HTMLElement} block Block to execute
	 */
	static _exec(block) {
		if(!Config.unfocusEnabled) return false;
		block.blur();
	}
	
	/**
	 * Register unFocus listener to element
	 * @param {HTMLElement} block Element to register
	 */
	static add(block) {
		block.addEventListener("click", function(){
			UnFocusService._exec(block);
		});
	}
}


/**
 * Stylesheet generator for current accent color
 * @deprecated 
 */
class ColorFix {
	/**
	 * Re-generate color stylesheet
	 */
	static execute() {
		var d = document.getElementById("colorfix");
		if(d) d.remove();

		var css = ".fw-button.style-flat::before, .fw-button.style-outline::before "+
			"{background-color: "+Config.mainColor+"}",
			style = document.createElement("style");

		if (style.styleSheet) {
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}

		d = document.createElement("div");
		d.id = "colorfix";
		d.appendChild(style);

		document.getElementsByTagName('head')[0].appendChild(d);
	}
}
