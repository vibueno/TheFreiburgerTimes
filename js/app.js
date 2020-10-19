window.onload=function(){

	const BODY = document.querySelector('body');
	const HEADER = document.querySelector('.header');
	const MAIN = document.querySelector('.main');
	const DRAWER = document.querySelector('#drawer');
	const HAMBURGER_MENU = document.querySelector('#hamburger-menu');
	const X_MENU = document.querySelector('#x-menu');
	const MENU_ENTRIES = document.querySelectorAll('.nav-item > a');
	const BACK_TO_TOP = document.querySelector('.back-to-top');
	const BACK_TO_TOP_CLASS_VISIBLE = 'back-to-top-visible';
	const BACK_TO_TOP_CLASS_HIDDEN = 'back-to-top-hidden';

	let headerPaddingRight = HEADER.style.paddingRight === ''?'0':HEADER.style.paddingRight;
	let mainPaddingRight = MAIN.style.paddingRight === ''?'0':MAIN.style.paddingRight;

	/**
   * @description Sets the visibility of the back to top button
	 */

	function setBacktotopVisibility() {
		if (((window.innerHeight + window.pageYOffset) >= (BODY.offsetHeight/1.75)) &&
			(!DRAWER.classList.contains('open'))) {
			window.setTimeout( function() {
				BACK_TO_TOP.classList.remove(BACK_TO_TOP_CLASS_HIDDEN);
				BACK_TO_TOP.classList.add(BACK_TO_TOP_CLASS_VISIBLE);
			}, 100);

		}
		else {
			window.setTimeout( function() {
				BACK_TO_TOP.classList.remove(BACK_TO_TOP_CLASS_VISIBLE);
				BACK_TO_TOP.classList.add(BACK_TO_TOP_CLASS_HIDDEN);
			}, 100);
		}
	}

	/**
	 * @description Opens the side menu on smaller viewports
	 */

	function openMenu() {

		const scrollYWidth = window.innerWidth - document.documentElement.clientWidth;

		DRAWER.classList.add('open');
		HAMBURGER_MENU.style.display = 'none';
		X_MENU.style.display = 'block';

		/*Deactivating scrolling*/
		BODY.style.overflow = 'hidden';
		BODY.style.position = 'absolute';
		HEADER.style.paddingRight = `${scrollYWidth}px`;
		MAIN.style.paddingRight = `${scrollYWidth}px`;

		setBacktotopVisibility();
	}

	/**
	  * @description Closes the side menu on smaller viewports
	 */

	function closeMenu() {
		DRAWER.classList.remove('open');
		HAMBURGER_MENU.style.display = 'block';
		X_MENU.style.display = 'none';

		/*Reactivating scrolling*/
		BODY.style.overflow = 'auto';

		HEADER.style.paddingRight = `${headerPaddingRight}px`;
		MAIN.style.paddingRight = `${mainPaddingRight}px`;

		setBacktotopVisibility();
	}

	/**
	 *
	 * Events
	 *
	 */

	/**
	 * @description Toggles the side menu
	 */

	HAMBURGER_MENU.addEventListener('click', function(e) {

		if (!this.classList.contains('open')) {
			openMenu();
		}
		else {
			closeMenu();
		}

		e.stopPropagation();
	});


	/**
	 * Side menu should get closed when the user clicks outside it
	 * We add a click event ĺistener for all the elements which should
	 * close the menu when clicked
	 */

	[HEADER, MAIN, X_MENU].forEach(item => {
	  item.addEventListener('click',  function() {
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

	for (const MENU_ENTRY of MENU_ENTRIES) {
		MENU_ENTRY.addEventListener('click', function() {
			closeMenu();
		});
	}

	/**
	 * Scroll to page top when back to top button clicked
	 */

	BACK_TO_TOP.addEventListener('click', function() {
		scroll(0,0);
	});

	/**
	 * On each scroll, wen need to check whether the back to top button
	 * should be shown or hidden
	 */

	window.addEventListener('scroll', function() {
		setBacktotopVisibility();
	});


	/**
	 *
	 * Initial calls
	 *
	 */

	setBacktotopVisibility();

};