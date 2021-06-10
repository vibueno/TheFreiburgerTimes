import { functions } from './functions.js';
import {
  HEADER,
  MAIN,
  HAMBURGER_MENU,
  X_MENU,
  MENU_ENTRIES,
  BACK_TO_TOP,
} from './constants.js';

window.onload = function() {
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
      functions.openMenu();
    } else {
      functions.closeMenu();
    }

    e.stopPropagation();
  });

  /**
   * @description Closes the side menu when user clicks outside of it
   *
   */

  //event ĺistener added for all elements which should close menu when clicked
  [HEADER, MAIN, X_MENU].forEach(item => {
    item.addEventListener('click', function() {
      functions.closeMenu();
    });
  });

  /**
   * @description Closes side menu after clicking on menu entry
   *
   */

  /* This behaviour could also be achieved with event delegation,
  but since we only have a couple of menu entries,
  it does not pay off to complicate the code
  (we are using vanilla JS) */

  for (const MENU_ENTRY of MENU_ENTRIES) {
    MENU_ENTRY.addEventListener('click', function() {
      functions.closeMenu();
    });
  }

  /**
   * @description Scrolls to page top when back to top button clicked
   *
   */
  BACK_TO_TOP.addEventListener('click', function() {
    scroll(0, 0);
  });

  /**
   * @description Checks on each scroll whether back to top button should be shown
   *
   */
  window.addEventListener('scroll', function() {
    functions.setBacktotopVisibility();
  });

  /**
   *
   * Initial calls
   *
   */

  functions.setBacktotopVisibility();
};
