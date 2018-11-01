/**
 * External dependencies
 */
import classNames from 'classnames';
import { each, times } from 'lodash';
import memoize from 'memize';

/**
 * Internal dependencies
 */
import Inspector, { getBoolean } from './slider-inspector';
//import { initSwiper, watchSwiper, swiperEvent } from './swiper-init';

const { Component, Fragment, createRef } = wp.element;
const { InnerBlocks, BlockControls, BlockAlignmentToolbar } = wp.editor;

const ALLOWED_BLOCKS = [ 'slider-block/slide' ];

const getSliderTemplate = memoize( ( slides ) => {
	return times( slides, () => [ 'slider-block/slide' ] );
} );

export const toDOMAttrs = ( params ) => {
	const attrs = {};
	each( params, ( value, key ) => {
		const newKey = `data-${ key }`.toLowerCase();
		attrs[ newKey ] = value;
	} );

	return attrs;
};

const editSwiperParams = {
	wrapperClass: 'editor-block-list__layout',
	slideClass: 'editor-block-list__block',
	init: false,
};

/*
 * The edit function describes the structure of your block in the context of the editor.
 * This represents what the editor will render when the block is used.
 */
export class edit extends Component {
	constructor() {
		super( ...arguments );
		this.initializeSwiper = this.initializeSwiper.bind( this );
		this.updateAlignment = this.updateAlignment.bind( this );
		this.prev = this.prev.bind( this );
		this.next = this.next.bind( this );
		this.state = {};
		this.element = createRef();
	}

	componentDidMount() {
		this.initializeSwiper();
	}

	shouldComponentUpdate = ( nextProps ) => {
		const { params, slides } = this.props.attributes;

		if ( params[ 0 ] !== nextProps.attributes.params[ 0 ] ) {
			return true;
		}

		if ( slides !== nextProps.attributes.slides ) {
			return true;
		}

		return false;
	}

	componentDidUpdate( prevProps ) {
		const { params } = this.props.attributes;

		if ( params[ 0 ] !== prevProps.attributes.params[ 0 ] ) {
			if ( this.state.status === 'watching' ) {
				const detail = {
					id: this.state.id,
					element: this.element.current,
					params: editSwiperParams,
				};
				document.dispatchEvent( new window.CustomEvent( 'updateSwiper', { detail } ) );
			}
		}
	}

	initializeSwiper() {
		this.setState( {
			...initSwiper( this.element.current, editSwiperParams ),
			status: watchSwiper(),
		} );
	}

	prev() {
		const { swiper } = this.state;
		if ( ! swiper ) {
			return;
		}
		console.log( swiper );

		swiper.slidePrev();
	}

	next() {
		const { swiper } = this.state;
		if ( ! swiper ) {
			return;
		}

		console.log( swiper.slideNext );
		swiper.slideNext();
	}

	updateAlignment( align ) {
		this.props.setAttributes( { align } );
	}

	render() {
		const { attributes, setAttributes, className, customClassName } = this.props;
		const { params: { 0: params }, slides, align } = attributes;

		return (
			<Fragment>
				<BlockControls>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ this.updateAlignment }
						controls={ [ 'wide', 'full' ] }
						wideControlsEnabled
					/>
				</BlockControls>
				<div
					className={
						classNames(
							className,
							'swiper-container',
							customClassName,
						)
					}
					{ ...toDOMAttrs( params ) }
					ref={ this.element }
				>
					<InnerBlocks
						template={ getSliderTemplate( slides ) }
						templateLock="all"
						allowedBlocks={ ALLOWED_BLOCKS }
					/>

					{ getBoolean( params.withPagination ) && <div className="swiper-pagination"></div> }

					<div
						role="button"
						className="swiper-button-prev"
						onClick={ this.prev }
						onKeyDown={ this.prev }
						tabIndex={ 0 }
						style={ { zIndex: 10 } }
					/>
					<div
						role="button"
						className="swiper-button-next"
						onClick={ this.next }
						onKeyDown={ this.next }
						tabIndex={ 0 }
						style={ { zIndex: 10 } }
					/>

					{ getBoolean( params.withScrollBar ) && <div className="swiper-scrollbar"></div> }
				</div>
				<Inspector { ...{ attributes, setAttributes } } />
			</Fragment>
		);
	}
}

/**
 * The save function defines the way in which the different attributes should be combined
 * into the final markup, which is then serialized by Gutenberg into post_content.
 *
 * @param {objects} attributes - Swiper parameters
 * @returns {Component} - component that templates the final markup to be stored in the database
 */
export const save = ( { attributes: { params: { 0: params }, align }, className, customClassName } ) => (
	<div
		className={
			classNames(
				className,
				'swiper-container',
				align ? `align${ align }` : null,
				customClassName,
			)
		}
		{ ...toDOMAttrs( params ) }
	>
		<div className="swiper-wrapper">
			<InnerBlocks.Content />
		</div>
		{ getBoolean( params.withPagination ) && <div className="swiper-pagination"></div> }

		{ getBoolean( params.withNavigation ) &&
			<Fragment>
				<div className="swiper-button-prev"></div>
				<div className="swiper-button-next"></div>
			</Fragment>
		}

		{ getBoolean( params.withScrollBar ) && <div className="swiper-scrollbar"></div> }
	</div>
);
