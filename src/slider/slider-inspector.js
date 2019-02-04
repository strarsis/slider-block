import PropTypes from 'prop-types';

const { __, sprintf } = wp.i18n;
const {
	PanelBody,
	ToggleControl,
	SelectControl,
	TextControl,
	RangeControl,
} = wp.components;
const { InspectorControls } = wp.editor;

export const getBoolean = ( value ) => {
	switch ( value ) {
		case true:
		case 'true':
		case 1:
		case '1':
		case 'on':
		case 'yes':
			return true;
		default:
			return false;
	}
};

export const getNumber = ( string ) => {
	if ( typeof string !== 'string' ) {
		return string;
	}

	return parseInt( string, 10 );
};

const inspector = ( { attributes, setAttributes } ) => {
	// Generic Attribute Setter
	const setAttribute = ( name ) => ( value ) => {
		setAttributes( { [ name ]: value } );
	};

	const setParam = ( name ) => ( value ) => {
		const { params } = attributes;
		const nextParams = [
			{ ...params[ 0 ], ...{ [ name ]: value } },
		];
		setAttributes( { params: nextParams } );
	};

	const { slides } = attributes;

	const {
		withNavigation,
		withPagination,
		dynamicBullets,
		paginationType,
		withScrollBar,
		direction,
		height,
		speed,
		spaceBetween,
		slidesPerView,
		centeredSlides,
		freeMode,
		grabCursor,
		loop,
		effect,
		mousewheel,
		withAutoplay,
		delay,
		disableOnInteraction,
	} = attributes.params[ 0 ];

	const directions = [
		{ label: 'Horizontal', value: 'horizontal' },
		{ label: 'Vertical', value: 'vertical' },
	];

	const effects = [
		{ label: 'Slide', value: 'slide' },
		{ label: 'Fade', value: 'fade' },
		{ label: 'Cube', value: 'cube' },
		{ label: 'CoverFlow', value: 'coverflow' },
		{ label: 'Flip', value: 'flip' },
	];

	const paginationTypes = [
		{ label: 'Bullets', value: 'bullets' },
		{ label: 'Fractions', value: 'fraction' },
		{ label: 'ProgressBar', value: 'progressbar' },
		{ label: 'Custom', value: 'custom' },
	];

	return (
		<InspectorControls>
			<RangeControl
				label={ __( 'Slides' ) }
				value={ slides }
				onChange={ setAttribute( 'slides' ) }
				min={ 1 }
				max={ 100 }
				help={ __( 'Number of Slides' ) }
			/>
			<PanelBody title={ __( 'Parameters' ) }>
				<SelectControl
					label={ __( 'Direction' ) }
					value={ direction }
					options={ directions }
					onChange={ setParam( 'direction' ) }
					help={ __( 'Could be \'horizontal\' or \'vertical\' (for vertical slider).' ) }
				/>
				<TextControl
					label={ __( 'Slider Height' ) }
					disabled={ direction !== 'vertical' }
					value={ getNumber( height ) }
					onChange={ setParam( 'height' ) }
					type="number"
					help={ __( 'Height of Slider (vertical direction only)' ) }
				/>
				<TextControl
					label={ __( 'Transition Speed' ) }
					value={ getNumber( speed ) }
					onChange={ setParam( 'speed' ) }
					type="number"
					help={ __( 'Duration of transition between slides (in ms)' ) }
				/>
				<TextControl
					label={ __( 'Space Between Slides' ) }
					value={ getNumber( spaceBetween ) }
					onChange={ setParam( 'spaceBetween' ) }
					type="number"
					help={ __( 'Distance between slides in px.' ) }
				/>
				<TextControl
					label={ __( 'Slides Per View' ) }
					value={ getNumber( slidesPerView ) }
					onChange={ setParam( 'slidesPerView' ) }
					type="number"
					help={ __( 'Number of slides per view (slides visible at the same time on slider\'s container).' ) }
				/>
				<ToggleControl
					label={ __( 'Centered Slides' ) }
					checked={ getBoolean( centeredSlides ) }
					onChange={ setParam( 'centeredSlides' ) }
					help={ checked =>
						! checked ?
							__( 'Active slide will be centered' ) :
							__( 'On the left side' )
					}
				/>
				<ToggleControl
					label={ __( 'Free Mode' ) }
					checked={ getBoolean( freeMode ) }
					onChange={ setParam( 'freeMode' ) }
					help={ checked =>
						! checked ?
							__( 'Slides will not have fixed positions' ) :
							__( 'Slides will have fixed positions' )
					}
				/>
				<ToggleControl
					label={ __( 'Grab Cursor' ) }
					checked={ getBoolean( grabCursor ) }
					onChange={ setParam( 'grabCursor' ) }
					help={ checked =>
						! checked ?
							__( '"grab" cursor when hover on Swiper' ) :
							__( 'normal cursor when hover on Swiper' )
					}
				/>
				<ToggleControl
					label={ __( 'Loop' ) }
					checked={ getBoolean( loop ) }
					onChange={ setParam( 'loop' ) }
					help={ checked =>
						! checked ?
							__( 'slides loop' ) :
							__( 'slides do not loop' )
					}
				/>
				<SelectControl
					label={ __( 'Transition Effect' ) }
					value={ effect }
					options={ effects }
					onChange={ setParam( 'effect' ) }
					help={ __( 'Transition effect' ) }
				/>
			</PanelBody>
			<PanelBody title={ __( 'Navigation' ) } initialOpen={ false }>
				<ToggleControl
					label={ __( 'With Navigation' ) }
					checked={ getBoolean( withNavigation ) }
					onChange={ setParam( 'withNavigation' ) }
					help={ checked =>
						! checked ?
							__( 'Hide navigation arrows' ) :
							__( 'Show navigation arrows' )
					}
				/>
			</PanelBody>
			<PanelBody title={ __( 'Pagination' ) } initialOpen={ false }>
				<ToggleControl
					label={ __( 'With Pagination' ) }
					checked={ getBoolean( withPagination ) }
					onChange={ setParam( 'withPagination' ) }
					help={ checked =>
						checked ?
							__( 'Hide pagination' ) :
							__( 'Show pagination' )
					}
				/>
				<ToggleControl
					label={ __( 'Dynamic Bullets' ) }
					disabled={ ! withPagination }
					checked={ getBoolean( dynamicBullets ) }
					onChange={ setParam( 'dynamicBullets' ) }
					help={ checked =>
						checked ?
							__( 'Only a few bullets visible at the same time' ) :
							__( 'Show all bullets' )
					}
				/>
				<SelectControl
					label={ __( 'Pagination Type' ) }
					disabled={ ! withPagination }
					value={ paginationType }
					options={ paginationTypes }
					onChange={ setParam( 'paginationType' ) }
					help={ __( 'type of pagination' ) }
				/>
			</PanelBody>
			<PanelBody title={ __( 'Scrollbar' ) } initialOpen={ false }>
				<ToggleControl
					label={ __( 'With Scrollbar' ) }
					checked={ getBoolean( withScrollBar ) }
					onChange={ setParam( 'withScrollBar' ) }
					help={ checked =>
						checked ?
							__( 'Hide scrollbar' ) :
							__( 'Show scrollbar' )
					}
				/>
			</PanelBody>
			<PanelBody title={ __( 'AutoPlay' ) } initialOpen={ false }>
				<ToggleControl
					label={ __( 'With Autoplay' ) }
					checked={ getBoolean( withAutoplay ) }
					onChange={ setParam( 'withAutoplay' ) }
					help={ checked =>
						checked ?
							__( 'Manual slide change' ) :
							__( 'Automatice slide change' )
					}
				/>
				<TextControl
					label={ __( 'Delay' ) }
					value={ getNumber( delay ) }
					onChange={ setParam( 'delay' ) }
					type="number"
					help={ __( 'Intervals between slides' ) }
				/>
				<ToggleControl
					label={ __( 'Disable On Interaction' ) }
					checked={ getBoolean( disableOnInteraction ) }
					onChange={ setParam( 'disableOnInteraction' ) }
					help={ checked =>
						checked ?
							__( 'Autoplay be disabled after user interactions' ) :
							__( 'Autoplay will not be disabled after user interactions' )
					}
				/>
			</PanelBody>
			<PanelBody title={ __( 'Other' ) } initialOpen={ false }>
				<ToggleControl
					label={ __( 'MouseWheel Navigation' ) }
					checked={ getBoolean( mousewheel ) }
					onChange={ setParam( 'mousewheel' ) }
					help={ checked =>
						checked ?
							__( 'Can not navigation through slides using mouse wheel' ) :
							__( 'Can navigation through slides using mouse wheel' )
					}
				/>
			</PanelBody>
		</InspectorControls>
	);
};

inspector.propTypes = {
	attributes: PropTypes.shape( {
		params: PropTypes.arrayOf(
			PropTypes.shape( {} )
		),
		slides: PropTypes.number,
	} ).isRequired,
	setAttributes: PropTypes.func.isRequired,
};

export default inspector;
