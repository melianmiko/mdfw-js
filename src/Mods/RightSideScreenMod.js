class RightSideScreenMod {
	install(screen) {
		screen._activity_root.classList.add("sidescreen-right");

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