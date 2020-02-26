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
        fontSizeTitle: "Font size",
        accentColorTitle: "Accent color (HEX, empty to default)",
        reloadRequired: "Restart application to apply changes",
        cancel: "Cancel", ok: "Ok",
        nightmode: "Use black theme", daymode: "Use white theme"
    }};

    /**
     * OnCreate event override
     * @param {Object} loc Localization override
     */
    onCreate(loc) {
        var locale = FWSettingsScreen.LOCALE;
        if(loc) for(var a in loc) locale[a] = loc[a];
        this.addMod(new RightSideScreenMod());
        this.setHomeAsUpAction();
        this.locale = locale;
        this.onUpdate();
    }

    /**
     * OnUpdate event override
     */
    onUpdate() {
        var loc = this.locale, ctx = this;
        this.wipeContents();
        
        this.appendView(new RowView().setTitle(localStorage.fw_cfg_nightmode ? loc.nightmode : loc.daymode)
            .setIcon("wb_sunny").setSummary(loc.themeSummary).setOnClickListener(function(){
                if(localStorage.fw_cfg_nightmode == "true") localStorage.fw_cfg_nightmode = "";
                else localStorage.fw_cfg_nightmode = "true";
                FWInit.cfgInit();
            }));

        if(!localStorage.fw_cfg_font_size) 
            localStorage.fw_cfg_font_size = 1;
        
        this.appendView(new RowView().setTitle(loc.fontSizeTitle)
            .setIcon("format_size")
            .setSummary(Math.round(localStorage.fw_cfg_font_size*100)+"% of default")
            .setOnClickListener(function(){
                var te = new TextInput().setTitle(loc.fontSizeTitle)
                    .fromString(Math.round(localStorage.fw_cfg_font_size*100));
                
                var d = new Dialog().appendView(te)
                    .addButton(new Button().setText(loc.cancel).setOnClickListener(function(){
                        d.hide();
                    })).addButton(new Button().setText(loc.ok).setOnClickListener(function(){
                        console.log(te.toString()/100);
                        localStorage.fw_cfg_font_size = te.toString()/100;
                        d.hide();
                        ctx.onUpdate();
                    })).show();
            }));
        
        this.appendView(new RowView().setTitle(loc.accentColorTitle)
            .setIcon("palette")
            .setSummary(localStorage.fw_main_color)
            .setOnClickListener(function(){
                var te = new TextInput().setTitle(loc.fontSizeTitle)
                    .fromString(localStorage.fw_main_color);
                
                var d = new Dialog().appendView(te)
                    .addButton(new Button().setText(loc.cancel).setOnClickListener(function(){
                        d.hide();
                    })).addButton(new Button().setText(loc.ok).setOnClickListener(function(){
                        localStorage.fw_main_color = te.toString();
                        d.hide();
                        ctx.onUpdate();
                    })).show();
            }));

            this.appendView(new TextView("info", loc.reloadRequired));
    }
}