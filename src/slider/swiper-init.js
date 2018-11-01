const swipers = [];

function bool( value ) {
	if ( value === 'false' || value === false || value <= 0 ) {
		return false;
	}

	return true;
}

function toParams( el, customParams = {} ) {
	// eslint-disable-next-line
	const attr = el.dataset;
	const params = {};
	if ( attr.withnavigation ) {
		params.navigation = {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		};
	}

	if ( attr.withpagination ) {
		params.pagination = {
			el: '.swiper-pagination',
			type: attr.paginationtype,
			clickable: true,
			dynamicBullets: bool( attr.dynamicbullets ),
		};
	}

	if ( attr.withscroll ) {
		params.scrollbar = {
			el: '.swiper-scrollbar',
			hide: true,
		};
	}

	if ( attr.withautoplay ) {
		params.autoplay = {
			delay: parseInt( attr.delay, 10 ),
			disableOnInteration: bool( attr.disableoninteraction ),
		};
	}

	params.direction = attr.direction;
	params.speed = parseInt( attr.speed, 10 );
	params.spaceBetween = parseInt( attr.spacebetween, 10 );
	params.slidesPerView = parseInt( attr.slidesperview, 10 );
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

	return { ...params, ...customParams };
}

function initSwiper( element, params ) {
	const id = swipers.length;

	// eslint-disable-next-line
	swipers[ id ] = new Swiper( element, toParams( element, params ) );
	return { id, swiper: swipers[ id ] };
}

let status = false;
// eslint-disable-next-line
function watchSwiper() {
	if ( status !== 'watching' ) {
		document.addEventListener( 'updateSwiper', function( event ) {
			const id = event.detail.id;
			const element = event.detail.element;
			const params = event.detail.params;
			// eslint-disable-next-line
			swipers[ id ] = new Swiper( element, toParams( element, params ) );
		} );
	}

	status = 'watching';
	return status;
}

function onSwiperReady() {
	document.addEventListener( 'DOMContentLoaded', () => {
		const elements = document.querySelectorAll( '.swiper-container' );

		// eslint-disable-next-line
		lodash.each( elements, function( el ) {
			initSwiper( el );
		} );
	} );
}

onSwiperReady();
