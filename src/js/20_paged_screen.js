/**
 * SlidingScreen - screen with multiple slides support.
 */
class SlidingScreen extends Screen {
    /**
     * Default constructor (overrides `super(data)` constructor)
     * @param {*} data Data for onCreate event
     */
    constructor(data) {
        super(data);

        /**
         * Root view of pager
         */
        this._ss_view = Utils.inflate(FWBlockSchemas.PAGER_SCHEMA);
        this._ss_view.IS_FIXED_VIEW = true;

        /**
         * Is swipe enabled
         * @type {boolean}
         */
        this._ss_swipeOn = true;
        /**
         * Pages array
         * @type {SlideView[]}
         */
        this._ss_pages = [];
        /**
         * Active screen id
         * @type {number}
         */
        this._ss_active = 0;

        super.appendView(this._ss_view);
        this._ss_swipeinit();
    }

    /**
     * Append view locker method
     * @param {View} v view
     */
	appendView(view) {
		if(!view.IS_VIEW) return false;
		if(view.IS_FIXED_VIEW)
			this._activity_root.root.appendChild(view.getBlock());
		else
    		Log.e("SlidingScreen", "Use getPage(page).appendView(view) instance of appendView!");
	}

    /**
     * Get page ID
     * @param {number} p Page ID
     */
    getPage(p) {
        return this._ss_pages[p];
    }

    /**
     * Remove all pages!
     */
    wipe() {
        this._ss_pages = [];
        this._ss_view.wrapper.innerHTML = "";
    }

    /**
     * Add new clear page
     */
    newPage() {
        var id = this._ss_pages.length,
            blk = Utils.inflate(FWBlockSchemas.PAGE_SCHEMA);

        blk.style.left = (100*id)+"%";
        this._ss_pages[id] = new SlideView(this, blk, id);
        this._ss_view.wrapper.appendView(blk);

        this._ss_cfgscroll(this._ss_active);
        this.initScrollMode();
        return this._ss_pages[id];
    }

    /**
     * Go to page
     * @param {number} p Page ID
     */
    openPage(p) {
		let wrp = this._ss_view.wrapper, ctx = this;
		this._ss_active = p;

		wrp.style.transition = "left 0.25s";
		Utils.timer(2).then(function() {
			wrp.style.left = -(100*p)+"%";
			return Utils.timer(240);
		}).then(function(){
            wrp.style.transition = "";
            ctx._ss_cfgscroll(p);
            ctx.initScrollMode();
        }).catch(function(e) {
            console.error(e);
        });
    }

    /**
     * Reconfigure page-scroll attachment
     * @param {number} p Page ID
     */
    _ss_cfgscroll(p) {
        this._ss_scrl_blk = this.getPage(p).getBlock();
        for(var a in this._ss_pages)
            this._ss_pages[a].getBlock().scrollTop = 0;
    }

    /**
     * Override getScrollBlock method
     */
    getScrollerBlock() {
        if(!this._ss_scrl_blk) return super.getScrollerBlock();
        return this._ss_scrl_blk;
    }

    /**
     * Go to page back
     */
    prevPage() {
        if(this._ss_active == 0) return;
        this.openPage(this._ss_active-1);
    }

    /**
     * Go to page next
     */
    nextPage() {
        if(this._ss_active == this._ss_pages.length-1) return;
        this.openPage(this._ss_active+1);
    }

    /**
     * Set swipe mode enabled/disabled.
     * @param {boolean} bool Is swipe enabled?
     */
    setSwipeEnabled(bool) {
        this._ss_swipeOn = bool;
    }

    /**
     * Init swipe events
     */
    _ss_swipeinit() {
        var wrp = this._ss_view.wrapper,
            touchData = {}, context = this;
                
        wrp.ontouchstart = function(e) {
            if(!context._ss_swipeOn) return;
            touchData.direction = null;
            touchData.startX = e.targetTouches[0].pageX;
            touchData.startY = e.targetTouches[0].pageY;
            touchData.startPos = this.getBoundingClientRect().left;
        };

        wrp.ontouchmove = function(e) {
            if(!context._ss_swipeOn) return;
            var rx = e.targetTouches[0].pageX-touchData.startX;
            var ry = e.targetTouches[0].pageY-touchData.startY;
            if(touchData.direction == null) {
                if( rx > 30 || rx < -30) touchData.direction = "h";
                else if( ry > 30 || ry < -30) touchData.direction = "v";
            }
            if(touchData.direction == "h") {
                e.stopPropagation();
                e.preventDefault();
                this.style.left = touchData.startPos+rx+"px";
            }
        };

        wrp.ontouchend = function(e) {
            if(!context._ss_swipeOn) return;
            if(touchData.direction != "h") return;
            var ex = e.changedTouches[0].pageX;
            var newPage = context._ss_active;
            if(ex < touchData.startX-75) newPage = context._ss_active+1;
            else if(ex > touchData.startX+75) newPage = context._ss_active-1;

            if(newPage == -1) newPage = 0;
            else if(newPage > context._ss_pages.length-1) newPage = context._ss_pages.length-1;
            context.openPage(newPage);
        }
    }
}

/**
 * Slide view widget
 */
class SlideView {
    get IS_VIEW() {return true;}
    
    /**
     * Default constructor
     * 
     * @param {SlidingScreen} context Context screen
     * @param {HTMLElement} block Page root block
     * @param {number} id Page ID
     */
    constructor(context, block, id) {
        this.ctx = context;
        this.block = block;
        this.tb = new ToolbarView();

        block.appendView(this.tb);
        block.addEventListener("scroll", function(){
			if(context._ss_active == id) context._ab_scrolltrg();
		})

        this.tb.add("Back", "arrow_back", function(){
            context.prevPage();
        });
        this.tb.add("Next", "arrow_forward", function(){
            context.nextPage();
        });
    }

    /**
     * Append view to page
     * @param {View} v View
     */
    appendView(v) {
        this.block.container.appendView(v);
    }

    /**
     * Return page root block
     */
    getBlock() {
        return this.block;
    }

    /**
     * Return page toolbar (at bottom)
     */
    getToolbar() {
        return this.tb;
    }
}