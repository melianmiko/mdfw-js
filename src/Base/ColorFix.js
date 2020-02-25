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
