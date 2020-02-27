/**
 * Framework setings screen.
 * 
 * Usage:
 * ```js
 * new FWSettingsScreen().start();
 * // Or, if you need another localization, override
 * // FWSettingsScreen.LOCALE items:
 * 
 * new FWSettingsScreen({
 *   // Provide your alternative for FWSettingsScreen.LOCALE strings here
 * }).start();
 * ```
 */
class FWSettingsScreen extends Screen {
    /**
     * Localization strings (default, english)
     */
    static get LOCALE() {return {
        cancel: "Cancel", ok: "Ok", apply: "Restart and apply",
        darkTheme: "Dark theme", bigMode: "Interface scale",
        restartRequired: "Application restart required to apply this changes.",
        titleColorAccent: "Color"
    }};
    /**
     * Colors palette
     */
    static get COLORS() {return [
        "#0099FF", "#0099CC", "#FF9900", "#DD0000",
        "#FF0099", "#FFCC00", "#0033FF", "#0011CC",
        "#FF00DD", "#333333", "#555555", "#AAAAAA"
    ]};

    /**
     * OnCreate event override
     * @param {Object} loc Localization override
     */
    onCreate(loc) {
        var locale = FWSettingsScreen.LOCALE;
        if(loc) for(var a in loc) locale[a] = loc[a];
        this.addMod(new RightSideScreenMod());
        this.setHomeAsUpAction();
        this.addAction(new MenuItem(locale.apply, "checkbox", () => {
            location.reload();
        }))
        this.locale = locale;

        this.appendView(new Checkbox()
            .setTitle(locale.darkTheme)
            .setChecked(localStorage.fw_cfg_nightmode === "true")
            .setOnCheckedListener((isChecked) => {
                localStorage.fw_cfg_nightmode = (isChecked ? "true" : "");
            }));

        this.appendView(new Checkbox()
            .setTitle(locale.bigMode)
            .setChecked(localStorage.fw_cfg_font_size === "1.25")
            .setOnCheckedListener((isChecked) => {
                if(isChecked) localStorage.fw_cfg_font_size = "1.25";
                else localStorage.fw_cfg_font_size = "";
            }));

        this.appendView(new SubHeader(locale.titleColorAccent));

        this._palette = Utils.inflate({type: "div", class: "fw-palette"});
        this.appendView(this._palette);
        this.updatePalette();
    }

    updatePalette() {
        this._palette.innerHTML = "";
        this.addColor(Config.defaultColor);
        for(var a in FWSettingsScreen.COLORS) {
            this.addColor(FWSettingsScreen.COLORS[a]);
        }
    }

    addColor(color) {
        var ctx = this;
        var view = Utils.inflate({
            type: "div", class: "color "+(Config.mainColor == color ? "selected" : "")
        });
        view.onclick = function() {
            localStorage.fw_main_color = color;
            ctx.updatePalette();
        };
        view.style.backgroundColor = color;
        this._palette.appendView(view)
    }

    /**
     * OnUpdate event override
     */
    // onUpdate() {
    //     var loc = this.locale, ctx = this;
    //     this.wipeContents();
        
    //     this.appendView(new RowView().setTitle(localStorage.fw_cfg_nightmode ? loc.nightmode : loc.daymode)
    //         .setIcon("wb_sunny").setSummary(loc.themeSummary).setOnClickListener(function(){
    //             if(localStorage.fw_cfg_nightmode == "true") localStorage.fw_cfg_nightmode = "";
    //             else localStorage.fw_cfg_nightmode = "true";
    //             FWInit.cfgInit();
    //         }));

    //     if(!localStorage.fw_cfg_font_size) 
    //         localStorage.fw_cfg_font_size = 1;
        
    //     this.appendView(new RowView().setTitle(loc.fontSizeTitle)
    //         .setIcon("format_size")
    //         .setSummary(Math.round(localStorage.fw_cfg_font_size*100)+"% of default")
    //         .setOnClickListener(function(){
    //             var te = new TextInput().setTitle(loc.fontSizeTitle)
    //                 .fromString(Math.round(localStorage.fw_cfg_font_size*100));
                
    //             var d = new Dialog().appendView(te)
    //                 .addButton(new Button().setText(loc.cancel).setOnClickListener(function(){
    //                     d.hide();
    //                 })).addButton(new Button().setText(loc.ok).setOnClickListener(function(){
    //                     console.log(te.toString()/100);
    //                     localStorage.fw_cfg_font_size = te.toString()/100;
    //                     d.hide();
    //                     ctx.onUpdate();
    //                 })).show();
    //         }));
        
    //     this.appendView(new RowView().setTitle(loc.accentColorTitle)
    //         .setIcon("palette")
    //         .setSummary(localStorage.fw_main_color)
    //         .setOnClickListener(function(){
    //             var te = new TextInput().setTitle(loc.fontSizeTitle)
    //                 .fromString(localStorage.fw_main_color);
                
    //             var d = new Dialog().appendView(te)
    //                 .addButton(new Button().setText(loc.cancel).setOnClickListener(function(){
    //                     d.hide();
    //                 })).addButton(new Button().setText(loc.ok).setOnClickListener(function(){
    //                     localStorage.fw_main_color = te.toString();
    //                     d.hide();
    //                     ctx.onUpdate();
    //                 })).show();
    //         }));

    //         this.appendView(new TextView("info", loc.reloadRequired));
    // }
}