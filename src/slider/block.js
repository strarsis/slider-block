/**
 * BLOCK: slider-block
 *
 * Slider Block
 */

/**
 * Import CSS.
 */
import './style.scss';
import './editor.scss';

/**
 * Internal dependencies
 */
import { edit, save } from './slider';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

const validAlignments = [ 'wide', 'full' ];

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'slider-block/slider', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Slider' ), // Block title.
	icon: 'images-alt2', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Swiper' ),
		__( 'Slider' ),
	],
	attributes: {
		align: {
			type: 'string',
			default: 'wide',
		},
		slides: {
			type: 'number',
			default: 1,
		},
		params: {
			type: 'array',
			source: 'query',
			selector: '.swiper-container',
			query: {
				withNavigation: {
					type: 'string',
					source: 'attribute',
					attribute: 'data-withnavigation',
				},
				withPagination: {
					type: 'string',
					source: 'attribute',
					attribute: 'data-withpagination',
				},
				dynamicBullets: {
					type: 'string',
					source: 'attribute',
					attribute: 'data-dynamicbullets',
				},
				paginationType: {
					type: 'string',
					source: 'attribute',
					attribute: 'data-paginationtype',
				},
				withScrollBar: {
					type: 'string',
					source: 'attribute',
					attribute: 'data-withscrollbar',
				},
				direction: {
					type: 'string',
					source: 'attribute',
					attribute: 'data-direction',
				},
				speed: {
					type: 'string',
					source: 'attribute',
					attribute: 'data-speed',
				},
				spaceBetween: {
					type: 'string',
					source: 'attribute',
					attribute: 'data-spacebetween',
				},
				slidesPerView: {
					type: 'string',
					source: 'attribute',
					attribute: 'data-slidesperview',
				},
				centeredSlides: {
					type: 'string',
					source: 'attribute',
					attribute: 'data-centeredslides',
				},
				freeMode: {
					type: 'string',
					source: 'attribute',
					attribute: 'data-freemode',
				},
				grabCursor: {
					type: 'string',
					source: 'attribute',
					attribute: 'data-grabcursor',
				},
				loop: {
					type: 'string',
					source: 'attribute',
					attribute: 'data-loop',
				},
				effect: {
					type: 'string',
					source: 'attribute',
					attribute: 'data-effect',
				},
				mousewheel: {
					type: 'string',
					source: 'attribute',
					attribute: 'data-mousewheel',
				},
				withAutoplay: {
					type: 'string',
					source: 'attribute',
					attribute: 'data-withautoplay',
				},
				delay: {
					type: 'string',
					source: 'attribute',
					attribute: 'data-delay',
				},
				disableOnInteraction: {
					type: 'string',
					source: 'attribute',
					attribute: 'data-disableoninteraction',
				},
			},
			default: [ {
				withNavigation: false,
				withPagination: true,
				dynamicBullets: false,
				paginationType: 'bullets',
				withScrollBar: false,
				direction: 'horizontal',
				speed: 300,
				spaceBetween: 0,
				slidesPerView: 1,
				centeredSlides: false,
				freeMode: false,
				grabCursor: false,
				loop: false,
				effect: 'slide',
				mousewheel: false,
				withAutoplay: false,
				delay: 3000,
				disableOnInteraction: true,
			} ],
		},
	},
	supports: {
		align: validAlignments,
	},
	getEditWrapperProps( attributes ) {
		const { align } = attributes;
		if ( -1 !== validAlignments.indexOf( align ) ) {
			return { 'data-align': align };
		}
	},
	edit,
	save,
} );
