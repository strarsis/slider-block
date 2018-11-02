/**
 * External dependencies
 */
import classNames from 'classnames';
import { each, times, reduce } from 'lodash';
import memoize from 'memize';
import Swiper from 'react-id-swiper';

/**
 * Internal dependencies
 */
import Inspector, { getBoolean } from './slider-inspector';

const { Component, Fragment } = wp.element;
const { InnerBlocks, BlockControls, BlockAlignmentToolbar } = wp.editor;
const { toParams } = wp.swiper;

const ALLOWED_BLOCKS = [ 'slider-block/slide' ];

const getSliderTemplate = memoize( ( slides ) => {
	return times( slides, () => [ 'slider-block/slide' ] );
} );

/**
 * Create dataset attributes for SaveContent
 *
 * @param {Object} params - block's params attribute
 * @return {Object} - Formatted dataset
 */
const toDOMAttrs = ( params ) => {
	const attrs = {};
	each( params, ( value, key ) => {
		const newKey = `data-${ key }`.toLowerCase();
		attrs[ newKey ] = value;
	} );

	return attrs;
};

const AttrsToParams = ( params ) => {
	return reduce( toDOMAttrs( params ), ( results, value, key ) => {
		results[ key.substring( 5 ) ] = value;
		return results;
	}, {} );
};

const editSwiperParams = {
	shouldSwiperUpdate: true,
};

const getSlideStyle = () => {
	const styles = [
		{ backgroundColor: '#112F41' },
		{ backgroundColor: '#068587' },
		{ backgroundColor: '#4FB99F' },
		{ backgroundColor: '#F2B134' },
		{ backgroundColor: '#ED553B' },
	];

	return {
		...styles[ Math.floor( Math.random() * Math.floor( 5 ) ) ],
		minHeight: '350px',
	};
};

/*
 * The edit function describes the structure of your block in the context of the editor.
 * This represents what the editor will render when the block is used.
 */
export class edit extends Component {
	constructor() {
		super( ...arguments );
		this.swiperRef = this.swiperRef.bind( this );
		this.swiperRebuild = this.swiperRebuild.bind( this );
		this.swiper = null;
	}

	componentDidUpdate( prevProps ) {
		const { params } = this.props.attributes;
		const { params: nextParams } = prevProps.attributes;

		if ( params !== nextParams ) {
			this.swiperRebuild();
		}
	}

	swiperRef( node ) {
		if ( node ) {
			this.swiper = node.swiper;
		}
	}

	swiperRebuild() {
		// No way to reinitialize yet.
		// if ( this.swiper ) {
		// 	this.swiper.destroy();
		// }
	}

	render() {
		const {
			attributes, setAttributes, className: blockClassName,
			customClassName,
		} = this.props;

		const {
			params,
			slides,
			align,
		} = attributes;

		const attrs = AttrsToParams( params[ 0 ] );

		const className = classNames( blockClassName, customClassName );
		const centered = {
			position: 'absolute',
			color: '#f4f4f4',
			left: '50%',
			top: '50%',
			transform: 'translate(-50%, -50%)',
			padding: '0',
			margin: '0',
		};
		const swiperChildren = times( slides, i => (
			<div style={ getSlideStyle() }>
				<h2 style={ centered }>Slide { i + 1 }</h2>
			</div>
		) );
		return (
			<div>
				<BlockControls>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ this.updateAlignment }
						controls={ [ 'wide', 'full' ] }
						wideControlsEnabled
					/>
				</BlockControls>
				<Swiper className={ className } ref={ this.swiperRef } { ...toParams( { dataset: attrs }, editSwiperParams ) }>
					{ swiperChildren }
				</Swiper>
				<InnerBlocks
					template={ getSliderTemplate( slides ) }
					templateLock="all"
					allowedBlocks={ ALLOWED_BLOCKS }
				/>
				<Inspector { ...{ attributes, setAttributes } } />
			</div>
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
