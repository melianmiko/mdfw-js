/**
 * Expandable layout view
 * 
 * This layout contain some columns with width diapasones.
 * If screen width is smaller than sum of minimal widths of all columns,
 * it will be shown as list.
 *
 * Example:
 * Layout with two columns: left menu and main content
 * Menu width is 360px. Minimal content width is
 * 480px. If screen is smaller then 840px (360+480), columns
 * will be collspased. If bigger, will be expanded and shown as columns
 */
class ExpandableLayout {
	get IS_VIEW() { return true; }

	constructor() {
		/**
		 * Layout root view
		 */
		this._root = Utils.inflate({type: "div", class: "fw-layout-expandable"});
		/**
		 * Layout columns array
		 */
		this._columns = [];
		/**
		 * Layout clumns min widths array
		 */
		this._columnMinWidths = [];
		/**
		 * Layout clumns max widths array
		 */
		this._columnMaxWidths = [];
		/**
		 * Is expanded now?
		 */
		 this.isExpanded = false;
	}
	
	/**
	 * Remove window resize listener
	 */
	_unregister() {
		window.removeEventListener("resize", this._eventListener);
	}

	/**
	 * Create and apply window resize listener
	 */
	_register() {
		var ctx = this;

		/**
		 * On resize event listener method. Must be saved for unregister
		 * function
		 */
		ctx._eventListener = function() {
			if(!ctx._root.isConnected) ctx._unregister();
			else ctx._updateWidth();
		};

		window.addEventListener("resize", this._eventListener);
	}

	/**
	 * Check new window width and update layout
	 */
	_updateWidth() {
		var windowWidth = document.body.getBoundingClientRect().width,
			minExpandWidth = this._getExpandWidth(),
			maxExpandWidth = this._getMaxExpandWidth();

		if(windowWidth >= minExpandWidth) {
			// Expand
			this._root.classList.add("expanded");

			if(windowWidth > maxExpandWidth) {
				this._root.style.maxWidth = maxExpandWidth+"px";
			}

			for(var a in this._columns) {
				var cv = this._columns[a];
				cv.style.minWidth = this._columnMinWidths[a]+"px";
				cv.style.maxWidth = this._columnMaxWidths[a]+"px";
			}
		} else {
			// Collspace
			this._root.classList.remove("expanded");
			this._root.style.maxWidth = null;
			for(var a in this._columns) {
				var cv = this._columns[a];
				cv.style.minWidth = null;
				cv.style.maxWidth = null;
			}
		}
	}

	/**
	 * Calculate minimal expand width
	 * @returns width in px
	 */
	_getExpandWidth() {
		var width = 0;
		for(var a in this._columnMinWidths)
			width += this._columnMinWidths[a];
		return width;
	}

	/**
	 * Calculate maximal expand width
	 * @returns width in px
	 */
	_getMaxExpandWidth() {
		var width = 0;
		for(var a in this._columnMaxWidths)
			width += this._columnMaxWidths[a];
		return width;
	}

	/**
	 * Get root view block
	 */
	 getBlock() {
	 	var ctx = this;
	 	this._register();
 		ctx._updateWidth();
	 	return this._root;
	 }

	 /**
	  * Add new column
	  *
	  * @param minWidth minimal column width (integer)
	  * @param maxWidth maximal column width (integer)
	  * @returns new view
	  */
	  addColumn(minWidth, maxWidth) {
	  	if(!maxWidth) maxWidth = minWidth;
	  	if(!minWidth) minWidth = 200;

	  	var id = this._columns.length,
	  		colRoot = Utils.inflate({type: "div"});

	  	this._columns[id] = colRoot;
	  	this._columnMaxWidths[id] = maxWidth;
	  	this._columnMinWidths[id] = minWidth;
	  	this._root.appendView(colRoot);
	  	this._updateWidth();
	  	return colRoot;
	  }

	  /**
	   * Get column root by id
	   *
	   * @returns Column view
	   */
	  getColumnRoot(id) {
	  	return this._columns[id];
	  }
}
