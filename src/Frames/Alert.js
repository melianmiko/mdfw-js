class Alert {
    setTitle(t) {
        this.title = t;
        return this;
    }
    setMessage(m) {
        this.message = m;
        return this;
    }
    setOnClickListener(c) {
        this.click = c;
        return this;
    }
	setOnCancelListener(c) {
		this.oncancel = c;
		return this;
	}
    show() {
        var c = this;
		var d = new Dialog().setMessage(this.message).setTitle(this.title)
			.setOnCancelListener(this.oncancel)
            .addButton(new Button().setText("Ok").setOnClickListener(function(){
                d.hide();
                c.click();
            })).show();
    }
}
