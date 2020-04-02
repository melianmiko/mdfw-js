
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

	/**
	 * Converts an RGB color value to HSL. 

	 * Conversion formula
	 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
	 * Assumes r, g, and b are contained in the set [0, 255] and
	 * returns h, s, and l in the set [0, 1].
	 *
	 * Source https://gist.github.com/mjackson/5311256
	 *
	 * @param   Number  r       The red color value
	 * @param   Number  g       The green color value
	 * @param   Number  b       The blue color value
	 * @return  Object          The HSL representation
	 */
	static rgbToHsl(r, g, b) {
		r /= 255, g /= 255, b /= 255;

		var max = Math.max(r, g, b), min = Math.min(r, g, b);
		var h, s, l = (max + min) / 2;

		if (max == min) {
			h = s = 0; // achromatic
		} else {
			var d = max - min;
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

			switch (max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}

			h /= 6;
		}

		return {h: h, s: s, l: l}
	}

	/**
	 * Converts an HSL color value to RGB. 
	 * 
	 * Conversion formula
	 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
	 * Assumes h, s, and l are contained in the set [0, 1] and
	 * returns r, g, and b in the set [0, 255].
	 *
	 * Source https://gist.github.com/mjackson/5311256
	 *
	 * @param   Number  h       The hue
	 * @param   Number  s       The saturation
	 * @param   Number  l       The lightness
	 * @return  Object          The RGB representation
	 */
	static hslToRgb(h, s, l) {
		var r, g, b;

		if (s == 0) {
			r = g = b = l; // achromatic
		} else {
			function hue2rgb(p, q, t) {
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1/6) return p + (q - p) * 6 * t;
				if (t < 1/2) return q;
				if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
				return p;
			}

			var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			var p = 2 * l - q;

			r = hue2rgb(p, q, h + 1/3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1/3);
		}

		return {
			r: Math.round(r*255), 
			g: Math.round(g*255), 
			b: Math.round(b*255)
		};
	}

	/**
	 * Convert RGB color to hex
	 */
	static rgbToHex(r, g, b) {
		var componentToHex = function(c) {
			var hex = c.toString(16);
			return hex.length == 1 ? "0" + hex : hex;
		};

		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}

	/**
	 * Convert hex color to RGB
	 */
	static hexToRgb(hex) {
		var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
		hex = hex.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b;
		});

		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16)
		} : null;
	}

	static setHexLightLevel(hex, newLight) {
		var rgb = Utils.hexToRgb(hex);
		var hsl = Utils.rgbToHsl(rgb.r, rgb.g, rgb.b);

		hsl.l = newLight;
		rgb = Utils.hslToRgb(hsl.h, hsl.s, hsl.l);
		hex = Utils.rgbToHex(rgb.r, rgb.g, rgb.b);

		console.log(hsl, rgb, hex);
		return hex;
	}
}

