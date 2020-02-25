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
