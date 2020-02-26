class LeftSideScreenMod {
	install(screen) {
		console.warn("LeftSideScreenMod is experimental!");
		screen._activity_root.classList.add("sidescreen-left");

		// Install event listeners
		screen._activity_root.addEventListener("click", function() {
			screen.dismiss();
		});
		screen._activity_root.root.addEventListener("click", function(e) {
			e.preventDefault();
			e.stopPropagation();
		})
	}
}