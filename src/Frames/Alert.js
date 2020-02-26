/**
 * Alert dialog
 *
 * This class can be used to create simple message alert dialog.
 * Example:
 * ```js
 * new Alert().setMessage("Hello, world!").show();
 * ```
 */
class Alert {
    /**
     * Set message title
     * @param t title string
     * @returns this alert dialog
     */
    setTitle(t) {
        /**
         * Message title
         */
        this._title = t;
        return this;
    }

    /**
     * Set message content
     * @param m message text
     * @returns this alert dialog
     */
    setMessage(m) {
        /**
         * Message text
         */
        this._message = m;
        return this;
    }

    /**
     * Set on button click listener
     * @param c function to execute
     * @returns this alert dialog
     */
    setOnClickListener(c) {
        /**
         * CLick listener
         */
        this._click = c;
        return this;
    }

    /**
     * Set on dismiss listener
     * @param c function to execute
     * @returns this alert dialog
     */
	setOnCancelListener(c) {
        /**
         * On dismiss listener
         */
		this._oncancel = c;
		return this;
	}

    /**
     * Show this dialog
     */
    show() {
        var c = this;
		var d = new Dialog().setMessage(this._message).setTitle(this._title)
			.setOnCancelListener(this._oncancel)
            .addButton(new Button().setText("Ok").setOnClickListener(function(){
                d.hide();
                c._click();
            })).show();
    }
}
