class Dialog {
	constructor() {
		this.buttons = [];
		this.views = [];
		this.title = "";
		this.message = "";
	}

	setTitle(t) {
		this.title = t;
		return this;
	}

	setMessage(m) {
		this.message = m;
		return this;
	}

	addButton(b) {
		if(!b.IS_VIEW) return false;
		this.buttons[this.buttons.length] = b;
		return this;
	}

	appendView(v) {
		if(!v.IS_VIEW) return false;
		this.views[this.views.length] = v;
		return this;
	}

	show() {
		if(this.shown) return Log.w("FWDialog", "Dialog can't be shown repeatedly! Create new instance of class and then show it!");
		var m = new ModalWindow().setOnCancelListener(this.oncancel),
			t = Utils.inflate({type: "div", class: "textbox"});

		m.appendView(t);

		if(this.title) 
			t.appendView(Utils.inflate({type: "header", class: "title", inner: this.title}));

		if(this.message)
			t.appendView(Utils.inflate({type: "div", class: "message", inner: this.message}));

		for(var a in this.views) m.appendView(this.views[a]);

		var btns = Utils.inflate({type: "div", class: "buttons"});
		for(var a in this.buttons) btns.appendChild(this.buttons[a].getBlock());
		m.appendView(btns);
		
		this.shown = true;
		this.modal = m;

		m.show();
		return this;
	}

	hide(c) {
		this.modal.hide(c);
	}

	setOnCancelListener(c) {
		this.oncancel = c;
		return this;
	}
}
