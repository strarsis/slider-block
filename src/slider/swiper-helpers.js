/**
 * Helper functions for constructing and formatting Swiper API constructor parameters
 */

/**
 * Converts string and number values to boolean.
 *
 * @param {string|number|boolean} value - input value
 * @returns {boolean} - boolean equivalent to input value
 */
function bool( value ) {
	if ( value === 'false' || value === false || value <= 0 ) {
		return false;
	}

	return true;
}

/**
 * Convert string to base 10 number
 * @param {string} value - input value
 * @return {number} - number equivalent to input value
 */
function number( value ) {
	return parseInt( value, 10 );
}

/**
 * Create Swiper params object from dataset of block's swiper container
 *
 * @param {Object} input - dom element or element dataset
 * @param {Object} customParams - Extra Swiper params object for optional merging
 * @returns {Object} - Swiper params object
 */
function toParams( input, customParams = {} ) {
	var params = {};

	var element = input.element;
	var dataset = input.dataset;
	var attr;
	if ( element ) {
		attr = element.dataset;
	} else if ( dataset ) {
		attr = dataset;
	}

	if ( attr ) {
		if ( bool( attr.withnavigation ) ) {
			params.navigation = {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			};
		}

		if ( bool( attr.withpagination ) ) {
			params.pagination = {
				el: '.swiper-pagination',
				type: attr.paginationtype,
				clickable: true,
				dynamicBullets: bool( attr.dynamicbullets ),
			};
		}

		if ( bool( attr.withscroll ) ) {
			params.scrollbar = {
				el: '.swiper-scrollbar',
				hide: true,
			};
		}

		if ( bool( attr.withautoplay ) ) {
			params.autoplay = {
				delay: number( attr.delay ),
				disableOnInteration: bool( attr.disableoninteraction ),
			};
		} else {
			params.autoplay = false;
		}

		params.direction = attr.direction;
		if ( attr.direction === 'vertical' ) {
			params.height = attr.height;
		}
		params.speed = number( attr.speed );
		params.spaceBetween = number( attr.spacebetween );
		params.slidesPerView = number( attr.slidesperview );
		params.centeredSlides = bool( attr.centeredslides );
		params.freeMode = bool( attr.freemode );
		params.grabCursor = bool( attr.grabcursor );
		params.loop = bool( attr.loop );
		params.effect = attr.effect;

		switch ( attr.effect ) {
			case 'fade':
				params.fadeEffect = {
					crossFade: false,
				};
				break;

			case 'coverflow':
				params.coverflowEffect = {
					slideShadows: true,
					rotate: 50,
					stretch: 0,
					depth: 100,
					modifier: 1,
				};
				break;

			case 'flip':
				params.flipEffect = {
					slideShadows: true,
					limitRotation: true,
				};
				break;

			case 'cube':
				params.cubeEffect = {
					slideShadows: true,
					shadow: true,
					shadowOffset: 20,
					shadowScale: 0.94,
				};
				break;
		}
	}

	return { ...params, ...customParams };
}

var swiper = { toParams };
if ( 'object' === typeof window.wp ) {
	window.wp.swiper = swiper;
}
window.swiper = swiper;
