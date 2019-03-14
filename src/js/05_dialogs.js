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

class Confirm {
	constructor() {
		this.okbtn = "Ok";
		this.cancelbtn = "Cancel";
	}
	setPositiveButtonText(t) {
		this.okbtn = t;
		return this;
	}
	setNegativeButtonText(t) {
		this.cancelbtn = t;
		return this;
	}
    setTitle(t) {
        this.title = t;
        return this;
    }
    setMessage(m) {
        this.message = m;
        return this;
    }
    setOnConfirmListener(c) {
        this.click = c;
        return this;
    }
    show() {
        var c = this;
        var d = new Dialog().setMessage(this.message).setTitle(this.title)
			.setOnCancelListener(this.oncancel)
			.addButton(new Button().setText(this.cancelbtn).setOnClickListener(function(){
				d.hide(true);
			})).addButton(new Button().setText(this.okbtn).setOnClickListener(function(){
                d.hide();
                c.click();
            })).show();
    }

	setOnCancelListener(c) {
		this.oncancel = c;
		return this;
	}
}

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

class ModalWindow {
	constructor() {
        var ctx = this;
		this.blk = Utils.inflate({type: "div", class: "fw-dialog", childs: {
            container: {type: "div", class: "container"}
        }});

        this.blk.onclick = function(){
            ctx.hide(true); // Cancel dialog!
        }

        this.blk.container.onclick = function(e){
            e.stopPropagation();
        }
	}

	appendView(v) {
		if(!v.IS_VIEW) return Log.w("ModalWindow", "not a view!");
		this.blk.container.appendChild(v.getBlock());
	}

	setOnCancelListener(c) {
		this.oncancel = c;
		return this;
	}

	show() {
		var blk = this.blk;
		document.body.appendChild(blk);
        Utils.timer(50).then(function(){
            blk.style.opacity = 1;
		});
	}

	hide(cancel) {
		let blk = this.blk;
		if(cancel && this.oncancel) this.oncancel();

        blk.style.opacity = 0;
        Utils.timer(450).then(function(){
            blk.remove();
		});
	}
}
