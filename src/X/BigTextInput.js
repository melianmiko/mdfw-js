class BigTextInput extends TextInput {
	constructor() {
		super();
        this.block = Utils.inflate({type: "div", class: "fw-textinput", childs: {
            titlebx: {type: "div", class: "title"},
            editor: {type: "textarea", class: "input ta"}
		}});
		
        this.block.editor.onkeyup = function() {
            this.style.height = "25px";
            this.style.height = (this.scrollHeight)+"px";
        }
	}

	getBlock() {
		var b = super.getBlock();
		Utils.timer(50).then(function(){
			b.editor.onkeyup();
		});
		return b;
	}

	fromString(value) {
		super.fromString(value);
		this.block.editor.onkeyup();
		return this;
	}
}
