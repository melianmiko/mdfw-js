
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

