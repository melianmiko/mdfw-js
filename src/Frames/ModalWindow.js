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
