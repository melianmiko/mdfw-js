// All other classes are automaticly imported by Babel

/**
 * Framework initialization class. Technique usage only!
 */
class FWInit {
    /**
     * Initialize framework.
     */
    static init() {
        if(FWInit.asdzx_init_complete) return Log.w("Init", "Secondary init call is blocked!");
        Config._init();
        FWInit.cfgInit();

        FWInit.asdzx_init_complete = true;
    }

    /**
     * Parse local framework settings
     */
    static cfgInit() {
        if(localStorage.fw_cfg_font_size)
            document.documentElement.style.fontSize = localStorage.fw_cfg_font_size+"rem";

        localStorage.fw_cfg_nightmode ? document.documentElement.classList.add("fw-bcfg-darkmode") : 
            document.documentElement.classList.remove("fw-bcfg-darkmode");
    }
}

FWInit.init();
