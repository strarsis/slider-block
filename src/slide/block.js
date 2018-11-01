/**
 * BLOCK: slide-block
 *
 * Individual Slide on Slider
 */

/**
 * External dependencies
 */
import classNames from 'classnames';

/**
 * Import CSS.
 */
import './style.scss';
import './editor.scss';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { InnerBlocks } = wp.editor;
const { registerBlockType } = wp.blocks;

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
registerBlockType( 'slider-block/slide', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Slide' ), // Block title.
	parent: [ 'slider-block/slider' ],
	icon: 'images-alt2', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'layout', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	description: __( 'A single slide within a slider block' ),
	keywords: [
		__( 'Slide' ),
	],
	supports: {
		inserter: false,
	},

	edit() {
		return ( <InnerBlocks templateLock={ false } /> );
	},
	save( { className } ) {
		return (
			<div className={ classNames( className, 'swiper-slide' ) }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
