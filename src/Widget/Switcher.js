/**
 * Switcher is a simple tabs widget.
 */
class Switcher {
	/**
	 * View flag
	 */
	get IS_VIEW() {return true;}

	/**
	 * Default constructor
	 */
	constructor() {
		/**
		 * View root
		 */
		this._root = Utils.inflate({type: "div", childs: {
			switcher: {type: "div", class: "fw-switcher-widget", childs: {
				buttons: {type: "div", class: "buttons-area"}
			}}
		}})

		/**
		 * On switch listener
		 */
		this._onSwitch = function() {};

		this._root.panels = [];
		this._root.buttons = [];
	}

	/**
	 * Get block function
	 * @return View root block
	 */
	getBlock() {
		return this._root;
	}

	/**
	 * Set on switch listener
	 * @param listener function
	 */
	setOnSwitchListener(listener) {
		this._onSwitch = listener;
	}

	/**
	 * Add new tak.
	 * @param title Display name
	 * @return LinearLayout for tab content
	 */
	add(title) {
		var cbk = this;
		var newTabId = this._root.buttons.length,
			tabBtn = Utils.inflate({type: "div", inner: title}),
			tabPanel = new LinearLayout();

		tabBtn.onclick = function() {
			cbk.open(newTabId);
		};
		tabPanel.setVisible(false);

		this._root.buttons[newTabId] = tabBtn;
		this._root.panels[newTabId] = tabPanel;

		this._root.appendView(tabPanel);
		this._root.switcher.buttons.appendView(tabBtn);

		if(newTabId == 0)
			this.open(0);

		return tabPanel;
	}

	/**
	 * Switch to tab
	 */
	open(num) {
		var panel = this._root.panels[num],
			button = this._root.buttons[num];

		for(var a in this._root.panels)
			this._root.panels[a].setVisible(false);
		for(var b in this._root.buttons)
			this._root.buttons[b].style.background = "";

		panel.setVisible(true);
		button.style.background = Config.accentBackgroundColor;
	}
}