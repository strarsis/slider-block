/**
 * Swiper script for front-end
 */
var toParams = window.swiper.toParams;

var swipers = [];

function initSwiper( element, params ) {
	var id = swipers.length;
	swipers[ id ] = new Swiper( element, toParams( { element }, params ) );
	return { id, swiper: swipers[ id ] };
}

function onSwiperReady() {
	document.addEventListener( 'DOMContentLoaded', () => {
		lodash.each(
			document.querySelectorAll( '.swiper-container' ),
			function( el ) {
				initSwiper( el );
			}
		);
	} );
}

onSwiperReady();
