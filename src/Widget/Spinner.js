/**
 * Spin animation view widget
 */
class Spinner {
	get IS_VIEW() {return true;}

	constructor() {}

	getBlock() {
		var b = Utils.inflate({type: "div", class: "fw-spinner"});
		b.style.color = Config.mainColor;
		return b;
	}
}
