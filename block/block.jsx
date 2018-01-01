/**
 * @@pkg.title
 */

const { __ } = wp.i18n;
const { Toolbar, PanelBody, PanelColor, Dashicon, IconButton } = wp.components;
const InspectorControls = wp.blocks.InspectorControls;
const { RangeControl, ToggleControl, SelectControl } = InspectorControls;

const {
	registerBlockType,
	Editable,
	BlockControls,
	AlignmentToolbar,
	BlockDescription,
	UrlInput,
	ColorPalette,
	source
} = wp.blocks;

const columnsOptions = [
	{ value: '1', label: __( 'One Column' ) },
	{ value: '2', label: __( 'Two Column' ) },
	{ value: '3', label: __( 'Three Column' ) },
];

const blockAttributes = {
	title: {
		source: 'children',
		selector: '.pricing-table__item--1 .pricing-table__title',
	},
	highlight: {
		type: 'array',
		source: 'children',
		selector: '.pricing-table__item--1 span.pricing-table__highlight-text',
	},
	features: {
		source: 'children',
		selector: '.pricing-table__item--1 .pricing-table__features',
		default: [],
	},
	currency: {
		type: 'array',
		source: 'children',
		selector: '.pricing-table__item--1 .pricing-table__currency',
	},
	amount: {
		type: 'array',
		source: 'children',
		selector: '.pricing-table__item--1 .pricing-table__amount',
	},
	button: {
		type: 'array',
		source: 'children',
		selector: '.pricing-table__item--1 .pricing-table__button',
	},
	url: {
		type: 'string',
		source: 'attribute',
		selector: 'a',
		attribute: 'href',
		selector: '.pricing-table__item--1 .pricing-table__button',
	},
	title_2: {
		source: 'children',
		selector: '.pricing-table__item--2 .pricing-table__title',
	},
	highlight_2: {
		type: 'array',
		source: 'children',
		selector: '.pricing-table__item--2 span.pricing-table__highlight-text',
	},
	features_2: {
		source: 'children',
		selector: '.pricing-table__item--2 .pricing-table__features',
		default: [],
	},
	currency_2: {
		type: 'array',
		source: 'children',
		selector: '.pricing-table__item--2 .pricing-table__currency',
	},
	amount_2: {
		type: 'array',
		source: 'children',
		selector: '.pricing-table__item--2 .pricing-table__amount',
	},
	button_2: {
		type: 'array',
		source: 'children',
		selector: '.pricing-table__item--2 .pricing-table__button',
	},
	url_2: {
		type: 'string',
		source: 'attribute',
		selector: 'a',
		attribute: 'href',
		selector: '.pricing-table__item--2 .pricing-table__button',
	},
	title_3: {
		source: 'children',
		selector: '.pricing-table__item--3 .pricing-table__title',
	},
	highlight_3: {
		type: 'array',
		source: 'children',
		selector: '.pricing-table__item--3 span.pricing-table__highlight-text',
	},
	features_3: {
		source: 'children',
		selector: '.pricing-table__item--3 .pricing-table__features',
		default: [],
	},
	currency_3: {
		type: 'array',
		source: 'children',
		selector: '.pricing-table__item--3 .pricing-table__currency',
	},
	amount_3: {
		type: 'array',
		source: 'children',
		selector: '.pricing-table__item--3 .pricing-table__amount',
	},
	button_3: {
		type: 'array',
		source: 'children',
		selector: '.pricing-table__item--3 .pricing-table__button',
	},
	url_3: {
		type: 'string',
		source: 'attribute',
		selector: 'a',
		attribute: 'href',
		selector: '.pricing-table__item--3 .pricing-table__button',
	},
	layout: {
		type: 'string',
	},
	align: {
		type: 'string',
		default: 'center',
	},
	columns: {
		type: 'number',
		default: 2,
	},
	marginTop: {
		type: 'number',
		default: '30',
	},
	marginBottom: {
		type: 'number',
		default: '30',
	},
	color__table: {
		type: 'string',
	},
	color__text: {
		type: 'string',
	},
	color__buttonBackground: {
		type: 'string',
	},
	color__buttonText: {
		type: 'string',
	},
};

/**
 * Register Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made available as an option to any
 * editor interface where blocks are implemented.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'gutenkit-lite/pricing-table', {
	title: __( 'Pricing Table' ),
	icon: 'editor-table',
	category: 'common',
	keywords: [ __( 'pricing' ), __( 'table' ), __( 'plan' ) ],
	attributes: blockAttributes,

	getEditWrapperProps( attributes ) {
		const { layout } = attributes;
		if ( 'wide' === layout ) {
			return { 'data-align': layout };
		}
	},

	edit( { attributes, setAttributes, focus, setFocus, className } ) {

		const {
			title,
			highlight,
			features,
			currency,
			amount,
			button,
			url,
			title_2,
			highlight_2,
			features_2,
			currency_2,
			amount_2,
			button_2,
			url_2,
			title_3,
			highlight_3,
			features_3,
			currency_3,
			amount_3,
			button_3,
			url_3,
			align,
			layout,
			columns,
			marginTop,
			marginBottom,
			color__table,
			color__text,
			color__buttonBackground,
			color__buttonText
		} = attributes;

		const inspectorControls = focus && (
			<InspectorControls key="inspector">

				<BlockDescription>
					<p>{ __( 'Add pricing tables to your page.' ) }</p>
				</BlockDescription>

				<PanelBody title={ __( 'Positioning' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Top Spacing' ) }
						value={ marginTop || '' }
						onChange={ ( value ) => setAttributes( { marginTop: value } ) }
						min={ 0 }
						max={ 400 }
						beforeIcon="editor-textcolor"
						allowReset
					/>
					<RangeControl
						label={ __( 'Bottom Spacing' ) }
						value={ marginBottom || '' }
						onChange={ ( value ) => setAttributes( { marginBottom: value } ) }
						min={ 0 }
						max={ 400 }
						beforeIcon="editor-textcolor"
						allowReset
					/>
				</PanelBody>

				<PanelColor title={ __( 'Background Color' ) } colorValue={ color__table } initialOpen={ false }>
					<ColorPalette
						value={ color__table }
						onChange={ ( colorValue ) => setAttributes( { color__table: colorValue } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Text Color' ) } colorValue={ color__text } initialOpen={ false }>
					<ColorPalette
						value={ color__text }
						onChange={ ( colorValue ) => setAttributes( { color__text: colorValue } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Button Background Color' ) } colorValue={ color__buttonBackground } initialOpen={ false }>
					<ColorPalette
						value={ color__buttonBackground }
						onChange={ ( colorValue ) => setAttributes( { color__buttonBackground: colorValue } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Button Text Color' ) } colorValue={ color__buttonText } initialOpen={ false }>
					<ColorPalette
						value={ color__buttonText }
						onChange={ ( colorValue ) => setAttributes( { color__buttonText: colorValue } ) }
					/>
				</PanelColor>

				<SelectControl
					label={ __( 'Columns' ) }
					value={ columns }
					onChange={ ( value ) => setAttributes( { columns: value } ) }
					options={ columnsOptions }
				/>

			</InspectorControls>
		);

		function onChangeAlignment( newAlignment ) {
			setAttributes( { align: newAlignment } );
		}

		function onChangeTitle( newTitle ) {
			setAttributes( { title: newTitle } );
		}

		function onChangeHighlight( newHighlight ) {
			setAttributes( { highlight: newHighlight } );
		}

		function onChangeCurrency( newCurrency ) {
			setAttributes( { currency: newCurrency } );
		}

		function onChangeAmount( newAmount ) {
			setAttributes( { amount: newAmount } );
		}

		function onChangeFeatures( newFeatures ) {
			setAttributes( { features: newFeatures } );
		}

		function onChangeButton( newButtonText ) {
			setAttributes( { button: newButtonText } );
		}

		function onChangeTitle_2( newTitle ) {
			setAttributes( { title_2: newTitle } );
		}

		function onChangeCurrency_2( newCurrency ) {
			setAttributes( { currency_2: newCurrency } );
		}

		function onChangeAmount_2( newAmount ) {
			setAttributes( { amount_2: newAmount } );
		}

		function onChangeFeatures_2( newFeatures ) {
			setAttributes( { features_2: newFeatures } );
		}

		function onChangeButton_2( newButtonText ) {
			setAttributes( { button_2: newButtonText } );
		}

		function onChangeTitle_3( newTitle ) {
			setAttributes( { title_3: newTitle } );
		}

		function onChangeCurrency_3( newCurrency ) {
			setAttributes( { currency_3: newCurrency } );
		}

		function onChangeAmount_3( newAmount ) {
			setAttributes( { amount_3: newAmount } );
		}

		function onChangeFeatures_3( newFeatures ) {
			setAttributes( { features_3: newFeatures } );
		}

		function onChangeButton_3( newButtonText ) {
			setAttributes( { button_3: newButtonText } );
		}

		const icon_1_col = [
			<svg
				aria-hidden
				role="img"
				focusable="false"
				className="dashicon"
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 20 20"
			>
				<g>
            <path d="M4.0263852,1.46689453 L15.9736148,1.46689453 C16.8651335,1.46689453 17.1884198,1.55972014 17.5143457,1.73402724 C17.8402716,1.90833433 18.0960602,2.1641229 18.2703673,2.49004883 C18.4446744,2.81597475 18.5375,3.13926099 18.5375,4.03077973 L18.5375,15.9692203 C18.5375,16.860739 18.4446744,17.1840252 18.2703673,17.5099512 C18.0960602,17.8358771 17.8402716,18.0916657 17.5143457,18.2659728 C17.1884198,18.4402799 16.8651335,18.5331055 15.9736148,18.5331055 L4.0263852,18.5331055 C3.13486646,18.5331055 2.81158022,18.4402799 2.4856543,18.2659728 C2.15972837,18.0916657 1.9039398,17.8358771 1.7296327,17.5099512 C1.55532561,17.1840252 1.4625,16.860739 1.4625,15.9692203 L1.4625,4.03077973 C1.4625,3.13926099 1.55532561,2.81597475 1.7296327,2.49004883 C1.9039398,2.1641229 2.15972837,1.90833433 2.4856543,1.73402724 C2.81158022,1.55972014 3.13486646,1.46689453 4.0263852,1.46689453 Z M11.6969621,15.0881899 L11.6969621,4.91181013 L9.60949956,4.91181013 C9.21437273,5.12055638 7.5369475,6.20901898 7.15673111,6.48486224 L7.15673111,8.43813073 C7.5071266,8.19210836 9.21437273,7.07382487 9.48276077,6.92472041 L9.56476822,6.92472041 L9.56476822,15.0881899 L11.6969621,15.0881899 Z" id="Combined-Shape"></path>
        			</g>
			</svg>
		]

		const icon_2_col = [
			<svg
				aria-hidden
				role="img"
				focusable="false"
				className="dashicon"
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 20 20"
			>
				<g>
					<path d="M4.0263852,1.46689453 L15.9736148,1.46689453 C16.8651335,1.46689453 17.1884198,1.55972014 17.5143457,1.73402724 C17.8402716,1.90833433 18.0960602,2.1641229 18.2703673,2.49004883 C18.4446744,2.81597475 18.5375,3.13926099 18.5375,4.03077973 L18.5375,15.9692203 C18.5375,16.860739 18.4446744,17.1840252 18.2703673,17.5099512 C18.0960602,17.8358771 17.8402716,18.0916657 17.5143457,18.2659728 C17.1884198,18.4402799 16.8651335,18.5331055 15.9736148,18.5331055 L4.0263852,18.5331055 C3.13486646,18.5331055 2.81158022,18.4402799 2.4856543,18.2659728 C2.15972837,18.0916657 1.9039398,17.8358771 1.7296327,17.5099512 C1.55532561,17.1840252 1.4625,16.860739 1.4625,15.9692203 L1.4625,4.03077973 C1.4625,3.13926099 1.55532561,2.81597475 1.7296327,2.49004883 C1.9039398,2.1641229 2.15972837,1.90833433 2.4856543,1.73402724 C2.81158022,1.55972014 3.13486646,1.46689453 4.0263852,1.46689453 Z M8.2769277,7.81815889 C8.2769277,7.79572074 8.26944832,7.73588566 8.26944832,7.69100935 C8.26944832,6.9281121 8.81544341,6.25496747 9.73540774,6.25496747 C10.5656194,6.25496747 11.1864084,6.82340072 11.1864084,7.6162155 C11.1864084,8.43894783 10.5880576,9.07469554 10.0495419,9.65060817 L6.36968458,13.5997233 L6.36968458,14.9385332 L13.5050177,14.9385332 L13.5050177,13.1958366 L9.30160342,13.1958366 L9.30160342,13.1285221 L11.5229807,10.6528457 C12.3905893,9.70296386 13.3255124,8.83535523 13.3255124,7.40679273 C13.3255124,5.77628684 11.9268675,4.53470897 9.78028405,4.53470897 C7.35696337,4.53470897 6.22757627,6.15025608 6.22757627,7.70596812 L6.22757627,7.81815889 L8.2769277,7.81815889 Z" id="Combined-Shape"></path>
				</g>
			</svg>
		]

		const icon_3_col = [
			<svg
				aria-hidden
				role="img"
				focusable="false"
				className="dashicon"
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 20 20"
			>
           			<g>
					<path d="M4.05372895,1.47363281 L16.0009586,1.47363281 C16.8924773,1.47363281 17.2157635,1.56645842 17.5416895,1.74076552 C17.8676154,1.91507261 18.123404,2.17086118 18.297711,2.49678711 C18.4720181,2.82271303 18.5648438,3.14599927 18.5648438,4.03751801 L18.5648438,15.9759586 C18.5648438,16.8674773 18.4720181,17.1907635 18.297711,17.5166895 C18.123404,17.8426154 17.8676154,18.098404 17.5416895,18.272711 C17.2157635,18.4470181 16.8924773,18.5398437 16.0009586,18.5398437 L4.05372895,18.5398437 C3.16221021,18.5398437 2.83892397,18.4470181 2.51299805,18.272711 C2.18707212,18.098404 1.93128355,17.8426154 1.75697645,17.5166895 C1.58266936,17.1907635 1.48984375,16.8674773 1.48984375,15.9759586 L1.48984375,4.03751801 C1.48984375,3.14599927 1.58266936,2.82271303 1.75697645,2.49678711 C1.93128355,2.17086118 2.18707212,1.91507261 2.51299805,1.74076552 C2.83892397,1.56645842 3.16221021,1.47363281 4.05372895,1.47363281 Z M8.81287071,10.402698 L9.89695701,10.402698 C11.0249928,10.402698 11.6476099,11.0106653 11.6549348,11.831055 C11.6622597,12.6660944 11.0103429,13.2960365 9.91893173,13.2960365 C8.87879488,13.2960365 8.24152793,12.7027189 8.16827886,11.9262788 L6.21985348,11.9262788 C6.25647801,13.5377584 7.41381339,14.9441406 9.86765738,14.9441406 C11.9992054,14.9441406 13.7864829,13.7648305 13.7645081,11.9409286 C13.7498583,10.3440988 12.5778731,9.6042831 11.6476099,9.53103403 L11.6476099,9.45046004 C12.4020754,9.34791134 13.4715118,8.58612097 13.4495371,7.16508892 C13.4275624,5.64150818 11.955256,4.55742187 9.94823136,4.55742187 C7.69215987,4.55742187 6.44692561,5.85393049 6.39565125,7.50935957 L8.37337626,7.50935957 C8.40267589,6.87209263 8.89344469,6.17622642 9.87498229,6.17622642 C10.768621,6.17622642 11.3692634,6.71826957 11.3765883,7.45076031 C11.3765883,8.23452541 10.768621,8.79121838 9.84568266,8.79121838 L8.81287071,8.79121838 L8.81287071,10.402698 Z" id="Combined-Shape"></path>
       				</g>
			</svg>
		]

		const layoutControls = [
			{
				icon: 'align-center',
				title: __( 'Default' ),
				onClick: () => setAttributes( { layout: 'default' } ),
				isActive: layout === 'default',
			},
			{
				icon: 'align-full-width',
				title: __( 'Full Width' ),
				onClick: () => setAttributes( { layout: 'wide' } ),
				isActive: layout === 'wide',
			},
		];

		const columnControls = [
			{
				icon: icon_1_col,
				title: __( 'One Column' ),
				onClick: () => setAttributes( { columns: 1 } ),
				isActive: columns === 1,
			},
			{
				icon: icon_2_col,
				title: __( 'Two Column' ),
				onClick: () => setAttributes( { columns: 2 } ),
				isActive: columns === 2,
			},

			{
				icon: icon_3_col,
				title: __( 'Three Column' ),
				onClick: () => setAttributes( { columns: 3 } ),
				isActive: columns === 3,
			},
		];

		return [

			inspectorControls,
			focus && (
				<BlockControls key="controls">
					<Toolbar controls={ layoutControls } />
					<Toolbar controls={ columnControls } />
					<AlignmentToolbar
						value={ align }
						onChange={ onChangeAlignment }
					/>
				</BlockControls>
			),

			<div className={ className } >

				<style dangerouslySetInnerHTML={ { __html: '.editor-block-list__block[data-type="gutenkit-lite/pricing-table"] { margin-top: ' + marginTop + 'px; margin-bottom: ' + marginBottom + 'px; }' } } />

				<div className={ 'pricing-table pricing-table--' + columns + ' pricing-table--' + align } style={ { textAlign: align } }>

					<div className={ 'pricing-table__item pricing-table__item--1' } style={ { backgroundColor: color__table } }>

						{ ( ( highlight && highlight.length > 0 ) || !! focus ) && (
							<Editable
								tagName='span'
								value={ highlight }
								placeholder={ __( 'New' ) }
								wrapperClassName={ highlight && highlight.length <= 0 ? 'pricing-table__highlight is-empty' : 'pricing-table__highlight' }
								className={ 'pricing-table__highlight-text' }
								onChange={
									( nextHighlight ) => setAttributes( {
										highlight: nextHighlight,
									} )
								}
								focus={ focus && focus.editable === 'highlight' ? focus : null }
								onFocus={ ( props ) => setFocus( { props, editable: 'highlight' } ) }
								keepPlaceholderOnFocus
							/>
						) }

						<Editable
							tagName="h4"
							multiline="false"
							className={ 'pricing-table__title' }
							onChange={ onChangeTitle }
							style={ { color: color__text } }
							value={ title }
							placeholder={ __( 'Plan A' ) }
							focus={ focus && focus.editable === 'title' ? focus : null }
							onFocus={ ( props ) => setFocus( { props, editable: 'title' } ) }
							keepPlaceholderOnFocus
						/>

						<div className={ 'pricing-table__price' }>

							<Editable
								tagName='span'
								className={ 'pricing-table__currency' }
								onChange={ onChangeCurrency }
								style={ { color: color__text } }
								value={ currency }
								placeholder={ __( '$' ) }
								focus={ focus && focus.editable === 'currency' ? focus : null }
								onFocus={ ( props ) => setFocus( { props, editable: 'currency' } ) }
								keepPlaceholderOnFocus
							/>

							<Editable
								tagName='span'
								className={ 'pricing-table__amount' }
								onChange={ onChangeAmount }
								style={ { color: color__text } }
								value={ amount }
								placeholder={ __( '99' ) }
								focus={ focus && focus.editable === 'amount' ? focus : null }
								onFocus={ ( props ) => setFocus( { props, editable: 'amount' } ) }
								keepPlaceholderOnFocus
							/>

						</div>

						<Editable
							tagName='ul'
							multiline='li'
							className={ 'pricing-table__features' }
							onChange={ onChangeFeatures }
							value={ features }
							style={ { color: color__text } }
							placeholder={ __( 'Add features' ) }
							focus={ focus && focus.editable === 'features' ? focus : null }
							onFocus={ ( props ) => setFocus( { props, editable: 'features' } ) }
							keepPlaceholderOnFocus
						/>

						{ ( ( button && button.length > 0 ) || !! focus ) && (
							<div key="button" className={ 'wp-block-button' } title={ button } style={ { backgroundColor: color__buttonBackground } }>
								<Editable
									key='editable'
									tagName='span'
									className={ 'pricing-table__button' }
									onChange={ onChangeButton }
									style={ { color: color__buttonText } }
									value={ button }
									placeholder={ __( 'Buy Now' ) }
									focus={ focus && focus.editable === 'button' ? focus : null }
									onFocus={ ( props ) => setFocus( { props, editable: 'button' } ) }
									keepPlaceholderOnFocus
								/>
							</div>
						) }

					</div>

				{ ( columns >= 2 ) && (

					<div className={ 'pricing-table__item pricing-table__item--2' } style={ { backgroundColor: color__table } }>

						{ ( ( highlight_2 && highlight_2.length > 0 ) || !! focus ) && (
							<Editable
								tagName='span'
								value={ highlight_2 }
								placeholder={ __( 'New' ) }
								wrapperClassName={ highlight_2 && highlight_2.length <= 0 ? 'pricing-table__highlight is-empty' : 'pricing-table__highlight' }
								className={ 'pricing-table__highlight-text' }
								onChange={
									( nextHighlight ) => setAttributes( {
										highlight_2: nextHighlight,
									} )
								}
								focus={ focus && focus.editable === 'highlight_2' ? focus : null }
								onFocus={ ( props ) => setFocus( { props, editable: 'highlight_2' } ) }
								keepPlaceholderOnFocus
							/>
						) }

						<Editable
							tagName="h4"
							multiline="false"
							className={ 'pricing-table__title' }
							onChange={ onChangeTitle_2 }
							style={ { color: color__text } }
							value={ title_2 }
							placeholder={ __( 'Plan B' ) }
							focus={ focus && focus.editable === 'title_2' ? focus : null }
							onFocus={ ( props ) => setFocus( { props, editable: 'title_2' } ) }
							keepPlaceholderOnFocus
						/>

						<div className={ 'pricing-table__price' }>

							<Editable
								tagName='span'
								className={ 'pricing-table__currency' }
								onChange={ onChangeCurrency_2 }
								style={ { color: color__text } }
								value={ currency_2 }
								placeholder={ __( '$' ) }
								focus={ focus && focus.editable === 'currency_2' ? focus : null }
								onFocus={ ( props ) => setFocus( { props, editable: 'currency_2' } ) }
								keepPlaceholderOnFocus
							/>

							<Editable
								tagName='span'
								className={ 'pricing-table__amount' }
								onChange={ onChangeAmount_2 }
								style={ { color: color__text } }
								value={ amount_2 }
								placeholder={ __( '99' ) }
								focus={ focus && focus.editable === 'amount_2' ? focus : null }
								onFocus={ ( props ) => setFocus( { props, editable: 'amount_2' } ) }
								keepPlaceholderOnFocus
							/>

						</div>

						<Editable
							tagName='ul'
							multiline='li'
							className={ 'pricing-table__features' }
							onChange={ onChangeFeatures_2 }
							value={ features_2 }
							style={ { color: color__text } }
							placeholder={ __( 'Add features' ) }
							focus={ focus && focus.editable === 'features_2' ? focus : null }
							onFocus={ ( props ) => setFocus( { props, editable: 'features_2' } ) }
							keepPlaceholderOnFocus
						/>

						{ ( ( button_2 && button_2.length > 0 ) || !! focus ) && (
							<div key="button" className={ 'wp-block-button' } title={ button_2 } style={ { backgroundColor: color__buttonBackground } }>
								<Editable
									tagName='span'
									className={ 'pricing-table__button' }
									onChange={ onChangeButton_2 }
									style={ { color: color__buttonText } }
									value={ button_2 }
									placeholder={ __( 'Buy Now' ) }
									focus={ focus && focus.editable === 'button_2' ? focus : null }
									onFocus={ ( props ) => setFocus( { props, editable: 'button_2' } ) }
									keepPlaceholderOnFocus
								/>
							</div>
						) }

					</div>
				) }

				{ ( columns == 3 ) && (

					<div className={ 'pricing-table__item pricing-table__item--3' } style={ { backgroundColor: color__table } }>

						{ ( ( highlight_3 && highlight_3.length > 0 ) || !! focus ) && (
							<Editable
								tagName='span'
								value={ highlight_3 }
								placeholder={ __( 'New' ) }
								wrapperClassName={ highlight_3 && highlight_3.length <= 0 ? 'pricing-table__highlight is-empty' : 'pricing-table__highlight' }
								className={ 'pricing-table__highlight-text' }
								onChange={
									( nextHighlight ) => setAttributes( {
										highlight_3: nextHighlight,
									} )
								}
								focus={ focus && focus.editable === 'highlight_3' ? focus : null }
								onFocus={ ( props ) => setFocus( { props, editable: 'highlight_3' } ) }
								keepPlaceholderOnFocus
							/>
						) }

						<Editable
							tagName="h4"
							multiline="false"
							className={ 'pricing-table__title' }
							onChange={ onChangeTitle_3 }
							style={ { color: color__text } }
							value={ title_3 }
							placeholder={ __( 'Plan C' ) }
							focus={ focus && focus.editable === 'title_3' ? focus : null }
							onFocus={ ( props ) => setFocus( { props, editable: 'title_3' } ) }
							keepPlaceholderOnFocus
						/>

						<div className={ 'pricing-table__price' }>

							<Editable
								tagName='span'
								className={ 'pricing-table__currency' }
								onChange={ onChangeCurrency_3 }
								style={ { color: color__text } }
								value={ currency_3 }
								placeholder={ __( '$' ) }
								focus={ focus && focus.editable === 'currency_3' ? focus : null }
								onFocus={ ( props ) => setFocus( { props, editable: 'currency_3' } ) }
								keepPlaceholderOnFocus
							/>

							<Editable
								key='editable'
								tagName='span'
								className={ 'pricing-table__amount' }
								onChange={ onChangeAmount_3 }
								style={ { color: color__text } }
								value={ amount_3 }
								placeholder={ __( '99' ) }
								focus={ focus && focus.editable === 'amount_3' ? focus : null }
								onFocus={ ( props ) => setFocus( { props, editable: 'amount_3' } ) }
								keepPlaceholderOnFocus
							/>

						</div>

						<Editable
							tagName='ul'
							multiline='li'
							className={ 'pricing-table__features' }
							onChange={ onChangeFeatures_3 }
							value={ features_3 }
							style={ { color: color__text } }
							placeholder={ __( 'Add features' ) }
							focus={ focus && focus.editable === 'features_3' ? focus : null }
							onFocus={ ( props ) => setFocus( { props, editable: 'features_3' } ) }
							keepPlaceholderOnFocus
						/>

						{ ( ( button_3 && button_3.length > 0 ) || !! focus ) && (
							<div key="button" className={ 'wp-block-button' } title={ button_3 } style={ { backgroundColor: color__buttonBackground } }>
								<Editable
									tagName='span'
									className={ 'pricing-table__button' }
									onChange={ onChangeButton_3 }
									style={ { color: color__buttonText } }
									value={ button_3 }
									placeholder={ __( 'Buy Now' ) }
									focus={ focus && focus.editable === 'button_3' ? focus : null }
									onFocus={ ( props ) => setFocus( { props, editable: 'button_3' } ) }
									keepPlaceholderOnFocus
								/>
							</div>
						) }

					</div>
				) }

				</div>

			</div>,
			focus && (
				<form
					key="form-link"
					className="blocks-button__inline-link blocks-button__inline-link--fullwidth"
					onSubmit={ ( event ) => event.preventDefault() }>
					<Dashicon icon="admin-links" />
					<UrlInput
						value={ url }
						onChange={ ( value ) => setAttributes( { url: value } ) }
					/>
					{ columns >= 2 &&
						<div className={ 'blocks-url-input blocks-button__inline-link--second' }>
							<Dashicon icon="admin-links" />
							<UrlInput
								value={ url_2 }
								onChange={ ( value ) => setAttributes( { url_2: value } ) }
							/>
						</div>
					}

					{ columns == 3 &&
						<div className={ 'blocks-url-input blocks-button__inline-link--second' }>
							<Dashicon icon="admin-links" />
							<UrlInput
								value={ url_3 }
								onChange={ ( value ) => setAttributes( { url_3: value } ) }
							/>
						</div>
					}
					<IconButton icon="editor-break" label={ __( 'Apply' ) } type="submit" />

				</form>
			),
		];
	},

	save( { attributes, className } ) {

		const {
			title,
			highlight,
			features,
			currency,
			amount,
			button,
			url,
			title_2,
			highlight_2,
			features_2,
			currency_2,
			amount_2,
			button_2,
			url_2,
			title_3,
			highlight_3,
			features_3,
			currency_3,
			amount_3,
			button_3,
			url_3,
			align,
			layout,
			columns,
			marginTop,
			marginBottom,
			color__table,
			color__text,
			color__buttonBackground,
			color__buttonText
		} = attributes;

		return (

			<div className={ className } style={ { marginTop: marginTop ? marginTop + 'px' : undefined, marginBottom: marginBottom ? marginBottom + 'px' : undefined, } }>

				<div className={ 'pricing-table pricing-table--' + columns + ' pricing-table--' + align } style={ { textAlign: align } }>

					<div className={ 'pricing-table__item pricing-table__item--1' } style={ { backgroundColor: color__table } }>

						{ highlight && highlight.length > 0 && (
							<span className={ 'pricing-table__highlight' }>
								<span className={ 'pricing-table__highlight-text' }>
									{ highlight }
								</span>
							</span>
						) }

						{ title && title.length > 0 && (
							<h4 className={ 'pricing-table__title' } style={ { color: color__text } } >{ title }</h4>
						) }

						<div className={ 'pricing-table__price' }>
							<span className={ 'pricing-table__currency' } style={ { color: color__text } }>
								{ currency }
							</span>

							<span className={ 'pricing-table__amount' } style={ { color: color__text } }>
								{ amount }
							</span>
						</div>

						<ul className={ 'pricing-table__features' } style={ { color: color__text } }>
							{ features }
						</ul>

						{ button && button.length > 0 && (
							<div className={ 'wp-block-button' } style={ { backgroundColor: color__buttonBackground } }>
								<a className={ 'pricing-table__button' } href={ url } title={ button } style={ { color: color__buttonText } }>
									{ button }
								</a>
							</div>
						) }

					</div>

				{ columns >= 2 && (

					<div className={ 'pricing-table__item pricing-table__item--2' } style={ { backgroundColor: color__table } }>

						{ highlight_2 && highlight_2.length > 0 && (
							<span className={ 'pricing-table__highlight' }>
								<span className={ 'pricing-table__highlight-text' }>
									{ highlight_2 }
								</span>
							</span>
						) }

						{ title_2 && title_2.length > 0 && (
							<h4 className={ 'pricing-table__title' } style={ { color: color__text } } >{ title_2 }</h4>
						) }

						<div className={ 'pricing-table__price' }>
							<span className={ 'pricing-table__currency' } style={ { color: color__text } }>
								{ currency_2 }
							</span>

							<span className={ 'pricing-table__amount' } style={ { color: color__text } }>
								{ amount_2 }
							</span>
						</div>

						<ul className={ 'pricing-table__features' } style={ { color: color__text } }>
							{ features_2 }
						</ul>

						{ button_2 && button_2.length > 0 && (
							<div className={ 'wp-block-button' } style={ { backgroundColor: color__buttonBackground } }>
								<a className={ 'pricing-table__button' } href={ url_2 } title={ button_2 } style={ { color: color__buttonText } }>
									{ button_2 }
								</a>
							</div>
						) }
					</div>
				) }

				{ columns == 3 && (

					<div className={ 'pricing-table__item pricing-table__item--3' } style={ { backgroundColor: color__table } }>

						{ highlight_3 && highlight_3.length > 0 && (
							<span className={ 'pricing-table__highlight' }>
								<span className={ 'pricing-table__highlight-text' }>
									{ highlight_3 }
								</span>
							</span>
						) }

						{ title_3 && title_3.length > 0 && (
							<h4 className={ 'pricing-table__title' } style={ { color: color__text } } >{ title_3 }</h4>
						) }

						<div className={ 'pricing-table__price' }>
							<span className={ 'pricing-table__currency' } style={ { color: color__text } }>
								{ currency_3 }
							</span>

							<span className={ 'pricing-table__amount' } style={ { color: color__text } }>
								{ amount_3 }
							</span>
						</div>

						<ul className={ 'pricing-table__features' } style={ { color: color__text } }>
							{ features_3 }
						</ul>

						{ button_3 && button_3.length > 0 && (
							<div className={ 'wp-block-button' } style={ { backgroundColor: color__buttonBackground } }>
								<a className={ 'pricing-table__button' } href={ url_3 } title={ button_3 } style={ { color: color__buttonText } }>
									{ button_3 }
								</a>
							</div>
						) }

					</div>
				) }

				</div>

			</div>
		);
	},
} );
