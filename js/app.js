window.onload=function(){

	const body = document.querySelector('body');
	const header = document.querySelector('.header');
	const main = document.querySelector('.main');
	const drawer = document.querySelector('#drawer');
	const menu = document.querySelector('#menu');
	const hamburguer = document.querySelector('.hamburguer');
	const x = document.querySelector('.x');
	const menu_entries = document.querySelectorAll('.nav__item > a');
	const backtotop = document.querySelector('.backtotop');

	let headerPaddingRight = header.style.paddingRight === ''?'0':header.style.paddingRight;
	let mainPaddingRight = main.style.paddingRight === ''?'0':main.style.paddingRight;

	function setBacktotopVisibility(){
		if (((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight/1.75) && (!drawer.classList.contains('open'))) {
			window.setTimeout( function() {
				backtotop.classList.remove('backtotop__hidden');
				backtotop.classList.add('backtotop__visible');
			}, 100);

		}
		else{
			window.setTimeout( function() {
				backtotop.classList.remove('backtotop__visible');
				backtotop.classList.add('backtotop__hidden');
			}, 100);
		};
	}

	function openMenu(){

		const scrollYWidth = window.innerWidth - document.documentElement.clientWidth;

		drawer.classList.add('open');
		hamburguer.style.display = 'none';
		x.style.display = 'block';

		/*Deactivating scrolling*/
		body.style.overflow = 'hidden';
		body.style.position = 'absolute';
		header.style.paddingRight = `${scrollYWidth}px`;
		main.style.paddingRight = `${scrollYWidth}px`;

		setBacktotopVisibility();
	}

	function closeMenu(){
		drawer.classList.remove('open');
		hamburguer.style.display = 'block';
		x.style.display = 'none';

		/*Reactivating scrolling*/
		body.style.overflow = 'auto';

		header.style.paddingRight = `${headerPaddingRight}px`;
		main.style.paddingRight = `${mainPaddingRight}px`;

		setBacktotopVisibility();
	}

	setBacktotopVisibility();

	menu.addEventListener('click', function(e) {

		if (!this.classList.contains('open')){
			openMenu();
		}
		else{
			closeMenu();
		}

		e.stopPropagation();
	});

	[header, main, x].forEach(item => {
	  item.addEventListener('click',  function() {
			closeMenu();
		});
	});

	for (const menu_entry of menu_entries) {
		menu_entry.addEventListener('click', function() {
			closeMenu();
		});
	};

	backtotop.addEventListener('click', function() {
		scroll(0,0);
	});

	window.addEventListener('scroll', function(e) {
		setBacktotopVisibility();
	});
}