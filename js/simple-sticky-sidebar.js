
/* ========================================================================
 * Simple Sticky Sidebar
 * @version 0.1
 * @author Ismail Farooq <ismail_farooq@yahoo.com>
 * @license The MIT License (MIT) (https://github.com/ismailfarooq/simple-sticky-sidebar/blob/master/LICENSE)
 * ======================================================================== */


function setStyle(element, cssProperty) {
	for (var property in cssProperty){
		element.style[property] = cssProperty[property];
	}
}

function destroySticky(element){
	setStyle(element, {
		top 		: '',
			left		: '',
			bottom		: '',
			width		: '',
			position	: ''
		});
}

function getOffset(el) {
	el = el.getBoundingClientRect();
	return {
		left: el.left + window.scrollX,
		top: el.top + window.scrollY
	}
}

function simpleStickySidebar(element, options) {
	
	// Global options
	var sticky = document.querySelector(element);
	var container = document.querySelector(options.container);
	var topSpace = options.topSpace ? options.topSpace : 0;

	// vars
	var $window = window;
	var stickyHeight = sticky.getBoundingClientRect().height;
	var stickyOffsetTop = getOffset(sticky).top;
	var stickyOffsetBottom = getOffset(sticky).top + sticky.height;
	var stickyOffsetLeft = getOffset(sticky).left;
	var topFixed = false;
	var bottomFixed = false;
	var lastScrollVal = 0;

	// scrolling
	window.addEventListener('scroll', function(event) {
		var scrollTop = window.scrollY;
		// when scroll position touch the "Sticky Element"
		if(scrollTop > stickyOffsetTop - topSpace){
			// if "Sticky Element" smaller than viewport
			if(stickyHeight <= $window.innerHeight - topSpace){
				// fix "Sticky Element" from top
		   		setStyle(sticky, {
		   			top 		: topSpace + "px",
		   			left		: stickyOffsetLeft + "px",
		   			bottom		: '',
		   			width		: sticky.getBoundingClientRect().width + "px",
		   			position	: 'fixed'
		   		});

			}
			else {
				// scrolling down
				if (scrollTop > lastScrollVal){
					// update bottom offset
					stickyOffsetBottom = getOffset(sticky).top + sticky.getBoundingClientRect().height;

					// if "Sticky Element" fixed from top
					if(topFixed){
						// get new offset of "Sticky Element" if its become fixed from top
						var absoluteStickyOffsetTop = getOffset(sticky).top;

				   		setStyle(sticky, {
				   			top 		: absoluteStickyOffsetTop - getOffset(container).top + "px", // get relative offset
				   			left		: '',
				   			bottom		: '',
				   			width		: '',
				   			position	: 'absolute'
				   		});
						topFixed = false;	
					}

					// fix "Sticky Element" from bottom when bottom area visible in viewport
					if(scrollTop > stickyOffsetBottom - $window.innerHeight){
						setStyle(sticky, {
				   			top 		: '',
				   			left		: stickyOffsetLeft + "px",
				   			bottom		: "0px",
				   			width		: sticky.getBoundingClientRect().width + "px",
				   			position	: 'fixed'
				   		});
				   		bottomFixed = true;
					}
				} else {
					// get new offset of "Sticky Element" if its fixed from bottom
					var absoluteStickyOffsetTop = getOffset(sticky).top;
					// stuck relatively while scrolling up if "Sticky Element" fixed from bottom
					if(bottomFixed){
						setStyle(sticky, {
				   			top 		: absoluteStickyOffsetTop - getOffset(container).top + "px", // get relative offset
				   			left		: '',
				   			bottom		: '',
				   			width		: '',
				   			position	: 'absolute'
				   		});
						bottomFixed = false;	
					}
					// make "Sticky Element" fixed from top
					if(scrollTop < absoluteStickyOffsetTop - topSpace){
						setStyle(sticky, {
				   			top 		: topSpace + "px",
				   			left		: stickyOffsetLeft + "px",
				   			bottom		: '',
				   			width		: sticky.getBoundingClientRect().width + "px",
				   			position	: 'fixed'
				   		});
				   		topFixed = true;
					}
				}
				lastScrollVal = scrollTop;
			}
		} else {
			destroySticky(sticky);
		}
	});
}