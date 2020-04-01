class FloatingActionButton {
	get IS_VIEW() { return true; }
	get IS_FIXED_VIEW() { return true; }
	
	static get MODE_DEFAULT() { return "fab-default"; }
	static get MODE_SMALL() { return "fab-small"; }
	static get MODE_EXPAND() { return "fab-expand"; }
	static get MODE_HIDE() { return "fab-default hide"; }

	constructor() {
		this.button = Utils.inflate({type: "div", class: "fw-fab "+FloatingActionButton.MODE_DEFAULT, childs: {
            icon: {type: "i", class: "material-icons"},
            textview: {type: "a", class: "fab-text"}
        }});
		this.button.style.backgroundColor = Config.mainColor;
	}

	setIcon(icon) {
        this.button.icon.innerHTML = icon;
		return this;
    }
    
    setTitle(title) {
        this.button.textview.innerHTML = title;
        return this;
    }

    setMode(mode) {
        this.button.className = "fw-fab "+mode;
        return this;
	}
	
	setOnClickListener(c) {
		this.button.onclick = c;
		return this;
	}

	attachScreen(screen, modea, modeb) {
		var ctx = this, prev = screen._activity_root.scrollTop;
		
		ctx.setMode(modea);
		screen.getScrollerBlock().addEventListener("scroll",function(){
			var df = prev-this.scrollTop;
			ctx.setMode(df > 0 ? modea : modeb);
			prev = this.scrollTop;
		});
		return this;
	}

	getBlock() {
		return this.button;
	}
}
