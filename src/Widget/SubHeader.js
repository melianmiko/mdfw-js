/**
 * SubHeader is view (widget) that provides list separator with title.
 */
class SubHeader {
	get IS_VIEW() { return true; }
	/**
	 * Constructor
	 * @param {string} text Header value
	 */
	constructor(text) {
		this.text = text;
	}
	/**
	 * Build and return HTMLElement
	 */
	getBlock() {
		var d = Utils.inflate({type: "div", class: "fw-subheader"});
		d.innerHTML = this.text;
		d.style.color = Config.mainColor;
		return d;
	}
}
