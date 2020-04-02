class BigTextInput extends TextInput {
	constructor() {
		super();

		var view = this;
        this.block = Utils.inflate({type: "div", class: "fw-textinput big", childs: {
            titlebx: {type: "div", class: "title"},
            editor: {type: "textarea", class: "input ta"}
		}});
        this.block.editor.onfocus = function() {view.onFocusChanged(true); };
        this.block.editor.onblur = function() {view.onFocusChanged(false); };
        // TODO: Move title to content box, if no holder and no content is set

        this.block.editor.onkeyup = function() {
            this.style.height = "2em";
            this.style.height = (this.scrollHeight)+"px";
        }
        this.block.editor.onkeydown = function() {
            this.style.height = "2em";
            this.style.height = (this.scrollHeight)+"px";
        }
        this.block.editor.onkeypress = function() {
            this.style.height = "2em";
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
