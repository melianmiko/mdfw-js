class NoActionBarScreenMod {
	install(screen) {
		screen._activity_ab_root.style.display = "none";
		screen._activity_root.root.contents.tbh_fixed.style.display = "none";
	}
}