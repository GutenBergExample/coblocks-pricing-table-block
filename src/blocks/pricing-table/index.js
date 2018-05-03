/**
 * Internal dependencies
 */
import './styles/editor.scss';
import './styles/style.scss';
import PricingTableBlock from './components/edit';
import icons from './components/icons';

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/**
 * Block registration
 */
registerBlockType( 'coblocks/pricing-table', {

	title: __( 'Pricing Table' ),

	description: __( 'Add pricing tables.' ),

	icon: 'editor-table',

	category: 'layout',

	keywords: [
		__( 'landing' ),
		__( 'comparison' ),
		__( 'coblocks' ),
	],

	attributes: {
		title: {
			source: 'children',
			selector: '.pricing-table__item--1 .pricing-table__title',
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
		tableBackground: {
			type: 'string',
		},
		tableColor: {
			type: 'string',
		},
		buttonBackground: {
			type: 'string',
		},
		buttonColor: {
			type: 'string',
		},
	},

	edit: PricingTableBlock,

	save( { attributes, className } ) {

		const {
			align,
			amount,
			amount_2,
			button,
			button_2,
			buttonBackground,
			buttonColor,
			columns,
			currency,
			currency_2,
			features,
			features_2,
			layout,
			tableBackground,
			tableColor,
			title,
			title_2,
			url,
			url_2,
		} = attributes;

		const linkClass = 'wp-block-button__link';

		const buttonStyle = {
			backgroundColor: buttonBackground,
			color: buttonColor,
		};

		return (

			<div className={ className }>

				<div className={ 'pricing-table pricing-table--' + columns + ' pricing-table--' + align } style={ { textAlign: align } }>

					<div className={ 'pricing-table__item pricing-table__item--1' } style={ { backgroundColor: tableBackground } }>

						{ title && title.length > 0 && (
							<h4 className={ 'pricing-table__title' } style={ { color: tableColor } } >{ title }</h4>
						) }

						<div className={ 'pricing-table__price' }>
							<span className={ 'pricing-table__currency' } style={ { color: tableColor } }>
								{ currency }
							</span>

							<h5 className={ 'pricing-table__amount gutenkit--header-font' } style={ { color: tableColor } }>
								{ amount }
							</h5>
						</div>

						<ul className={ 'pricing-table__features' } style={ { color: tableColor } }>
							{ features }
						</ul>

						{ button && button.length > 0 && (
							<span className={ 'wp-block-button' }>
								<a className={ linkClass + ' pricing-table__button' } href={ url } title={ button } style={ buttonStyle }>
									{ button }
								</a>
							</span>
						) }

					</div>

					{ columns >= 2 && (

						<div className={ 'pricing-table__item pricing-table__item--2' } style={ { backgroundColor: tableBackground } }>

							{ title_2 && title_2.length > 0 && (
								<h4 className={ 'pricing-table__title' } style={ { color: tableColor } } >{ title_2 }</h4>
							) }

							<div className={ 'pricing-table__price' }>
								<span className={ 'pricing-table__currency' } style={ { color: tableColor } }>
									{ currency_2 }
								</span>

								<h5 className={ 'pricing-table__amount gutenkit--header-font' } style={ { color: tableColor } }>
									{ amount_2 }
								</h5>
							</div>

							<ul className={ 'pricing-table__features' } style={ { color: tableColor } }>
								{ features_2 }
							</ul>

							{ button_2 && button_2.length > 0 && (
								<span className={ 'wp-block-button' }>
									<a className={ linkClass + ' pricing-table__button' } href={ url_2 } title={ button_2 } style={ buttonStyle }>
										{ button_2 }
									</a>
								</span>
							) }
						</div>
					) }

				</div>

			</div>
		);
	},
} );
