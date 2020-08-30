window.onload=function(){

	const body = document.querySelector("body");
	const header = document.querySelector(".header");
	const main = document.querySelector(".main");
	const drawer = document.querySelector("#drawer");
	const hamburgerMenu = document.querySelector("#hamburgerMenu");
	const xMenu = document.querySelector("#xMenu");
	const menu_entries = document.querySelectorAll(".nav-item > a");
	const backtotop = document.querySelector(".backtotop");
	const backtotopClassVisible = "backtotop-visible";
	const backtotopClassHidden = "backtotop-hidden";

	let headerPaddingRight = header.style.paddingRight === ""?"0":header.style.paddingRight;
	let mainPaddingRight = main.style.paddingRight === ""?"0":main.style.paddingRight;

	/**
	 * Sets the visibility of the back to top button
	 */

	function setBacktotopVisibility(){
		if (((window.innerHeight + window.pageYOffset) >= (document.body.offsetHeight/1.75)) &&
			(!drawer.classList.contains("open"))) {
			window.setTimeout( function() {
				backtotop.classList.remove(backtotopClassHidden);
				backtotop.classList.add(backtotopClassVisible);
			}, 100);

		}
		else{
			window.setTimeout( function() {
				backtotop.classList.remove(backtotopClassVisible);
				backtotop.classList.add(backtotopClassHidden);
			}, 100);
		}
	}

	/**
	 * Opens the side menu on smaller viewports
	 */

	function openMenu(){

		const scrollYWidth = window.innerWidth - document.documentElement.clientWidth;

		drawer.classList.add("open");
		hamburgerMenu.style.display = "none";
		xMenu.style.display = "block";

		/*Deactivating scrolling*/
		body.style.overflow = "hidden";
		body.style.position = "absolute";
		header.style.paddingRight = `${scrollYWidth}px`;
		main.style.paddingRight = `${scrollYWidth}px`;

		setBacktotopVisibility();
	}

	/**
	 * Closes the side menu on smaller viewports
	 */

	function closeMenu(){
		drawer.classList.remove("open");
		hamburgerMenu.style.display = "block";
		xMenu.style.display = "none";

		/*Reactivating scrolling*/
		body.style.overflow = "auto";

		header.style.paddingRight = `${headerPaddingRight}px`;
		main.style.paddingRight = `${mainPaddingRight}px`;

		setBacktotopVisibility();
	}

	/**
	 *
	 * Events
	 *
	 */

	/**
	 * Toggles the side menu
	 */

	hamburgerMenu.addEventListener("click", function(e) {

		if (!this.classList.contains("open")){
			openMenu();
		}
		else{
			closeMenu();
		}

		e.stopPropagation();
	});


	/**
	 * Side menu should get closed when the user clicks outside it
	 * We add a click event ĺistener for all the elements which should
	 * close the menu when clicked
	 */

	[header, main, xMenu].forEach(item => {
	  item.addEventListener("click",  function() {
			closeMenu();
		});
	});

	/*
	 * Side menu should get closed after clicking on a menu entry

	 * This behaviour could also be achieved with event delegation,
	 * but since we only have a couple of menu entries,
	 * it does not pay off to complicate the code
	 * (we are using vanilla JS)
	 */

	for (const menu_entry of menu_entries) {
		menu_entry.addEventListener("click", function() {
			closeMenu();
		});
	}

	/**
	 * Scroll to page top when back to top button clicked
	 */

	backtotop.addEventListener("click", function() {
		scroll(0,0);
	});

	/**
	 * On each scroll, wen need to check whether the back to top button
	 * should be shown or hidden
	 */

	window.addEventListener("scroll", function() {
		setBacktotopVisibility();
	});


	/**
	 *
	 * Initial calls
	 *
	 */

	setBacktotopVisibility();

};