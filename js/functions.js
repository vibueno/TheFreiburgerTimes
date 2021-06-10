/**
 * @module functions
 */

import {
  BODY,
  HEADER,
  MAIN,
  DRAWER,
  HAMBURGER_MENU,
  X_MENU,
  BACK_TO_TOP,
  BACK_TO_TOP_CLASS_VISIBLE,
  BACK_TO_TOP_CLASS_HIDDEN,
} from './constants.js';

let functions = {
  /**
   * @description Sets the visibility of the back to top button
   */
  setBacktotopVisibility: function() {
    if (
      window.innerHeight + window.pageYOffset >= BODY.offsetHeight / 1.75 &&
      !DRAWER.classList.contains('open')
    ) {
      window.setTimeout(function() {
        BACK_TO_TOP.classList.remove(BACK_TO_TOP_CLASS_HIDDEN);
        BACK_TO_TOP.classList.add(BACK_TO_TOP_CLASS_VISIBLE);
      }, 100);
    } else {
      window.setTimeout(function() {
        BACK_TO_TOP.classList.remove(BACK_TO_TOP_CLASS_VISIBLE);
        BACK_TO_TOP.classList.add(BACK_TO_TOP_CLASS_HIDDEN);
      }, 100);
    }
  },

  /**
   * @description Opens the side menu on smaller viewports
   */
  openMenu: function() {
    const scrollYWidth =
      window.innerWidth - document.documentElement.clientWidth;

    DRAWER.classList.add('open');
    HAMBURGER_MENU.style.display = 'none';
    X_MENU.style.display = 'block';

    /*Deactivating scrolling*/
    BODY.style.overflow = 'hidden';
    BODY.style.position = 'absolute';
    HEADER.style.paddingRight = `${scrollYWidth}px`;
    MAIN.style.paddingRight = `${scrollYWidth}px`;

    functions.setBacktotopVisibility();
  },

  /**
   * @description Closes the side menu on smaller viewports
   */
  closeMenu: function() {
    let headerPaddingRight =
      HEADER.style.paddingRight === '' ? '0' : HEADER.style.paddingRight;
    let mainPaddingRight =
      MAIN.style.paddingRight === '' ? '0' : MAIN.style.paddingRight;

    DRAWER.classList.remove('open');
    HAMBURGER_MENU.style.display = 'block';
    X_MENU.style.display = 'none';

    /*Reactivating scrolling*/
    BODY.style.overflow = 'auto';

    HEADER.style.paddingRight = `${headerPaddingRight}px`;
    MAIN.style.paddingRight = `${mainPaddingRight}px`;

    functions.setBacktotopVisibility();
  },
};

export { functions };
