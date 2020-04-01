/**
 * Text input widget. Based on HTML Input.
 */
class TextInput {
	get IS_VIEW() { return true; }
	/**
	 * Default contructor
	 */
    constructor() {
        this.block = Utils.inflate({type: "div", class: "fw-textinput", childs: {
            titlebx: {type: "div", class: "title"},
            editor: {type: "input", class: "input"}
        }});
    }

	/**
	 * Mark input as readonly
	 */
	makeReadonly() {
		this.block.editor.setAttribute("readonly", "true");
        this.block.classList.add("readonly");
        return this;
    }
	
	/**
	 * Remove readonly mark
	 */
	unmakeReadonly() {
		this.block.editor.setAttribute("readonly", "false");
		this.block.classList.remove("readonly");
        return this;
    }

	/**
	 * Set placeholder text
	 * 
	 * @param {string} s Placeholder text
	 */
	setHolder(s) {
        this.block.editor.placeholder = s;
        return this;
    }

	/**
	 * Get block.
	 */
    getBlock() {return this.block;}

	/**
	 * Get value of input
	 * @returns {string} value
	 */
    toString() {
        return this.block.editor.value;
	}
	
	/**
	 * Set input type.
	 * 
	 * Use any HTML4-5 compitable input type as parameter.
	 * @param {string} type Input type
	 * @returns {TextInput} Callback
	 */
	setType(type) {
		this.block.editor.type = type;
		return this;
	}

	/**
	 * Set value to input
	 * 
	 * @param {string} value Value
	 */
    fromString(value) {
        this.block.editor.value = value;
        return this;
    }

	/**
	 * Set input title
	 * 
	 * @param {string} title Title
	 */
    setTitle(title) {
        this.block.titlebx.innerHTML = title;
        return this;
    }

	/**
	 * Remove block.
	 */
    remove() {
        this.block.remove();
    }
}

